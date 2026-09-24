import type { FlowerProduct, ItemProduct } from "./fycProductTypes";
import { getFycInventory } from "./fycInventoryService";

/** Live flower rows from request-time FYC inventory (stock-masked). */
export async function getLiveFlowers(): Promise<FlowerProduct[]> {
  const { snapshot } = await getFycInventory();
  return snapshot.flowers;
}

/** Live item rows from request-time FYC inventory (stock-filtered). */
export async function getLiveItems(): Promise<ItemProduct[]> {
  const { snapshot } = await getFycInventory();
  return snapshot.items;
}

/** Live flowers filtered by tier key (case-insensitive). */
export async function getLiveFlowersByTier(tier: string): Promise<FlowerProduct[]> {
  const needle = String(tier || "").trim().toUpperCase();
  const flowers = await getLiveFlowers();
  return flowers.filter((flower) => String(flower.tier).trim().toUpperCase() === needle);
}
