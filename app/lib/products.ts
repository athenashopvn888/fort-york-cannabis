import flowersJson from "./flowers.json";
import itemsJson from "./items.json";

export interface PricePoint {
  regular: number;
  sale: number | null;
}

export interface FlowerProduct {
  sku: string;
  name: string;
  slug: string;
  tier: string;
  type: "indica" | "sativa" | "hybrid";
  isHot: boolean;
  isSale: boolean;
  isMustTry?: boolean;
  thc: string;
  price3g: PricePoint | null;
  price5g: PricePoint | null;
  price14g: PricePoint | null;
  price28g: PricePoint | null;
  image: string;
  promoImage?: string | null;
}

export interface ItemProduct {
  sku: string;
  name: string;
  slug: string;
  category: string;
  type: string;
  thc: string;
  mg: string;
  price: string;
  image: string;
  promoImage: string | null;
  isSale?: boolean;
}

export type MenuProduct = FlowerProduct | ItemProduct;

export interface MenuCategory {
  key: string;
  name: string;
  slug: string;
  detail: string;
  banner: string;
  itemKeys: string[];
  seoTitle: string;
  seoDescription: string;
}

export interface FlowerPriceRow {
  field: "price3g" | "price5g" | "price14g" | "price28g";
  label: string;
  shortLabel: string;
  grams: number;
  price: PricePoint;
  promo?: string;
  sourceNote?: string;
}

export const STORE_INFO = {
  name: "FORT YORK CANNABIS",
  code: "FYC01",
  phone: "437-783-2511",
  hours: "24 hours",
  address: "38 Fort York Blvd, Toronto",
  shortAddress: "38 Fort York Blvd",
  domain: "fortyorkcannabis.com",
} as const;

export const allFlowers: FlowerProduct[] = flowersJson as FlowerProduct[];
export const allItems: ItemProduct[] = itemsJson as ItemProduct[];

const liveMenuEnabled = process.env.FORT_YORK_ENABLE_LIVE_MENU === "true";
const appsScriptConfigured = Boolean(process.env.APPS_SCRIPT_URL);
const defaultStoreCode = "FYC01";
const storeCode =
  (process.env.MENU_STORE_CODE || process.env.NEXT_PUBLIC_MENU_STORE_CODE || STORE_INFO.code || defaultStoreCode).trim() ||
  defaultStoreCode;
const productCount = allFlowers.length + allItems.length;

export const MENU_SOURCE_STATE = {
  mode: liveMenuEnabled && appsScriptConfigured ? "configured" : "static-menu",
  label: "Menu active",
  storeCode,
  hasProductData: productCount > 0,
  productCount,
  liveMenuEnabled,
  appsScriptConfigured,
  requiredInputs: [
    "Fort York stock source",
    "Pickup and delivery rules",
    "Approved menu API endpoint if live stock is later enabled",
  ],
};

export const MENU_STATUS_NOTICE =
  "Browse Fort York flower, pre-rolls, vapes, edibles, concentrates, and accessories. Call 437-783-2511 for product questions.";

export const FLOWER_TIER_ORDER = ["EXOTIC", "PREMIUM", "AAA+", "AA", "BUDGET"] as const;
export const TOP_BUNDLE_TIERS = ["EXOTIC", "PREMIUM", "AAA+"] as const;

export const TIER_DETAILS: Record<
  string,
  {
    name: string;
    slug: string;
    description: string;
    unitPrice: number;
    accent: string;
    deal3g?: string;
    deal6g?: string;
  }
> = {
  EXOTIC: {
    name: "Exotic",
    slug: "exotic",
    description: "Ultra-rare top-shelf flower with the strongest Fort York menu pricing.",
    unitPrice: 20,
    accent: "#b5452f",
    deal3g: "Buy 2g Get 1g Free",
    deal6g: "Buy 3g Get 3g Free",
  },
  PREMIUM: {
    name: "Premium",
    slug: "premium",
    description: "Connoisseur-grade flower with strong potency and full bundle pricing.",
    unitPrice: 15,
    accent: "#7c5cbb",
    deal3g: "Buy 2g Get 1g Free",
    deal6g: "Buy 3g Get 3g Free",
  },
  "AAA+": {
    name: "AAA+",
    slug: "aaa-plus",
    description: "Heavy-hitting AAA+ strains with 3g and 6g total bundle options.",
    unitPrice: 10,
    accent: "#087e8b",
    deal3g: "Buy 2g Get 1g Free",
    deal6g: "Buy 3g Get 3g Free",
  },
  AA: {
    name: "AA",
    slug: "aa",
    description: "Quality daily-driver flower with reliable 5g and 14g pricing.",
    unitPrice: 4,
    accent: "#288b5b",
  },
  BUDGET: {
    name: "Budget",
    slug: "budget",
    description: "Value flower, shreds, and ounce options for budget-conscious shoppers.",
    unitPrice: 3,
    accent: "#5f6f7a",
    deal3g: "$10 / 3g Special",
  },
};

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    key: "FLOWER",
    name: "Flower",
    slug: "flower",
    detail: "Shop flower organized by Exotic, Premium, AAA+, AA, and Budget tiers.",
    banner: "/brand/category-flower.webp",
    itemKeys: [],
    seoTitle: "Flower Menu | FORT YORK CANNABIS",
    seoDescription:
      "Browse the Fort York flower menu by tier, including Exotic, Premium, AAA+, AA, and Budget flower.",
  },
  {
    key: "PREROLLS",
    name: "Pre-Rolls",
    slug: "pre-rolls",
    detail: "Browse infused and ready-to-go pre-roll options.",
    banner: "/brand/category-pre-rolls.webp",
    itemKeys: ["PREROLLS", "PRE-ROLLS", "PRE ROLLS"],
    seoTitle: "Pre-Rolls Menu | FORT YORK CANNABIS",
    seoDescription:
      "Browse the Fort York pre-roll menu with product names, THC details, sizes, and prices where available.",
  },
  {
    key: "VAPES",
    name: "Vapes",
    slug: "vapes",
    detail: "Browse vape pens, cartridges, and disposable vape options.",
    banner: "/brand/category-vapes.webp",
    itemKeys: ["VAPE PENS", "VAPE DISPOSABLE", "THC VAPE", "VAPES"],
    seoTitle: "Vapes Menu | FORT YORK CANNABIS",
    seoDescription:
      "Browse the Fort York vapes menu with product names, THC details, puff or size details, and prices where available.",
  },
  {
    key: "EDIBLES",
    name: "Edibles",
    slug: "edibles",
    detail: "Browse gummies, chocolates, drinks, and edible cannabis options.",
    banner: "/brand/category-edibles.webp",
    itemKeys: ["EDIBLES"],
    seoTitle: "Edibles Menu | FORT YORK CANNABIS",
    seoDescription:
      "Browse the Fort York edibles menu with product names, potency details, sizes, and prices where available.",
  },
  {
    key: "CONCENTRATES",
    name: "Concentrates",
    slug: "concentrates",
    detail: "Browse concentrates including resin, diamonds, hash, and extracts.",
    banner: "/brand/category-concentrates.webp",
    itemKeys: ["CONCENTRATES"],
    seoTitle: "Concentrates Menu | FORT YORK CANNABIS",
    seoDescription:
      "Browse the Fort York concentrates menu with product names, potency details, sizes, and prices where available.",
  },
  {
    key: "ACCESSORIES",
    name: "Accessories",
    slug: "accessories",
    detail: "Browse accessories, add-ons, cigarettes, and specialty items.",
    banner: "/brand/category-accessories.webp",
    itemKeys: ["ADD ONS", "ACCESSORIES", "CIGARETTES", "MAGIC & OTHERS", "MAGIC"],
    seoTitle: "Accessories Menu | FORT YORK CANNABIS",
    seoDescription:
      "Browse Fort York accessories, add-ons, cigarettes, and specialty items with prices where available.",
  },
];

export function getMenuCategoryBySlug(slug: string) {
  return MENU_CATEGORIES.find((category) => category.slug === slug);
}

export function normalizeTier(tier?: string) {
  const value = (tier || "").trim().toUpperCase();
  if (value === "AAA" || value === "AAA+") return "AAA+";
  if (value === "EXOTIC") return "EXOTIC";
  if (value === "PREMIUM") return "PREMIUM";
  if (value === "AA") return "AA";
  if (value === "BUDGET") return "BUDGET";
  return value || "BUDGET";
}

export function getTierDetail(tier?: string) {
  return TIER_DETAILS[normalizeTier(tier)] || TIER_DETAILS.BUDGET;
}

export function getTierAnchor(tier?: string) {
  return getTierDetail(tier).slug;
}

export function isTopBundleTier(tier?: string) {
  return TOP_BUNDLE_TIERS.includes(normalizeTier(tier) as (typeof TOP_BUNDLE_TIERS)[number]);
}

export function formatType(type?: string) {
  const t = (type || "").trim().toLowerCase();
  if (t === "indica" || t === "i") return "Indica";
  if (t === "sativa" || t === "s" || t === "sat") return "Sativa";
  if (t === "hybrid" || t === "h") return "Hybrid";
  if (t === "i/h/s" || t === "ihs") return "Indica / Hybrid / Sativa";
  if (t === "sh") return "Sativa Hybrid";
  return type || "";
}

export function formatMoney(value?: number | null) {
  if (typeof value !== "number") return "";
  return `$${value}`;
}

export function formatPricePoint(price: PricePoint) {
  return formatMoney(price.sale ?? price.regular);
}

export function getSalePrice(price: PricePoint) {
  return price.sale ?? price.regular;
}

export function getFlowerPriceRows(product: FlowerProduct, channel: "web" | "tv" = "web"): FlowerPriceRow[] {
  const tier = normalizeTier(product.tier);
  const topBundle = isTopBundleTier(tier);
  const isAaTier = tier === "AA";
  const isTv = channel === "tv";
  const webBundleLabel = "Bundle Deal Pricing";
  const price5gLabel = topBundle ? (isTv ? "6g Total" : "6g Bundle") : isAaTier ? "5g" : "6g";
  const price5gShortLabel = topBundle ? (isTv ? "6G TOTAL" : "6G BUNDLE") : isAaTier ? "5G" : "6G";
  const rows: Array<FlowerPriceRow | null> = [
    product.price3g
      ? {
          field: "price3g",
          label: topBundle ? (isTv ? "3g Total" : "3g Bundle") : "3g",
          shortLabel: topBundle ? (isTv ? "3G TOTAL" : "3G BUNDLE") : "3G",
          grams: 3,
          price: product.price3g,
          promo: topBundle ? (isTv ? "Buy 2g Get 1g Free" : webBundleLabel) : tier === "BUDGET" ? "$10 / 3g Special" : undefined,
          sourceNote: topBundle ? "ADC price3g field displays as a 3g bundle price." : undefined,
        }
      : null,
    product.price5g
      ? {
          field: "price5g",
          label: price5gLabel,
          shortLabel: price5gShortLabel,
          grams: isAaTier ? 5 : 6,
          price: product.price5g,
          promo: topBundle ? (isTv ? "Buy 3g Get 3g Free" : webBundleLabel) : isAaTier ? "$20 / 5g AA" : undefined,
          sourceNote: isAaTier ? "ADC price5g field displays as a 5g AA pack price." : "ADC price5g field displays as a 6g pack price.",
        }
      : null,
    product.price14g
      ? {
          field: "price14g",
          label: "14g",
          shortLabel: "14G",
          grams: 14,
          price: product.price14g,
        }
      : null,
    product.price28g
      ? {
          field: "price28g",
          label: "28g",
          shortLabel: "OZ",
          grams: 28,
          price: product.price28g,
        }
      : null,
  ];

  return rows.filter((row): row is FlowerPriceRow => Boolean(row));
}

export function getFlowerFromPriceRow(product: FlowerProduct) {
  return getFlowerPriceRows(product)
    .slice()
    .sort((a, b) => getSalePrice(a.price) - getSalePrice(b.price))[0];
}

export function getFlowerFromPrice(product: FlowerProduct) {
  const row = getFlowerFromPriceRow(product);
  return row ? getSalePrice(row.price) : null;
}

export function getFlowerBestValue(product: FlowerProduct) {
  const rows = getFlowerPriceRows(product)
    .map((row) => ({
      label: row.label,
      perGram: Number((getSalePrice(row.price) / row.grams).toFixed(2)),
    }))
    .sort((a, b) => a.perGram - b.perGram);

  return rows[0];
}

export function getFlowerTierGroups() {
  return FLOWER_TIER_ORDER.map((tier) => ({
    tier,
    detail: TIER_DETAILS[tier],
    products: allFlowers.filter((flower) => normalizeTier(flower.tier) === tier),
  })).filter((group) => group.products.length > 0);
}

export function getMenuProductsByCategory(category: MenuCategory): MenuProduct[] {
  if (category.key === "FLOWER") {
    return allFlowers;
  }

  const keys = new Set(category.itemKeys.map((key) => key.toUpperCase()));
  return allItems.filter((item) => keys.has(item.category.toUpperCase()));
}

export function getMenuItemCount(category: MenuCategory) {
  return getMenuProductsByCategory(category).length;
}

export function getProductImage(product: MenuProduct) {
  return product.image || "/brand/og-fort-york-cannabis.webp";
}

export function getProductCategorySlug(product: MenuProduct) {
  if ("tier" in product) return "flower";
  const category = product.category.toUpperCase();
  if (["PREROLLS", "PRE-ROLLS", "PRE ROLLS"].includes(category)) return "pre-rolls";
  if (["VAPE PENS", "VAPE DISPOSABLE", "THC VAPE", "VAPES"].includes(category)) return "vapes";
  if (category === "EDIBLES") return "edibles";
  if (category === "CONCENTRATES") return "concentrates";
  return "accessories";
}

export function getProductPath(product: MenuProduct) {
  return `/items/${getProductCategorySlug(product)}/${product.slug}`;
}

export function getProductDisplayPrice(product: MenuProduct) {
  if ("tier" in product) {
    const row = getFlowerFromPriceRow(product);
    return row ? `From ${formatPricePoint(row.price)} / ${row.label}` : "Price in store";
  }

  return formatItemPrice(product.price) || "Price in store";
}

export function getProductMeta(product: MenuProduct) {
  if ("tier" in product) {
    return [
      getTierDetail(product.tier).name,
      formatType(product.type),
      product.thc ? `THC ${product.thc}` : "",
    ]
      .filter(Boolean)
      .join(" / ");
  }

  return [
    getItemCategoryLabel(product.category),
    formatType(product.type),
    product.thc ? `THC ${formatPercentLike(product.thc)}` : "",
    product.mg,
  ]
    .filter(Boolean)
    .join(" / ");
}

export function formatItemPrice(price?: string) {
  const value = String(price || "").trim();
  if (!value) return "";
  if (value.includes("[object")) return "";
  return value.startsWith("$") ? value : `$${value}`;
}

export function formatPercentLike(value?: string) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  const numeric = Number(raw.replace("%", ""));
  if (!Number.isFinite(numeric)) return raw;
  if (numeric > 0 && numeric <= 1) return `${Math.round(numeric * 100)}%`;
  return raw.endsWith("%") ? raw : `${Math.round(numeric)}%`;
}

export function getItemCategoryLabel(category?: string) {
  const value = String(category || "").toUpperCase();
  if (value === "PREROLLS") return "Pre-Rolls";
  if (value === "VAPE PENS") return "Vape Pens";
  if (value === "VAPE DISPOSABLE") return "Disposable Vapes";
  if (value === "ADD ONS") return "Add-Ons";
  if (value === "MAGIC & OTHERS") return "Magic Stuff";
  if (value === "CIGARETTES") return "Cigarettes";
  if (value === "EDIBLES") return "Edibles";
  if (value === "CONCENTRATES") return "Concentrates";
  return category || "Menu Item";
}

export function getItemSizeDetails(item: ItemProduct) {
  const details = new Set<string>();
  const haystack = `${item.name} ${item.mg || ""}`;
  const patterns = [
    /\b\d+(?:\.\d+)?\s?(?:mg|g|ml)\b/gi,
    /\b\d+\s?x\s?\d+\b/gi,
    /\bx\d+\b/gi,
    /\b\d+(?:k|K)(?:-\d+(?:k|K))?\s?puffs?\b/gi,
    /\b\d+(?:,\d+)?\s?puffs?\b/gi,
  ];

  for (const pattern of patterns) {
    for (const match of haystack.matchAll(pattern)) {
      details.add(match[0].replace(/\s+/g, " ").trim());
    }
  }

  if (item.mg) details.add(item.mg);
  return Array.from(details).slice(0, 4);
}

export function getFlowerEffects(product: Pick<FlowerProduct, "type">) {
  const type = product.type;
  if (type === "indica") return ["Relax", "Body", "Sleepy"];
  if (type === "sativa") return ["Energy", "Focus", "Uplift"];
  return ["Balanced", "Creative", "Calm"];
}

export function getItemEffects(item: ItemProduct) {
  const category = item.category.toUpperCase();
  if (category === "EDIBLES") return ["Long Lasting", "Discreet", "Flavour"];
  if (category.includes("VAPE")) return ["Fast Acting", "Potent", "Portable"];
  if (category === "CONCENTRATES") return ["Potent", "Extract", "Small Dose"];
  if (category === "PREROLLS") return ["Ready To Smoke", "Quick Onset", "Shareable"];
  if (category === "MAGIC & OTHERS") return ["Specialty", "Start Low", "Measured"];
  if (category === "CIGARETTES") return ["Tobacco", "In Store", "Value"];
  return ["Accessory", "Useful", "In Store"];
}

export function getFlowerDescription(product: FlowerProduct) {
  const tier = getTierDetail(product.tier);
  const type = formatType(product.type);
  const effects = getFlowerEffects(product).map((effect) => effect.toLowerCase()).join(", ");
  return `${product.name} is a ${tier.name} ${type} flower option on the Fort York menu${
    product.thc ? ` with THC listed at ${product.thc}` : ""
  }. Effects are commonly merchandised as ${effects}. Review all available weights and bundle pricing, then call ${STORE_INFO.phone} with product questions.`;
}

export function getItemDescription(item: ItemProduct) {
  const category = getItemCategoryLabel(item.category).toLowerCase();
  const sizeDetails = getItemSizeDetails(item);
  const details = sizeDetails.length ? ` Details listed on the menu include ${sizeDetails.join(", ")}.` : "";
  return `${item.name} is listed in the Fort York ${category} category.${details} Check the price, potency, and size information shown here, then call ${STORE_INFO.phone} with product questions.`;
}

export function getItemDetailChips(item: ItemProduct) {
  return [
    getItemCategoryLabel(item.category),
    formatType(item.type),
    item.thc ? `THC ${formatPercentLike(item.thc)}` : "",
    ...getItemSizeDetails(item),
    item.sku ? `SKU ${item.sku}` : "",
  ].filter(Boolean);
}

export function findMenuProduct(categorySlug: string, productSlug: string): MenuProduct | undefined {
  const category = getMenuCategoryBySlug(categorySlug);
  if (!category) return undefined;
  return getMenuProductsByCategory(category).find((product) => product.slug === productSlug);
}

export function getRelatedProducts(product: MenuProduct, limit = 8): MenuProduct[] {
  if ("tier" in product) {
    return allFlowers
      .filter((flower) => normalizeTier(flower.tier) === normalizeTier(product.tier) && flower.slug !== product.slug)
      .slice(0, limit);
  }

  return allItems
    .filter((item) => item.category === product.category && item.slug !== product.slug)
    .slice(0, limit);
}

export function getFeaturedMenuProducts() {
  const flowerFeatures = getFlowerTierGroups()
    .map((group) => group.products.find((product) => product.isHot) || group.products[0])
    .filter(Boolean) as FlowerProduct[];

  const itemFeatures = MENU_CATEGORIES.filter((category) => category.key !== "FLOWER")
    .map((category) => getMenuProductsByCategory(category)[0])
    .filter(Boolean) as ItemProduct[];

  return [...flowerFeatures, ...itemFeatures].slice(0, 10);
}

export function getAllProductStaticParams() {
  return MENU_CATEGORIES.flatMap((category) =>
    getMenuProductsByCategory(category).map((product) => ({
      category: category.slug,
      product: product.slug,
    })),
  );
}
