import { NextResponse } from "next/server";
import { getCigaretteSnapshot } from "../../lib/cigaretteFeed";
import { fleetManifestHealth, getFleetContent } from "../../lib/fleetContent";
import { FLEET_STORE_CODE } from "../../lib/fleet/types";
import { SHOW_CIGARETTES } from "../../lib/siteConfig";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Diagnostic only. No secrets and no environment values. */
export async function GET() {
  const [fleet, cig] = await Promise.all([getFleetContent(), getCigaretteSnapshot()]);
  return NextResponse.json({
    storeCode: FLEET_STORE_CODE,
    contentVersion: fleet.contentVersion,
    version: fleet.version,
    manifest: fleetManifestHealth(),
    mode: fleet.active ? "sheet" : "coded",
    renderedAt: fleet.renderedAt,
    cig: { web: SHOW_CIGARETTES ? cig.web.show : false, tv: cig.tv.show, guides: cig.guides.show },
  }, { headers: { "Cache-Control": "no-store" } });
}
