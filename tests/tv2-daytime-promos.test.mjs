import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import {
  CIGARETTE_OFFER_CYCLE_MS,
  CIGARETTE_OFFER_VISIBLE_FROM_MS,
  getTv2DaytimePromo,
  isCigaretteOfferVisible,
  isTv2Daytime,
  TV2_DAYTIME_END_HOUR,
  TV2_DAYTIME_PROMOS,
  TV2_DAYTIME_START_HOUR,
} from "../app/tv2/daytimePromos.mjs";
import {
  APPROVED_CIGARETTE_DEAL_SKUS,
  isCigaretteDealSku,
  isCigaretteMixAndMatchSku,
} from "../app/lib/cigaretteDeals.mjs";

function localTime(hour, minute = 0) {
  return new Date(2026, 7, 25, hour, minute, 0, 0);
}

test("TV2 daytime window is device-local 10:00 inclusive to 17:00 exclusive", () => {
  assert.equal(TV2_DAYTIME_START_HOUR, 10);
  assert.equal(TV2_DAYTIME_END_HOUR, 17);
  assert.equal(isTv2Daytime(localTime(9, 59)), false);
  assert.equal(isTv2Daytime(localTime(10, 0)), true);
  assert.equal(isTv2Daytime(localTime(16, 59)), true);
  assert.equal(isTv2Daytime(localTime(17, 0)), false);
});

test("daytime replaces both nicotine-vape and cigarette cards", () => {
  assert.equal(
    getTv2DaytimePromo("NICOTINE_VAPES", true),
    TV2_DAYTIME_PROMOS.NICOTINE_VAPES,
  );
  assert.equal(
    getTv2DaytimePromo("CIGARETTES", true),
    TV2_DAYTIME_PROMOS.CIGARETTES,
  );
});

test("daytime promo and evening overlay assets match the After Dark schedule", () => {
  assert.equal(CIGARETTE_OFFER_CYCLE_MS, 30_000);
  assert.equal(CIGARETTE_OFFER_VISIBLE_FROM_MS, 20_000);
  assert.equal(
    TV2_DAYTIME_PROMOS.NICOTINE_VAPES.src,
    "https://pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev/products/cannabis_banner_mashup_variation_01_600x600.webp",
  );
  assert.equal(
    TV2_DAYTIME_PROMOS.NICOTINE_VAPES.fallbackSrc,
    "/banners/cannabis_banner_mashup_variation_01_600x600.webp",
  );
  assert.equal(TV2_DAYTIME_PROMOS.NICOTINE_VAPES.alt, "Ultimate Cannabis Collection Promo");
  assert.equal(TV2_DAYTIME_PROMOS.CIGARETTES.src, "/banners/cig-poster-1.png");
  assert.equal(TV2_DAYTIME_PROMOS.CIGARETTES.alt, "Cigarettes Promo");

  for (const src of [
    TV2_DAYTIME_PROMOS.NICOTINE_VAPES.fallbackSrc,
    TV2_DAYTIME_PROMOS.CIGARETTES.src,
    "/banners/2pack5cig.webp",
  ]) {
    assert.equal(
      existsSync(new URL(`../public${src}`, import.meta.url)),
      true,
      `Missing promo asset: ${src}`,
    );
  }
});

test("cigarette overlay covers the card for the last 10 seconds of each 30 second cycle", () => {
  assert.equal(isCigaretteOfferVisible(true, 25_000), false);
  assert.equal(isCigaretteOfferVisible(false, -1), false);
  assert.equal(isCigaretteOfferVisible(false, Number.NaN), false);
  assert.equal(isCigaretteOfferVisible(false, 0), false);
  assert.equal(isCigaretteOfferVisible(false, 19_999), false);
  assert.equal(isCigaretteOfferVisible(false, 20_000), true);
  assert.equal(isCigaretteOfferVisible(false, 29_999), true);
  assert.equal(isCigaretteOfferVisible(false, 30_000), false);
  assert.equal(isCigaretteOfferVisible(false, 50_000), true);
});

test("normal product cards return outside daytime", () => {
  assert.equal(getTv2DaytimePromo("NICOTINE_VAPES", false), undefined);
  assert.equal(getTv2DaytimePromo("CIGARETTES", false), undefined);
});

test("TV2 keeps vape pens separate and merges disposables into the infused-preroll card", () => {
  const page = readFileSync(new URL("../app/tv2/page.tsx", import.meta.url), "utf8");
  const styles = readFileSync(new URL("../app/tv2/tv2.module.css", import.meta.url), "utf8");

  assert.match(
    page,
    /id: "NICOTINE_VAPES"[\s\S]*categories: \["VAPE PENS"\]/,
  );
  assert.match(
    page,
    /id: "PREROLLS"[\s\S]*label: "Vape Disposable\\nInfused Prerolls"[\s\S]*categories: \["VAPE DISPOSABLE", "PREROLLS"\]/,
  );
  assert.match(page, /compactLabel: true/);
  assert.match(page, /id: "CIGARETTES"[\s\S]*categories: \["CIGARETTES"\]/);
  assert.match(page, /data-promo-card=\{cardId\}/);
  assert.match(page, /<h2>PROMO<\/h2>/);
  assert.match(page, /isCigaretteOfferVisible/);
  assert.match(page, /setInterval\(updateOffer, 250\)/);
  assert.match(page, /offerOverlay=\{cigaretteOfferVisible\}/);
  assert.match(page, /src="\/banners\/2pack5cig\.webp"/);
  assert.match(page, /alt="Mix and Match 2 Pack \$5 Cigarette Offer"/);
  assert.match(page, /TvPromoTakeover/);
  assert.match(styles, /\.timedPromoOverlay[\s\S]*object-fit: contain/);
  assert.match(styles, /\.promoImg[\s\S]*object-fit: cover/);
});

test("TV2 cigarette prices alternate between carton price and the two-pack promo", () => {
  const page = readFileSync(new URL("../app/tv2/page.tsx", import.meta.url), "utf8");
  const styles = readFileSync(new URL("../app/tv2/tv2.module.css", import.meta.url), "utf8");

  assert.match(page, /showCigaretteDeal \? "2 PACK \$5" : "\$25 CARTON"/);
  assert.match(page, /board\.id === "CIGARETTES" && tick % 2 === 1/);
  assert.match(page, /isCigaretteDealItem\(item\)/);
  assert.match(page, /styles\.cigarettePromoPrice/);
  assert.match(styles, /\.cigarettePromoPrice[\s\S]*color: #ff4438/);
});

test("TV2 cigarette deal is limited to the approved SKU list", () => {
  const approved = [
    "1000", "1001", "1002", "1003", "1005", "1006", "1008", "1009", "1011",
    "1012", "1013", "1014", "1015", "1016", "1017", "1018", "1019", "1020",
  ];

  assert.deepEqual([...APPROVED_CIGARETTE_DEAL_SKUS], approved);
  for (const sku of approved) assert.equal(isCigaretteDealSku(sku), true, sku);
  assert.equal(isCigaretteDealSku("1000, 1001"), true);
  for (const sku of ["999", "1023", "240, 241", "1056, 1057, 1058"]) {
    assert.equal(isCigaretteDealSku(sku), false, sku);
  }
});

test("only SKU 1016 receives the Mix and Match detail tag", () => {
  const page = readFileSync(new URL("../app/tv2/page.tsx", import.meta.url), "utf8");

  assert.equal(isCigaretteMixAndMatchSku("1016"), true);
  assert.equal(isCigaretteMixAndMatchSku("1015"), false);
  assert.equal(isCigaretteMixAndMatchSku("1017"), false);
  assert.match(page, /isCigaretteMixAndMatchSku\(item\.sku\) \? \["MIX AND MATCH"\]/);
});
