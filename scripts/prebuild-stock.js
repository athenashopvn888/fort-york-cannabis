#!/usr/bin/env node
/**
 * FYC01 fail-closed prebuild stock fetcher.
 * When FORT_YORK_ENABLE_LIVE_MENU=true: fetch must succeed with FYC01 identity
 * or the build exits non-zero. Never silently keep stale JSON and claim success.
 */
const ENABLE = String(process.env.FORT_YORK_ENABLE_LIVE_MENU || "").toLowerCase() === "true";
const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL || "";
const STORE =
  process.env.MENU_STORE_CODE ||
  process.env.NEXT_PUBLIC_MENU_STORE_CODE ||
  "FYC01";
const TIMEOUT_MS = Number(process.env.MENU_FETCH_TIMEOUT_MS || 120000);

function fail(msg) {
  console.error(`[prebuild-stock] FAIL: ${msg}`);
  process.exit(1);
}

function log(msg) {
  console.log(`[prebuild-stock] ${msg}`);
}

async function fetchJson(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: ctrl.signal, cache: "no-store", redirect: "follow" });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    return await res.json();
  } finally {
    clearTimeout(t);
  }
}

function skuSetHash(products, crypto) {
  const skus = [...new Set(products.map((p) => String(p.sku)))].sort();
  const h = crypto.createHash("sha256").update(skus.join("\n")).digest("hex");
  return { skus, hash: h, count: skus.length };
}

function validatePayload(data, label) {
  if (!data || typeof data !== "object") fail(`${label}: not an object`);
  if (data.storeCode !== STORE) fail(`${label}: storeCode=${data.storeCode} expected ${STORE}`);
  if (!Array.isArray(data.flowers) || !Array.isArray(data.items)) {
    fail(`${label}: missing flowers/items arrays`);
  }
  const ts = data.stockDate || data.date || data.sourceTimestamp;
  if (!ts) fail(`${label}: missing source timestamp`);
  const flowerCount = data.flowers.length;
  const itemCount = data.items.length;
  if (flowerCount < 5 || itemCount < 5) {
    fail(`${label}: suspicious counts flowers=${flowerCount} items=${itemCount}`);
  }
  if (flowerCount > 500 || itemCount > 500) {
    fail(`${label}: suspicious high counts flowers=${flowerCount} items=${itemCount}`);
  }
  return { ts, flowerCount, itemCount };
}

async function fetchCombined() {
  const url = `${APPS_SCRIPT_URL}?store=${encodeURIComponent(STORE)}`;
  log(`fetching combined ${url} timeout=${TIMEOUT_MS}ms`);
  return await fetchJson(url);
}

async function fetchSplitMerge() {
  const stockUrl = `${APPS_SCRIPT_URL}?store=${encodeURIComponent(STORE)}&stock=1`;
  const catalogUrl = `${APPS_SCRIPT_URL}?store=${encodeURIComponent(STORE)}&catalog=1`;
  log(`fetching split stock+catalog timeout=${TIMEOUT_MS}ms`);
  const [stock, catalog] = await Promise.all([fetchJson(stockUrl), fetchJson(catalogUrl)]);
  if (stock.storeCode !== STORE) fail(`stock storeCode=${stock.storeCode}`);
  if (!stock.date || !stock.stock) fail("stock missing date/stock");
  const stockMap = Object.fromEntries(
    Object.entries(stock.stock).map(([k, v]) => [String(k), v])
  );
  const qtyOk = (q) =>
    q && typeof q === "object" ? Object.values(q).some((n) => (n || 0) > 0) : !!q;
  const onHand = (p) => {
    const parts = String(p.sku || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    return parts.some((id) => stockMap[id] && qtyOk(stockMap[id]));
  };
  return {
    storeCode: STORE,
    stockDate: stock.date,
    flowers: (catalog.flowers || []).filter(onHand),
    items: (catalog.items || []).filter(onHand),
    skuCount: stock.skuCount,
  };
}

async function main() {
  const fs = await import("node:fs");
  const path = await import("node:path");
  const crypto = await import("node:crypto");
  const outDir = path.join(__dirname, "..", "app", "lib");
  const flowersPath = path.join(outDir, "flowers.json");
  const itemsPath = path.join(outDir, "items.json");
  const snapshotPath = path.join(outDir, "stock-snapshot.json");

  if (!ENABLE) {
    log("FORT_YORK_ENABLE_LIVE_MENU not true — keeping existing JSON (no fetch)");
    process.exit(0);
  }
  if (!APPS_SCRIPT_URL) fail("APPS_SCRIPT_URL required when live menu enabled");

  let data;
  try {
    data = await fetchCombined();
  } catch (e) {
    log(`combined failed: ${e && e.message ? e.message : e} — trying stock=1+catalog=1`);
    try {
      data = await fetchSplitMerge();
    } catch (e2) {
      fail(`both combined and split fetch failed: ${e2 && e2.message ? e2.message : e2}`);
    }
  }

  const { ts, flowerCount, itemCount } = validatePayload(data, "menu-source");
  const fMeta = skuSetHash(data.flowers, crypto);
  const iMeta = skuSetHash(data.items, crypto);

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(flowersPath, JSON.stringify(data.flowers, null, 2) + "\n");
  fs.writeFileSync(itemsPath, JSON.stringify(data.items, null, 2) + "\n");

  const snapshot = {
    storeCode: STORE,
    sourceTimestamp: ts,
    processedAt: new Date().toISOString(),
    version: `${STORE}-${ts}-${fMeta.hash.slice(0, 12)}-${iMeta.hash.slice(0, 12)}`,
    checksum: crypto.createHash("sha256").update(fMeta.hash + ":" + iMeta.hash).digest("hex"),
    flowerCount,
    itemCount,
    flowerSkuSha256: fMeta.hash,
    itemSkuSha256: iMeta.hash,
    validation: "PASS",
    servedFrom: "fresh",
    fallbackReason: null,
  };
  fs.writeFileSync(snapshotPath, JSON.stringify(snapshot, null, 2) + "\n");

  log(`storeCode=${STORE}`);
  log(`source timestamp=${ts}`);
  log(`flowers.json updated: ${flowerCount} products (skuSha256=${fMeta.hash})`);
  log(`items.json updated: ${itemCount} products (skuSha256=${iMeta.hash})`);
  log(`wrote ${snapshotPath}`);
}

main().catch((e) => fail(e && e.stack ? e.stack : String(e)));
