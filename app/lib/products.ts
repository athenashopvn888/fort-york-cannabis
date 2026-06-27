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

const previewStockLoaded = productCount > 0 && !liveMenuEnabled;

export const MENU_SOURCE_STATE = {
  mode: liveMenuEnabled && appsScriptConfigured ? "configured" : previewStockLoaded ? "preview-stock" : "coming-soon",
  label:
    liveMenuEnabled && appsScriptConfigured
      ? "Live menu source configured"
      : previewStockLoaded
        ? "Preview stock loaded"
        : "Menu source pending",
  storeCode,
  hasProductData: productCount > 0,
  productCount,
  liveMenuEnabled,
  appsScriptConfigured,
  placeholderSource: previewStockLoaded ? "Temporary preview stock for owner review" : "No stock loaded",
  requiredInputs: [
    "Owner approval for final Fort York stock source",
    "Final inventory, pricing, brands, and availability",
    "Pickup, delivery, and checkout rules",
    "Apps Script or menu API endpoint if live stock is approved",
  ],
};

export const MENU_STATUS_NOTICE =
  "Preview stock and prices are loaded for local review only. Final Fort York inventory, prices, pickup/delivery rules, and checkout actions are pending owner approval.";

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    key: "FLOWER",
    name: "Flower",
    slug: "flower",
    detail: "Flower preview stock loaded for owner review.",
    banner: "/brand/category-flower.webp",
    itemKeys: [],
    seoTitle: "Flower Preview Menu | FORT YORK CANNABIS",
    seoDescription:
      "Fort York flower menu category is prepared for the approved menu source. Final products and pricing are pending owner/backend confirmation.",
  },
  {
    key: "PREROLLS",
    name: "Pre-Rolls",
    slug: "pre-rolls",
    detail: "Pre-roll preview stock loaded for owner review.",
    banner: "/brand/category-pre-rolls.webp",
    itemKeys: ["PREROLLS", "PRE-ROLLS", "PRE ROLLS"],
    seoTitle: "Pre-Rolls Preview Menu | FORT YORK CANNABIS",
    seoDescription:
      "Fort York pre-roll menu category is prepared for the approved menu source. Final products and pricing are pending owner/backend confirmation.",
  },
  {
    key: "VAPES",
    name: "Vapes",
    slug: "vapes",
    detail: "Vape preview stock loaded for owner review.",
    banner: "/brand/category-vapes.webp",
    itemKeys: ["VAPE PENS", "VAPE DISPOSABLE", "THC VAPE", "VAPES"],
    seoTitle: "Vapes Preview Menu | FORT YORK CANNABIS",
    seoDescription:
      "Fort York vape menu category is prepared for the approved menu source. Final products and pricing are pending owner/backend confirmation.",
  },
  {
    key: "EDIBLES",
    name: "Edibles",
    slug: "edibles",
    detail: "Edibles preview stock loaded for owner review.",
    banner: "/brand/category-edibles.webp",
    itemKeys: ["EDIBLES"],
    seoTitle: "Edibles Preview Menu | FORT YORK CANNABIS",
    seoDescription:
      "Fort York edibles menu category is prepared for the approved menu source. Final products and pricing are pending owner/backend confirmation.",
  },
  {
    key: "CONCENTRATES",
    name: "Concentrates",
    slug: "concentrates",
    detail: "Concentrates preview stock loaded for owner review.",
    banner: "/brand/category-concentrates.webp",
    itemKeys: ["CONCENTRATES"],
    seoTitle: "Concentrates Preview Menu | FORT YORK CANNABIS",
    seoDescription:
      "Fort York concentrates menu category is prepared for the approved menu source. Final products and pricing are pending owner/backend confirmation.",
  },
  {
    key: "ACCESSORIES",
    name: "Accessories",
    slug: "accessories",
    detail: "Accessories preview stock loaded for owner review.",
    banner: "/brand/category-accessories.webp",
    itemKeys: ["ADD ONS", "ACCESSORIES"],
    seoTitle: "Accessories Preview Menu | FORT YORK CANNABIS",
    seoDescription:
      "Fort York accessories category is prepared for the approved menu source. Final products and pricing are pending owner/backend confirmation.",
  },
];

export function getMenuCategoryBySlug(slug: string) {
  return MENU_CATEGORIES.find((category) => category.slug === slug);
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
