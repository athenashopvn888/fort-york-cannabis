import { FULL_NAME_NAP } from "../fullNameNap.ts";
import { STORE_NAP } from "../storeNap.ts";
import type { Nap, ResolvedBanner, ResolvedPage } from "./types.ts";

/**
 * The only store-specific fleet file. Other stores replace this module
 * and leave the rest of app/lib/fleet and app/components/fleet as-is.
 */
export const FLEET_STORE_CODE = "FYC01";
export const FLEET_STORE_NAME = "Fort York Cannabis";
export const FLEET_AREA = "Fort York / CityPlace";
export const FLEET_DOMAIN = "fortyorkcannabis.com";
export const FLEET_DOMAINS = ["fortyorkcannabis.com", "www.fortyorkcannabis.com"] as const;
export const FLEET_ORIGIN = "https://fortyorkcannabis.com";

/** Public blob origin. Objects live at /{storeCode}/manifest.json and /{storeCode}/articles/. */
export const FLEET_BLOB_ORIGIN = "https://dhaah0upvlpukv56.public.blob.vercel-storage.com";

export const FLEET_COLORS = {
  banner: "#111827",
  bannerText: "#ffffff",
} as const;

/** Digits or formatted numbers. An article containing any of these is dropped. */
export const FLEET_BLOCKED_PHONES: readonly string[] = [];

export const FLEET_ARTICLES_PATH = "/articles";

/** Page and spot names for the six TV2 category cards. Spot is the card name. */
export const TV2_PAGE = "TV2";
export const TV2_CARDS = [
  "PREROLLS_ADDONS",
  "VAPES",
  "EDIBLES",
  "CONCENTRATES",
  "CIGARETTES",
  "MAGIC",
] as const;

export const TV_PAGE = "TV";
export const TV_FULLSCREEN_SPOTS = [
  "Fullscreen promo 1",
  "Fullscreen promo 2",
  "Fullscreen promo 3",
] as const;

/** Coded takeover timing: 5s on screen, once a minute, 5s first preview, 650ms slide. */
export const TV_PROMO_SHOW_SECONDS = 5;
export const TV_PROMO_EVERY_MINUTES = 1;
export const TV_PROMO_INITIAL_DELAY_MS = 5_000;
export const TV_PROMO_SLIDE_MS = 650;

export function defaultManifestUrl(storeCode = FLEET_STORE_CODE): string {
  return `${FLEET_BLOB_ORIGIN}/${storeCode}/manifest.json`;
}

export function articlesIndexUrl(storeCode = FLEET_STORE_CODE): string {
  return `${FLEET_BLOB_ORIGIN}/${storeCode}/articles/index.json`;
}

export function articleBodyUrl(slug: string, storeCode = FLEET_STORE_CODE): string {
  return `${FLEET_BLOB_ORIGIN}/${storeCode}/articles/${encodeURIComponent(slug)}.json`;
}

const WEED_IMAGE = "/banners/core-top-weed.webp";
const VAPE_IMAGE = "/banners/core-vapes-nicotine-thc.webp";
const CIGARETTE_IMAGE = "/banners/core-cigarette-mix-match.webp";
const PREMIUM_CIGARETTE_IMAGE = "/banners/core-premium-cigarettes.webp";

export const CODED_NAP: Nap = {
  name: FULL_NAME_NAP.fullName,
  street: FULL_NAME_NAP.street,
  city: FULL_NAME_NAP.city,
  province: FULL_NAME_NAP.region,
  postalCode: FULL_NAME_NAP.postal,
  cityLine: `${FULL_NAME_NAP.city}, ${FULL_NAME_NAP.region} ${FULL_NAME_NAP.postal}`,
  area: FULL_NAME_NAP.neighbourhood,
  intersection: FULL_NAME_NAP.intersection,
  areaLine: `${FULL_NAME_NAP.intersection}, ${FULL_NAME_NAP.neighbourhood}`,
  phoneDisplay: FULL_NAME_NAP.phoneDisplay,
  phoneTel: "+14377832511",
  hours: FULL_NAME_NAP.hours,
  mapsSearchUrl: FULL_NAME_NAP.mapsUrl,
  mapsEmbedUrl: STORE_NAP.mapEmbedUrl,
  lat: String(STORE_NAP.latitude),
  lng: String(STORE_NAP.longitude),
  schemaName: "Fort York Cannabis Dispensary Weed Delivery",
  website: STORE_NAP.origin,
};

export const CODED_BANNERS: ResolvedBanner[] = [
  {
    id: "weed",
    page: "Home",
    spot: "Top banner",
    href: "/exotic",
    categoryName: "Exotic Weed",
    hidden: false,
    render: "image",
    image: WEED_IMAGE,
    codedImage: WEED_IMAGE,
    imageWidth: 1672,
    imageHeight: 941,
    alt: `${FLEET_STORE_NAME} Exotic, Premium and AAA+ flower tiers`,
    title: "Top 3 tiers only (Exotic, Premium, AAA+): Buy 2g Get 1g FREE · Buy 3g Get 3g FREE (6g)",
    textBar: "Top 3 tiers only (Exotic, Premium, AAA+): Buy 2g Get 1g FREE · Buy 3g Get 3g FREE (6g)",
    caption: "Top 3 tiers only (Exotic, Premium, AAA+): Buy 2g Get 1g FREE · Buy 3g Get 3g FREE (6g)",
  },
  {
    id: "vapes",
    page: "Home",
    spot: "Promo banner 2",
    href: "/items/vapes",
    categoryName: "Nicotine Vapes",
    hidden: false,
    render: "image",
    image: VAPE_IMAGE,
    codedImage: VAPE_IMAGE,
    imageWidth: 1672,
    imageHeight: 941,
    alt: `${FLEET_STORE_NAME} nicotine and THC vape categories`,
    title: "Nicotine + THC vapes",
    textBar: "Nicotine + THC vapes",
    caption: "Nicotine + THC vapes",
  },
  {
    id: "cigarettes",
    page: "Home",
    spot: "Promo banner 3",
    href: "/items/cigarettes",
    categoryName: "Cigarettes",
    hidden: false,
    render: "image",
    image: CIGARETTE_IMAGE,
    codedImage: CIGARETTE_IMAGE,
    imageWidth: 2048,
    imageHeight: 768,
    alt: `${FLEET_STORE_NAME} 2 packs for $5 mix and match and $25 carton cigarette offer`,
    title: "2 PACKS $5 / $25 CARTON",
    textBar: "2 PACKS $5 / $25 CARTON",
    caption: "2 PACKS $5 / $25 CARTON",
  },
  {
    id: "premium-cigarettes",
    page: "Home",
    spot: "Promo banner 4",
    href: "/items/cigarettes",
    categoryName: "Premium Cigarettes",
    hidden: false,
    render: "image",
    image: PREMIUM_CIGARETTE_IMAGE,
    codedImage: PREMIUM_CIGARETTE_IMAGE,
    imageWidth: 1672,
    imageHeight: 941,
    alt: `${FLEET_STORE_NAME} BB Full Flavor and Lights, Marlboro and Belmont cigarettes`,
    title: "BB Full Flavor + Lights 2 packs $5 · Marlboro & Belmont $10/pack",
    textBar: "BB Full Flavor + Lights 2 packs $5 · Marlboro & Belmont $10/pack",
    caption: "BB Full Flavor + Lights 2 packs $5 · Marlboro & Belmont $10/pack",
  },
];

export const CODED_PAGES: Record<string, ResolvedPage> = {
  Home: {
    description: "FORT YORK CANNABIS is a local cannabis store at 38 Fort York Blvd in Toronto, serving Fort York, CityPlace, the waterfront, and downtown Toronto. Phone is 437-783-2511 and the store is open 24 hours.",
    metaTitle: "",
    metaDescription: "FORT YORK CANNABIS is a local cannabis store at 38 Fort York Blvd in Toronto, serving Fort York, CityPlace, the waterfront, and downtown Toronto. Phone is 437-783-2511 and the store is open 24 hours.",
  },
  Contact: {
    description: "Contact page for FORT YORK CANNABIS at 38 Fort York Blvd in Toronto. Phone is 437-783-2511. The store is open 24 hours.",
    metaTitle: "Contact FORT YORK CANNABIS | 38 Fort York Blvd, Toronto",
    metaDescription: "Contact page for FORT YORK CANNABIS at 38 Fort York Blvd in Toronto. Phone is 437-783-2511. The store is open 24 hours.",
  },
};
