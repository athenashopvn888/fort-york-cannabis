import {
  allFlowers,
  normalizeTier,
  TIER_DETAILS,
  type FlowerProduct,
} from "./products";

/** Fleet-facing URL slugs (SCC/Preston/King Rock bar). AAA+ maps to /aaa. */
export const TIER_ROUTE_SLUGS = ["exotic", "premium", "aaa", "aa", "budget"] as const;
export type TierRouteSlug = (typeof TIER_ROUTE_SLUGS)[number];

const SLUG_TO_KEY: Record<TierRouteSlug, string> = {
  exotic: "EXOTIC",
  premium: "PREMIUM",
  aaa: "AAA+",
  aa: "AA",
  budget: "BUDGET",
};

export function getTierKeyFromRouteSlug(slug: string): string | null {
  const key = SLUG_TO_KEY[slug as TierRouteSlug];
  return key || null;
}

export function getRouteSlugForTier(tier?: string): TierRouteSlug {
  const key = normalizeTier(tier);
  if (key === "EXOTIC") return "exotic";
  if (key === "PREMIUM") return "premium";
  if (key === "AAA+") return "aaa";
  if (key === "AA") return "aa";
  return "budget";
}

export function getFlowersByTierKey(tierKey: string): FlowerProduct[] {
  return allFlowers.filter((flower) => normalizeTier(flower.tier) === normalizeTier(tierKey));
}

export function getTierRouteConfig(slug: string) {
  const key = getTierKeyFromRouteSlug(slug);
  if (!key) return null;
  const detail = TIER_DETAILS[key];
  return { key, slug: slug as TierRouteSlug, detail };
}
