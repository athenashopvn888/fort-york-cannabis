import { isRealCigaretteItem } from "./cigMarkers";
import {
  getFlowerPriceRows,
  getSalePrice,
  type FlowerProduct,
  type ItemProduct,
} from "./products";
import { isGrabbaItem, isPreservedSmokeItem } from "./siteConfig";

/** Public product pages never list cigarette or grabba rows. Kept smoke accessories stay. */
export function isPublicCatalogItem(item: { category?: string | null; name?: string | null; slug?: string | null }) {
  const row = {
    category: item.category || undefined,
    name: item.name || undefined,
    slug: item.slug || undefined,
  };
  if (isGrabbaItem(row)) return false;
  if (isRealCigaretteItem(row)) return false;
  return true;
}

export type CategoryLandingSlug = "pre-rolls" | "thc-vapes" | "accessories";

export const CATEGORY_LANDINGS: Record<
  CategoryLandingSlug,
  { name: string; path: string; title: string; description: string; intro: string }
> = {
  "pre-rolls": {
    name: "Pre-Rolls",
    path: "/pre-rolls",
    title: "Pre-Rolls | Fort York Cannabis",
    description:
      "Pre-rolls listed on today's Fort York Cannabis menu at 38 Fort York Blvd. Names and prices come from the live menu. Adults 19+.",
    intro:
      "These are the pre-rolls on today's Fort York Cannabis menu. The list follows the live menu, so a name can sell through before you arrive.",
  },
  "thc-vapes": {
    name: "THC Vapes",
    path: "/thc-vapes",
    title: "THC Vapes | Fort York Cannabis",
    description:
      "THC vapes listed on today's Fort York Cannabis menu at 38 Fort York Blvd. Nicotine vapes are a separate shelf. Adults 19+.",
    intro:
      "These are the THC vapes on today's Fort York Cannabis menu. Nicotine vapes stay on their own shelf. Prices are the ones posted on the live menu.",
  },
  accessories: {
    name: "Accessories",
    path: "/accessories",
    title: "Accessories | Fort York Cannabis",
    description:
      "Accessories and add-ons listed on today's Fort York Cannabis menu at 38 Fort York Blvd. Adults 19+.",
    intro:
      "Accessories, add-ons, and specialty items from today's Fort York Cannabis menu. Prices are shown only when the live menu lists one.",
  },
};

export function itemsForLanding(items: ItemProduct[], slug: CategoryLandingSlug): ItemProduct[] {
  return items.filter(isPublicCatalogItem).filter((item) => matchesLanding(item, slug));
}

export function matchesLanding(item: ItemProduct, slug: CategoryLandingSlug) {
  const category = String(item.category || "").toUpperCase();
  if (slug === "pre-rolls") return category === "PREROLLS" || category === "PRE-ROLLS" || category === "PRE ROLLS";
  if (slug === "thc-vapes") return category === "VAPE DISPOSABLE" || category === "THC VAPE";
  return (
    category === "ADD ONS" ||
    category === "ACCESSORIES" ||
    category === "MAGIC & OTHERS" ||
    category === "MAGIC" ||
    isPreservedSmokeItem(item)
  );
}

export function groupBySlug<T extends { slug: string }>(rows: T[]): T[][] {
  const order: string[] = [];
  const grouped = new Map<string, T[]>();
  for (const row of rows) {
    const existing = grouped.get(row.slug);
    if (existing) {
      existing.push(row);
      continue;
    }
    grouped.set(row.slug, [row]);
    order.push(row.slug);
  }
  return order.map((slug) => grouped.get(slug) || []);
}

export function thcNumbers(value: string | null | undefined): number[] {
  return (String(value || "").match(/\d+(?:\.\d+)?/g) || [])
    .map(Number)
    .filter((n) => Number.isFinite(n) && n > 0 && n <= 100)
    .map((n) => (n > 0 && n <= 1 ? Math.round(n * 100) : n));
}

export function formatThc(value: number): string {
  const rounded = Math.round(value * 10) / 10;
  return Number.isInteger(rounded) ? `${rounded}%` : `${rounded.toFixed(1)}%`;
}

export function formatCad(amount: number): string {
  if (!Number.isFinite(amount) || amount <= 0) return "";
  const cents = Math.round(amount * 100);
  return cents % 100 === 0 ? `$${cents / 100}` : `$${(cents / 100).toFixed(2)}`;
}

export function thcRangeSentence(values: string[]): string {
  const nums = values.flatMap((value) => thcNumbers(value));
  if (!nums.length) return "";
  const low = Math.min(...nums);
  const high = Math.max(...nums);
  return low === high ? `THC listed at ${formatThc(low)}.` : `THC runs from ${formatThc(low)} to ${formatThc(high)}.`;
}

function mode(values: number[]): number | null {
  const counts = new Map<number, number>();
  for (const value of values) {
    if (Number.isFinite(value) && value > 0) counts.set(value, (counts.get(value) || 0) + 1);
  }
  let best: number | null = null;
  let count = 0;
  for (const [value, seen] of counts) {
    if (seen > count || (seen === count && best !== null && value > best)) {
      best = value;
      count = seen;
    }
  }
  return best;
}

/** Most common positive pack price already on the live menu. No stand-in price. */
export function tierPriceSentence(flowers: FlowerProduct[]): string {
  const buckets = new Map<string, number[]>();
  for (const flower of flowers) {
    for (const row of getFlowerPriceRows(flower)) {
      const amount = getSalePrice(row.price);
      if (!(amount > 0)) continue;
      const list = buckets.get(row.label) || [];
      list.push(amount);
      buckets.set(row.label, list);
    }
  }
  for (const label of ["3g", "6g", "5g", "14g", "28g"]) {
    const common = mode(buckets.get(label) || []);
    if (common === null) continue;
    return `Listed ${label} price on this tier is ${formatCad(common)}.`;
  }
  return "";
}

export function describeTierShelf(flowers: FlowerProduct[]): string {
  return [tierPriceSentence(flowers), thcRangeSentence(flowers.map((flower) => flower.thc))].filter(Boolean).join(" ");
}

export function singleListedDollar(value: string | null | undefined): number | null {
  const raw = String(value || "").trim();
  if (!raw || raw.includes("-") || raw.includes("/")) return null;
  const match = raw.match(/^\$?\s*(\d+(?:\.\d{1,2})?)$/);
  if (!match) return null;
  const amount = Number(match[1]);
  return Number.isFinite(amount) && amount > 0 ? amount : null;
}
