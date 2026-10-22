import { FULL_NAME_NAP } from "../fullNameNap.ts";
import { STORE_NAP } from "../storeNap.ts";
import { FLEET_STORE_CODE, type Nap, type ResolvedBanner, type ResolvedPage } from "./types.ts";

const WEED_IMAGE = "/banners/core-top-weed.webp";
const VAPE_IMAGE = "/banners/core-vapes-nicotine-thc.webp";
const CIGARETTE_IMAGE = "/banners/core-cigarette-mix-match.webp";
const PREMIUM_CIGARETTE_IMAGE = "/banners/core-premium-cigarettes.webp";
const STORE_NAME = "Fort York Cannabis";

export function bannersMatchCoded(banners: ResolvedBanner[]): boolean {
  if (banners.length !== CODED_BANNERS.length) return false;
  return CODED_BANNERS.every((coded, index) => {
    const banner = banners[index];
    return Boolean(banner)
      && banner.id === coded.id
      && !banner.hidden
      && banner.image === coded.image
      && banner.alt === coded.alt
      && banner.title === coded.title
      && banner.textBar === coded.textBar
      && banner.href === coded.href;
  });
}

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
    alt: `${STORE_NAME} Exotic, Premium and AAA+ flower tiers`,
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
    alt: `${STORE_NAME} nicotine and THC vape categories`,
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
    alt: `${STORE_NAME} 2 packs for $5 mix and match and $25 carton cigarette offer`,
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
    alt: `${STORE_NAME} BB Full Flavor and Lights, Marlboro and Belmont cigarettes`,
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

export function fleetVersion(contentVersion: number | null): string {
  return contentVersion == null ? `${FLEET_STORE_CODE}:coded` : `${FLEET_STORE_CODE}:${contentVersion}`;
}
