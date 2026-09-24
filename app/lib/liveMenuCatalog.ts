import type { FlowerProduct, ItemProduct, MenuCategory, MenuProduct } from "./products";
import { FLOWER_TIER_ORDER, MENU_CATEGORIES, getMenuCategoryBySlug, getProductCategorySlug, normalizeTier, TIER_DETAILS } from "./products";
import { getFycInventory } from "./fycInventoryService";

export async function loadLiveMenuCatalog() {
  const result = await getFycInventory();
  return {
    flowers: result.snapshot.flowers as unknown as FlowerProduct[],
    items: result.snapshot.items as unknown as ItemProduct[],
    servedFrom: result.servedFrom,
    fallbackReason: result.fallbackReason,
    sourceTimestamp: result.snapshot.sourceTimestamp,
    version: result.snapshot.version,
    storeCode: result.snapshot.storeCode,
  };
}

export function getMenuProductsByCategoryFrom(
  category: MenuCategory,
  flowers: FlowerProduct[],
  items: ItemProduct[],
): MenuProduct[] {
  if (category.key === "FLOWER") return flowers;
  const keys = new Set(category.itemKeys.map((key) => key.toUpperCase()));
  return items.filter((item) => keys.has(item.category.toUpperCase()));
}

export function getFlowerTierGroupsFrom(flowers: FlowerProduct[]) {
  return FLOWER_TIER_ORDER.map((tier) => ({
    tier,
    detail: TIER_DETAILS[tier],
    products: flowers.filter((flower) => normalizeTier(flower.tier) === tier),
  })).filter((group) => group.products.length > 0);
}

export function getFeaturedMenuProductsFrom(flowers: FlowerProduct[], items: ItemProduct[]) {
  const flowerFeatures = getFlowerTierGroupsFrom(flowers)
    .map((group) => group.products.find((product) => product.isHot) || group.products[0])
    .filter(Boolean) as FlowerProduct[];

  const itemFeatures = MENU_CATEGORIES.filter((category) => category.key !== "FLOWER")
    .map((category) => getMenuProductsByCategoryFrom(category, flowers, items)[0])
    .filter(Boolean) as ItemProduct[];

  return [...flowerFeatures, ...itemFeatures].slice(0, 10);
}

export function findMenuProductFrom(
  categorySlug: string,
  productSlug: string,
  flowers: FlowerProduct[],
  items: ItemProduct[],
): MenuProduct | undefined {
  const category = getMenuCategoryBySlug(categorySlug);
  if (!category) return undefined;
  return getMenuProductsByCategoryFrom(category, flowers, items).find((product) => product.slug === productSlug);
}

export function getRelatedProductsFrom(product: MenuProduct, flowers: FlowerProduct[], items: ItemProduct[], limit = 8): MenuProduct[] {
  if ("tier" in product) {
    return flowers
      .filter((flower) => normalizeTier(flower.tier) === normalizeTier(product.tier) && flower.slug !== product.slug)
      .slice(0, limit);
  }
  return items.filter((item) => item.category === product.category && item.slug !== product.slug).slice(0, limit);
}

export function getLegacyProductRedirectFrom(categorySlug: string, productSlug: string, items: ItemProduct[]) {
  const item = items.find((product) => product.slug === productSlug);
  if (!item) return undefined;
  const currentCategory = getProductCategorySlug(item);
  const isLegacyCigarettePath = categorySlug === "accessories" && currentCategory === "cigarettes";
  const isLegacyDisposablePath = categorySlug === "vapes" && currentCategory === "vape-disposables";
  return isLegacyCigarettePath || isLegacyDisposablePath ? `/items/${currentCategory}/${item.slug}` : undefined;
}
