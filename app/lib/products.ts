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

export const MENU_SOURCE_STATE = {
  mode: liveMenuEnabled && appsScriptConfigured ? "configured" : "coming-soon",
  label:
    liveMenuEnabled && appsScriptConfigured
      ? "Live menu source configured"
      : "Menu source pending",
  storeCode,
  hasProductData: productCount > 0,
  productCount,
  liveMenuEnabled,
  appsScriptConfigured,
  requiredInputs: [
    "Confirmed Fort York store/menu code",
    "Approved Apps Script or menu API endpoint",
    "Confirmed inventory fields and product image source",
    "Owner approval before enabling live menu fetch",
  ],
};

export const MENU_STATUS_NOTICE =
  "Fort York is prepared for the network menu system. Final products, prices, pickup, delivery, and live menu details will appear only after the approved menu source is connected.";

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    key: "FLOWER",
    name: "Flower",
    slug: "flower",
    detail: "Flower category ready for confirmed menu source.",
    banner: "/brand/category-flower.webp",
    itemKeys: [],
    seoTitle: "Flower Menu Coming Soon | FORT YORK CANNABIS",
    seoDescription:
      "Fort York flower menu category is prepared for the approved menu source. Final products and pricing are pending owner/backend confirmation.",
  },
  {
    key: "PREROLLS",
    name: "Pre-Rolls",
    slug: "pre-rolls",
    detail: "Pre-roll category ready for confirmed menu source.",
    banner: "/brand/category-pre-rolls.webp",
    itemKeys: ["PREROLLS", "PRE-ROLLS", "PRE ROLLS"],
    seoTitle: "Pre-Rolls Menu Coming Soon | FORT YORK CANNABIS",
    seoDescription:
      "Fort York pre-roll menu category is prepared for the approved menu source. Final products and pricing are pending owner/backend confirmation.",
  },
  {
    key: "VAPES",
    name: "Vapes",
    slug: "vapes",
    detail: "Vape category ready for confirmed menu source.",
    banner: "/brand/category-vapes.webp",
    itemKeys: ["VAPE PENS", "VAPE DISPOSABLE", "THC VAPE", "VAPES"],
    seoTitle: "Vapes Menu Coming Soon | FORT YORK CANNABIS",
    seoDescription:
      "Fort York vape menu category is prepared for the approved menu source. Final products and pricing are pending owner/backend confirmation.",
  },
  {
    key: "EDIBLES",
    name: "Edibles",
    slug: "edibles",
    detail: "Edibles category ready for confirmed menu source.",
    banner: "/brand/category-edibles.webp",
    itemKeys: ["EDIBLES"],
    seoTitle: "Edibles Menu Coming Soon | FORT YORK CANNABIS",
    seoDescription:
      "Fort York edibles menu category is prepared for the approved menu source. Final products and pricing are pending owner/backend confirmation.",
  },
  {
    key: "CONCENTRATES",
    name: "Concentrates",
    slug: "concentrates",
    detail: "Concentrates category ready for confirmed menu source.",
    banner: "/brand/category-concentrates.webp",
    itemKeys: ["CONCENTRATES"],
    seoTitle: "Concentrates Menu Coming Soon | FORT YORK CANNABIS",
    seoDescription:
      "Fort York concentrates menu category is prepared for the approved menu source. Final products and pricing are pending owner/backend confirmation.",
  },
  {
    key: "ACCESSORIES",
    name: "Accessories",
    slug: "accessories",
    detail: "Accessories category ready for confirmed menu source.",
    banner: "/brand/category-accessories.webp",
    itemKeys: ["ADD ONS", "ACCESSORIES"],
    seoTitle: "Accessories Menu Coming Soon | FORT YORK CANNABIS",
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
