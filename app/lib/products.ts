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
  thc: string;
  price3g: PricePoint | null;
  price5g: PricePoint | null;
  price14g: PricePoint | null;
  price28g: PricePoint | null;
  image: string;
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

export const allFlowers: FlowerProduct[] = flowersJson as FlowerProduct[];
export const allItems: ItemProduct[] = itemsJson as ItemProduct[];

const liveMenuEnabled = process.env.FORT_YORK_ENABLE_LIVE_MENU === "true";
const appsScriptConfigured = Boolean(process.env.APPS_SCRIPT_URL);
const storeCode =
  process.env.MENU_STORE_CODE || process.env.NEXT_PUBLIC_MENU_STORE_CODE || "FYC01";
const productCount = allFlowers.length + allItems.length;

// Internal note: a source-store stock set powers the temporary working menu until Fort York stock is supplied.
export const MENU_SOURCE_STATE = {
  mode: liveMenuEnabled && appsScriptConfigured ? "configured" : "temporary-stock",
  label: liveMenuEnabled && appsScriptConfigured ? "Live menu source configured" : "Menu active",
  storeCode,
  hasProductData: productCount > 0,
  productCount,
  liveMenuEnabled,
  appsScriptConfigured,
  requiredInputs: [
    "Fort York stock source",
    "Pickup and delivery rules",
    "Apps Script or menu API endpoint if live stock is approved",
  ],
};

export const MENU_STATUS_NOTICE =
  "Browse Fort York flower, pre-rolls, vapes, edibles, concentrates, and accessories. Call 437-872-8446 for product questions.";

export const FLOWER_TIER_ORDER = ["EXOTIC", "PREMIUM", "AAA+", "AA", "BUDGET"] as const;

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
    detail: "Browse pre-rolls and ready-to-go cannabis options.",
    banner: "/brand/category-pre-rolls.webp",
    itemKeys: ["PREROLLS", "PRE-ROLLS", "PRE ROLLS"],
    seoTitle: "Pre-Rolls Menu | FORT YORK CANNABIS",
    seoDescription:
      "Browse the Fort York pre-roll menu with product names, THC details, and prices where available.",
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
      "Browse the Fort York vapes menu with product names, THC details, and prices where available.",
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
      "Browse the Fort York edibles menu with product names, potency details, and prices where available.",
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
      "Browse the Fort York concentrates menu with product names, potency details, and prices where available.",
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

export function getFlowerTierGroups() {
  return FLOWER_TIER_ORDER.map((tier) => ({
    tier,
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
    const values = [product.price3g, product.price5g, product.price14g, product.price28g]
      .flatMap((price) => (price ? [price.sale ?? price.regular] : []))
      .filter((value): value is number => typeof value === "number");

    return values.length ? `From $${Math.min(...values)}` : "Price listed in store";
  }

  return product.price || "Price listed in store";
}

export function getFlowerPriceRows(product: FlowerProduct) {
  return [
    { label: "3g", price: product.price3g },
    { label: "5g", price: product.price5g },
    { label: "14g", price: product.price14g },
    { label: "28g", price: product.price28g },
  ].filter((row): row is { label: string; price: PricePoint } => Boolean(row.price));
}

export function getProductMeta(product: MenuProduct) {
  if ("tier" in product) {
    return [product.tier, product.type, product.thc ? `THC ${product.thc}` : ""].filter(Boolean).join(" / ");
  }

  return [product.category, product.type, product.thc ? `THC ${product.thc}` : "", product.mg].filter(Boolean).join(" / ");
}

export function findMenuProduct(categorySlug: string, productSlug: string): MenuProduct | undefined {
  const category = getMenuCategoryBySlug(categorySlug);
  if (!category) return undefined;
  return getMenuProductsByCategory(category).find((product) => product.slug === productSlug);
}

export function getAllProductStaticParams() {
  return MENU_CATEGORIES.flatMap((category) =>
    getMenuProductsByCategory(category).map((product) => ({
      category: category.slug,
      product: product.slug,
    })),
  );
}
