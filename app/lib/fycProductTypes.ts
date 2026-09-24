/* Minimal product shapes for FYC live inventory (no products.ts dependency). */

export interface PricePoint {
  regular: number;
  sale: number | null;
}

export interface FlowerProduct {
  sku: string;
  name: string;
  slug: string;
  tier: string;
  type: string;
  isHot: boolean;
  isSale: boolean;
  thc: string;
  price3g: PricePoint | null;
  price5g: PricePoint | null;
  price14g: PricePoint | null;
  price28g: PricePoint | null;
  image: string;
  /** Optional ranking field when present in catalog; not required for acceptance. */
  saleRank?: number | null;
  [key: string]: unknown;
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
  [key: string]: unknown;
}
