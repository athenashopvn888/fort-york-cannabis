import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { BlobAccessError, BlobPreconditionFailedError, get, head, put } from "@vercel/blob";
import { validateStoredFycSnapshot, type FycInventorySnapshot } from "./fycInventoryCore";
import type { FlowerProduct, ItemProduct } from "./fycProductTypes";
import flowersJson from "./flowers.json";
import itemsJson from "./items.json";
import stockSnapshotJson from "./stock-snapshot.json";

export const FYC_INVENTORY_SNAPSHOT_PATH = "fyc-inventory/snapshot/v1.json";
export const FYC_LKG_FILE_RELATIVE = path.join("app", "lib", "fyc-lkg-snapshot.json");

let localSnapshot: FycInventorySnapshot | null = null;

function blobConfigured() {
  if (process.env.FYC_INVENTORY_LOCAL_ONLY === "1") return false;
  return Boolean(
    process.env.BLOB_READ_WRITE_TOKEN ||
      (process.env.VERCEL_OIDC_TOKEN && process.env.BLOB_STORE_ID) ||
      process.env.VERCEL_OIDC_TOKEN,
  );
}

function lkgFilePath() {
  return path.join(process.cwd(), FYC_LKG_FILE_RELATIVE);
}

async function readLkgFile(): Promise<FycInventorySnapshot | null> {
  try {
    const raw = await fs.readFile(lkgFilePath(), "utf8");
    return validateStoredFycSnapshot(JSON.parse(raw));
  } catch {
    return null;
  }
}

function nonemptySnapshot(snapshot: FycInventorySnapshot | null): snapshot is FycInventorySnapshot {
  return Boolean(snapshot && snapshot.flowers.length > 0 && snapshot.items.length > 0);
}

/** Baked flowers.json/items.json plus stock-snapshot metadata. Used when blob env is absent. */
function readBakedCatalogSnapshot(): FycInventorySnapshot | null {
  const flowers = (Array.isArray(flowersJson) ? flowersJson : []) as FlowerProduct[];
  const items = (Array.isArray(itemsJson) ? itemsJson : []) as ItemProduct[];
  if (flowers.length === 0 || items.length === 0) return null;

  const meta = stockSnapshotJson as {
    storeCode?: string;
    sourceTimestamp?: string;
    processedAt?: string;
    version?: string;
  };
  const sourceTimestamp = meta.sourceTimestamp || "baked-catalog";
  const snapshot: FycInventorySnapshot = {
    schemaVersion: 1,
    storeCode: "FYC01",
    sourceTimestamp,
    capturedAt: meta.processedAt || sourceTimestamp,
    version: meta.version || `baked-${meta.storeCode || "FYC01"}`,
    flowers,
    items,
    manifest: {
      accepted: true,
      sourceStockSkuCount: flowers.length + items.length,
      flowerSourceRowCount: flowers.length,
      flowerDisplayRowCount: flowers.length,
      flowerSkuCount: new Set(flowers.map((flower) => String(flower.sku))).size,
      itemDisplayRowCount: items.length,
      itemStockSkuCount: items.length,
      excludedPositiveStockSkus: [],
      flowerIdentities: [],
      itemIdentities: [],
      byTier: {},
      byCategory: {},
    },
  };

  try {
    return validateStoredFycSnapshot(snapshot);
  } catch {
    return null;
  }
}

async function readFallbackSnapshot(): Promise<FycInventorySnapshot | null> {
  const fromFile = await readLkgFile();
  if (nonemptySnapshot(fromFile)) return fromFile;
  return readBakedCatalogSnapshot();
}

async function readVersion(): Promise<{ snapshot: FycInventorySnapshot | null; etag: string | null }> {
  if (!blobConfigured()) {
    if (nonemptySnapshot(localSnapshot)) return { snapshot: structuredClone(localSnapshot), etag: null };
    const fallback = await readFallbackSnapshot();
    if (nonemptySnapshot(fallback)) {
      localSnapshot = structuredClone(fallback);
      return { snapshot: structuredClone(fallback), etag: null };
    }
    return { snapshot: null, etag: null };
  }

  try {
    const result = await get(FYC_INVENTORY_SNAPSHOT_PATH, { access: "private", useCache: false });
    if (!result || result.statusCode !== 200 || !result.stream) {
      const fallback = await readFallbackSnapshot();
      if (nonemptySnapshot(fallback)) return { snapshot: fallback, etag: null };
      return { snapshot: null, etag: null };
    }
    const parsed = validateStoredFycSnapshot(JSON.parse(await new Response(result.stream).text()));
    if (!nonemptySnapshot(parsed)) {
      const fallback = await readFallbackSnapshot();
      if (nonemptySnapshot(fallback)) return { snapshot: fallback, etag: null };
    }
    return { snapshot: parsed, etag: result.blob.etag };
  } catch (error) {
    console.warn("[FYC inventory] blob read failed; using baked or on-disk LKG");
    const fallback = await readFallbackSnapshot();
    if (nonemptySnapshot(fallback)) return { snapshot: fallback, etag: null };
    if (error instanceof BlobAccessError) return { snapshot: null, etag: null };
    return { snapshot: null, etag: null };
  }
}

export async function readFycInventorySnapshot() {
  return (await readVersion()).snapshot;
}

export async function writeFycInventorySnapshot(snapshot: FycInventorySnapshot) {
  if (!blobConfigured()) {
    localSnapshot = structuredClone(snapshot);
    return;
  }
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const current = await readVersion();
    if (current.snapshot && Date.parse(current.snapshot.sourceTimestamp) > Date.parse(snapshot.sourceTimestamp)) {
      return;
    }
    try {
      if (!current.etag) {
        await put(FYC_INVENTORY_SNAPSHOT_PATH, JSON.stringify(snapshot), {
          access: "private",
          contentType: "application/json",
          cacheControlMaxAge: 60,
          allowOverwrite: false,
        });
        return;
      }
      const latest = await head(FYC_INVENTORY_SNAPSHOT_PATH);
      if (latest.etag.replaceAll('"', "") !== current.etag.replaceAll('"', "")) continue;
      await put(FYC_INVENTORY_SNAPSHOT_PATH, JSON.stringify(snapshot), {
        access: "private",
        contentType: "application/json",
        cacheControlMaxAge: 60,
        allowOverwrite: true,
        ifMatch: latest.etag,
      });
      return;
    } catch (error) {
      if (error instanceof BlobAccessError || error instanceof BlobPreconditionFailedError) continue;
      throw error;
    }
  }
  throw new Error("FYC inventory snapshot was busy.");
}
