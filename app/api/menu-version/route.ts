import { NextResponse } from "next/server";
import { getFycInventory } from "../../lib/fycInventoryService";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const inventory = await getFycInventory();
  const body = {
    storeCode: inventory.snapshot.storeCode,
    sourceTimestamp: inventory.snapshot.sourceTimestamp,
    version: inventory.snapshot.version,
    servedFrom: inventory.servedFrom,
    fallbackReason: inventory.fallbackReason,
    flowerCount: inventory.snapshot.flowers.length,
    itemCount: inventory.snapshot.items.length,
  };

  return NextResponse.json(body, {
    headers: {
      "cache-control": "no-store",
      "x-tv-data-source": inventory.servedFrom,
      "x-tv-data-as-of": inventory.snapshot.sourceTimestamp,
      "x-tv-data-version": inventory.snapshot.version,
      "x-tv-data-store": inventory.snapshot.storeCode,
      "x-tv-data-flower-count": String(inventory.snapshot.flowers.length),
      "x-tv-data-item-count": String(inventory.snapshot.items.length),
    },
  });
}
