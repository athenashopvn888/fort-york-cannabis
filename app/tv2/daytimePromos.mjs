export const TV2_DAYTIME_START_HOUR = 10;
export const TV2_DAYTIME_END_HOUR = 17;

export const TV2_DAYTIME_PROMOS = Object.freeze({
  NICOTINE_VAPES: Object.freeze({
    src: "/promos/tv2-nicotine-vapes-19plus.png",
    alt: "Fort York Cannabis nicotine vapes selection",
  }),
  CIGARETTES: Object.freeze({
    src: "/promos/tv2-cigarettes-2-pack-5-19plus.png",
    alt: "Fort York Cannabis cigarette promotion",
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
