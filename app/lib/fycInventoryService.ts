import "server-only";
import {
  FYC_REFRESH_SECONDS,
  FYC_STORE_CODE,
  buildFycInventorySnapshot,
  resolveFycInventory,
  type FycCatalog,
  type FycInventorySnapshot,
  type FycRawInventory,
} from "./fycInventoryCore";
import { readFycInventorySnapshot, writeFycInventorySnapshot } from "./fycInventoryStore";

export interface FycInventoryResult {
  snapshot: FycInventorySnapshot;
  servedFrom: "fresh" | "last-good";
  fallbackReason: string | null;
}

let inputCache: { expiresAt: number; promise: ReturnType<typeof fetchInputs> } | null = null;

function storeQueryCode() {
  const value = (
    process.env.MENU_STORE_CODE ||
    process.env.NEXT_PUBLIC_MENU_STORE_CODE ||
    process.env.FYC_STORE_CODE ||
    FYC_STORE_CODE
  ).trim();
  return value || FYC_STORE_CODE;
}

function fetchTimeoutMs() {
  const parsed = Number(process.env.MENU_FETCH_TIMEOUT_MS || 30_000);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 30_000;
}

function nonemptySnapshot(snapshot: FycInventorySnapshot | null): snapshot is FycInventorySnapshot {
  return Boolean(snapshot && snapshot.flowers.length > 0 && snapshot.items.length > 0);
}

async function fetchJson<T>(url: string): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(fetchTimeoutMs()) });
      if (!response.ok) throw new Error(`FYC inventory endpoint returned HTTP ${response.status}.`);
      return response.json() as Promise<T>;
    } catch (error) {
      lastError = error;
      if (attempt < 2) await new Promise((resolve) => setTimeout(resolve, 250 * (attempt + 1)));
    }
  }
  throw lastError;
}

async function fetchInputs() {
  const endpoint = process.env.APPS_SCRIPT_URL;
  if (!endpoint) throw new Error("FYC inventory endpoint is not configured (APPS_SCRIPT_URL).");
  const separator = endpoint.includes("?") ? "&" : "?";
  const store = storeQueryCode();
  const base = `${endpoint}${separator}store=${encodeURIComponent(store)}`;
  const inventory = await fetchJson<FycRawInventory>(`${base}&stock=1`);
  const catalog = await fetchJson<FycCatalog>(`${base}&catalog=1`);
  return { inventory, catalog };
}

async function cachedInputs(force: boolean) {
  const now = Date.now();
  if (!force && inputCache && inputCache.expiresAt > now) return inputCache.promise;
  const promise = fetchInputs();
  inputCache = { expiresAt: now + FYC_REFRESH_SECONDS * 1000, promise };
  try {
    return await promise;
  } catch (error) {
    inputCache = null;
    throw error;
  }
}

export async function getFycInventory(options: { force?: boolean } = {}): Promise<FycInventoryResult> {
  let lastGood: FycInventorySnapshot | null = null;
  try {
    lastGood = await readFycInventorySnapshot();
  } catch {
    console.warn("[FYC inventory] LKG read unavailable");
  }

  let result: FycInventoryResult;
  try {
    result = await resolveFycInventory({
      lastGood,
      loadFresh: async () => {
        const { inventory, catalog } = await cachedInputs(Boolean(options.force));
        return buildFycInventorySnapshot({
          inventory,
          catalog,
          flowerOverrides: [],
          previous: lastGood,
        });
      },
      persist: async (snapshot) => {
        try {
          await writeFycInventorySnapshot(snapshot);
        } catch (error) {
          console.warn("[FYC inventory] LKG persistence unavailable");
          throw error;
        }
      },
    });
  } catch (error) {
    if (!nonemptySnapshot(lastGood)) throw error;
    console.warn("[FYC inventory] source unavailable; serving baked or last-known-good");
    result = {
      snapshot: lastGood,
      servedFrom: "last-good",
      fallbackReason: error instanceof Error ? error.name : "SOURCE_UNAVAILABLE",
    };
  }

  if (!result.snapshot.flowers.length || !result.snapshot.items.length) {
    if (!nonemptySnapshot(lastGood)) {
      throw new Error("FYC inventory fallback catalog is empty.");
    }
    result = {
      snapshot: lastGood,
      servedFrom: "last-good",
      fallbackReason: result.fallbackReason || "EMPTY_SNAPSHOT",
    };
  }

  console.info("[FYC inventory] servedFrom=%s fallbackReason=%s flowers=%d items=%d version=%s", result.servedFrom, result.fallbackReason, result.snapshot.flowers.length, result.snapshot.items.length, result.snapshot.version);

  if (result.servedFrom === "last-good") {
    console.warn("[FYC inventory] source rejected; serving last-known-good", result.fallbackReason);
  }
  return result;
}
