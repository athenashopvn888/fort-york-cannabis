/*
 * Fort York menu prebuild hook.
 * Default mode is safe static fallback: no external fetch is run unless explicitly enabled.
 */

const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL || "";
const DEFAULT_STORE_CODE = "FYC01";
const STORE_CODE =
  (process.env.MENU_STORE_CODE || process.env.NEXT_PUBLIC_MENU_STORE_CODE || DEFAULT_STORE_CODE).trim() ||
  DEFAULT_STORE_CODE;
const LIVE_MENU_ENABLED = process.env.FORT_YORK_ENABLE_LIVE_MENU === "true";

async function main() {
  const fs = await import("node:fs");
  const path = await import("node:path");

  const flowersPath = path.join(__dirname, "..", "app", "lib", "flowers.json");
  const itemsPath = path.join(__dirname, "..", "app", "lib", "items.json");

  if (!LIVE_MENU_ENABLED) {
    console.log("[prebuild] Fort York Cannabis: live menu disabled; using static menu JSON fallback.");
    return;
  }

  if (!APPS_SCRIPT_URL) {
    console.log("[prebuild] Fort York Cannabis: no APPS_SCRIPT_URL set; using static menu JSON fallback.");
    return;
  }

  console.log(`[prebuild] Fort York Cannabis: fetching approved menu source for ${STORE_CODE}...`);

  try {
    const url = `${APPS_SCRIPT_URL}?store=${encodeURIComponent(STORE_CODE)}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(30000) });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();

    if (!Array.isArray(data.flowers) || !Array.isArray(data.items)) {
      throw new Error("Invalid response: missing flowers or items arrays");
    }

    fs.writeFileSync(flowersPath, JSON.stringify(data.flowers, null, 2), "utf-8");
    fs.writeFileSync(itemsPath, JSON.stringify(data.items, null, 2), "utf-8");

    console.log(`[prebuild] flowers.json updated: ${data.flowers.length} products`);
    console.log(`[prebuild] items.json updated: ${data.items.length} products`);
    console.log(`[prebuild] source date: ${data.stockDate || "unknown"}`);
  } catch (err) {
    console.warn(`[prebuild] Fort York live menu fetch failed: ${err.message}`);
    console.warn("[prebuild] Keeping existing static menu JSON fallback.");
  }
}

main();
