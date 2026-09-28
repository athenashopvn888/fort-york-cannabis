export const TV2_DAYTIME_START_HOUR = 10;
export const TV2_DAYTIME_END_HOUR = 17;

export const CIGARETTE_OFFER_CYCLE_MS = 30_000;
export const CIGARETTE_OFFER_VISIBLE_FROM_MS = 20_000;

export const TV2_DAYTIME_PROMOS = Object.freeze({
  NICOTINE_VAPES: Object.freeze({
    src: "https://pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev/products/cannabis_banner_mashup_variation_01_600x600.webp",
    fallbackSrc: "/banners/cannabis_banner_mashup_variation_01_600x600.webp",
    alt: "Ultimate Cannabis Collection Promo",
  }),
  CIGARETTES: Object.freeze({
    src: "/banners/cig-poster-1.png",
    alt: "Cigarettes Promo",
  }),
});

export function isTv2Daytime(now = new Date()) {
  const hour = now.getHours();
  return hour >= TV2_DAYTIME_START_HOUR && hour < TV2_DAYTIME_END_HOUR;
}

export function getTv2DaytimePromo(cardId, daytime) {
  if (!daytime) return undefined;
  return TV2_DAYTIME_PROMOS[cardId];
}

export function isCigaretteOfferVisible(daytime, elapsedMs) {
  if (daytime || !Number.isFinite(elapsedMs) || elapsedMs < 0) return false;
  return elapsedMs % CIGARETTE_OFFER_CYCLE_MS >= CIGARETTE_OFFER_VISIBLE_FROM_MS;
}
