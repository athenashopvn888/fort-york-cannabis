import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { TV2_CARDS, TV_FULLSCREEN_SPOTS } from "../app/lib/fleet/config.ts";
import { inPromoWindow, pickTv2Sheet, resolveFullscreenPromos, resolveTvCards } from "../app/lib/fleet/tv.ts";
import { readFleetContent, resetFleetContentCache, tvManifestDecision } from "../app/lib/fleet/read.ts";
import type { ContentBundle } from "../app/lib/fleet/types.ts";

const bundle = JSON.parse(readFileSync(new URL("../fixtures/fleet/content-v1.json", import.meta.url), "utf8")) as ContentBundle;

test("TV2 card slots and fullscreen promos stay empty unless a Custom row is inside its window", () => {
  assert.deepEqual(resolveTvCards(bundle, new Date("2026-10-22T12:00:00.000Z")), {});
  assert.deepEqual(resolveFullscreenPromos(bundle, new Date("2026-10-22T12:00:00.000Z")), []);
  assert.equal(inPromoWindow("2026-10-22T12:00:00.000Z", "2026-10-22T13:00:00.000Z", new Date("2026-10-22T12:30:00.000Z")), true);
  assert.equal(inPromoWindow("not-a-date", "2026-10-22T13:00:00.000Z", new Date("2026-10-22T12:30:00.000Z")), false);

  const withTv = structuredClone(bundle);
  withTv.slots!.push(
    { page: "TV2", spot: "CIGARETTES", mode: "Custom", image: "/promo.webp", offImage: "/off.webp", alt: "Cig promo", promoStart: "2026-10-22T12:00:00.000Z", promoEnd: "2026-10-22T13:00:00.000Z" },
    { page: "TV2", spot: "VAPES", mode: "Coded", image: "/should-not.webp", offImage: "/nope.webp", promoStart: "2026-10-22T12:00:00.000Z", promoEnd: "2026-10-22T13:00:00.000Z" },
    { page: "TV", spot: "Fullscreen promo 1", mode: "Custom", image: "/full.webp", alt: "Full", promoStart: "2026-10-22T12:00:00.000Z", promoEnd: "2026-10-22T13:00:00.000Z", showSeconds: 8, everyMinutes: 2 },
    { page: "TV", spot: "Fullscreen promo 2", mode: "Custom", image: "/late.webp", promoStart: "2026-10-22T18:00:00.000Z", promoEnd: "2026-10-22T19:00:00.000Z" },
    { page: "TV", spot: "Fullscreen promo 3", mode: "Hidden", image: "/hidden.webp", promoStart: "2026-10-22T12:00:00.000Z", promoEnd: "2026-10-22T13:00:00.000Z" },
  );
  const now = new Date("2026-10-22T12:30:00.000Z");
  const cards = resolveTvCards(withTv, now);
  assert.equal(cards.CIGARETTES.promoImage, "/promo.webp");
  assert.equal(cards.CIGARETTES.offImage, "/off.webp");
  assert.equal(cards.VAPES, undefined);
  assert.equal(resolveTvCards(withTv, new Date("2026-10-22T14:00:00.000Z")).CIGARETTES.promoImage, null);
  assert.equal(resolveTvCards(withTv, new Date("2026-10-22T14:00:00.000Z")).CIGARETTES.offImage, "/off.webp");
  const full = resolveFullscreenPromos(withTv, now);
  assert.equal(full.length, 1);
  assert.equal(full[0].spot, "Fullscreen promo 1");
  assert.equal(full[0].showSeconds, 8);
  assert.equal(full[0].everyMinutes, 2);
  assert.deepEqual(resolveFullscreenPromos(withTv, new Date("2026-10-22T18:30:00.000Z")).map((promo) => promo.spot), ["Fullscreen promo 2"]);
  assert.equal(resolveFullscreenPromos(withTv, new Date("2026-10-22T18:30:00.000Z"))[0].showSeconds, 5);
  assert.equal(resolveFullscreenPromos(withTv, new Date("2026-10-22T18:30:00.000Z"))[0].everyMinutes, 1);

  const cig = cards.CIGARETTES;
  assert.equal(pickTv2Sheet(cig, { categoryOff: false, noItems: false, promoBroken: false, offBroken: false })?.kind, "promo");
  assert.equal(pickTv2Sheet(cig, { categoryOff: true, noItems: false, promoBroken: false, offBroken: false })?.kind, "off");
  assert.equal(pickTv2Sheet(cig, { categoryOff: false, noItems: true, promoBroken: true, offBroken: false })?.kind, "off");
  assert.equal(pickTv2Sheet(cig, { categoryOff: false, noItems: false, promoBroken: true, offBroken: false }), null);
  assert.deepEqual(TV2_CARDS, ["PREROLLS_ADDONS", "VAPES", "EDIBLES", "CONCENTRATES", "CIGARETTES", "MAGIC"]);
  assert.deepEqual(TV_FULLSCREEN_SPOTS, ["Fullscreen promo 1", "Fullscreen promo 2", "Fullscreen promo 3"]);

  const tv2 = readFileSync(new URL("../app/tv2/page.tsx", import.meta.url), "utf8");
  const tv = readFileSync(new URL("../app/tv/page.tsx", import.meta.url), "utf8");
  assert.match(tv2, /pickTv2Sheet/);
  assert.match(tv2, /onError=\{markBroken\}/);
  assert.match(tv2, /naturalWidth === 0/);
  assert.match(tv2, /useFleetTvManifest/);
  assert.match(tv2, /<TvPromoTakeover promos=\{TAKEOVER_PROMOS\} \/>/);
  assert.match(tv2, /NICOTINE_VAPES: "VAPES"/);
  assert.match(tv, /FleetTvTakeover/);
  assert.match(tv2, /<FleetTvTakeover promos=\{fleetTv\.fullscreenPromos\} \/>/);
  assert.match(readFileSync(new URL("../app/components/fleet/FleetTvTakeover.tsx", import.meta.url), "utf8"), /if \(promos\.length === 0\) return null/);
  assert.match(readFileSync(new URL("../app/components/fleet/TvPromoTakeover.tsx", import.meta.url), "utf8"), /TV_PROMO_INITIAL_DELAY_MS/);
  assert.match(readFileSync(new URL("../app/components/TvPromoTakeover.tsx", import.meta.url), "utf8"), /PROMO_INTERVAL_MS = 60 \* 1000/);
  const route = readFileSync(new URL("../app/api/tv-manifest/route.ts", import.meta.url), "utf8");
  assert.match(route, /s-maxage=60, stale-while-revalidate=300/);
  assert.match(readFileSync(new URL("../app/tv/layout.tsx", import.meta.url), "utf8"), /index: false/);
  assert.match(readFileSync(new URL("../app/tv2/layout.tsx", import.meta.url), "utf8"), /Fort York Cannabis In-Store Menu Display/);
});

test("a coded manifest body carries empty tv fields and does not invent a fullscreen promo", async () => {
  resetFleetContentCache();
  const coded = await readFleetContent({ manifestUrl: "", emergencyCoded: false, renderedAt: "2026-10-22T00:00:00.000Z" });
  const body = tvManifestDecision(coded, null).body;
  assert.deepEqual(body?.tvCards, {});
  assert.deepEqual(body?.fullscreenPromos, []);
});
