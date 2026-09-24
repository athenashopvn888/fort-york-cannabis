import { NextResponse } from "next/server";
import { FYC_REFRESH_SECONDS } from "../../lib/fycInventoryCore";
import { getFycInventory } from "../../lib/fycInventoryService";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "flowers";
  const inventory = await getFycInventory();
  const selectedType = type === "items" ? "items" : "flowers";
  const data = selectedType === "items" ? inventory.snapshot.items : inventory.snapshot.flowers;
  const headers = {
    "cache-control": `public, s-maxage=${FYC_REFRESH_SECONDS}, stale-while-revalidate=60`,
    "x-tv-data-cache-seconds": String(FYC_REFRESH_SECONDS),
    "x-tv-data-source": inventory.servedFrom,
    "x-tv-data-as-of": inventory.snapshot.sourceTimestamp,
    "x-tv-data-version": inventory.snapshot.version,
    "x-tv-data-store": inventory.snapshot.storeCode,
    "x-tv-data-flower-count": String(inventory.snapshot.flowers.length),
    "x-tv-data-item-count": String(inventory.snapshot.items.length),
  };

  return NextResponse.json(data, { headers });
}
