export type DemoMenuCategory = {
  name: string;
  detail: string;
  banner: string;
};

export type DemoMenuItem = {
  name: string;
  category: string;
  format: string;
  profile: string;
  note: string;
};

export const DEMO_MENU_NOTICE =
  "Sample menu preview only. Final Fort York inventory, brands, pricing, availability, pickup, delivery, and promotions are pending owner confirmation.";

export const DEMO_MENU_CATEGORIES: DemoMenuCategory[] = [
  { name: "Flower", detail: "Sample menu preview", banner: "/banners/fort_york_flower_banner.webp" },
  { name: "Pre-Rolls", detail: "Final menu coming soon", banner: "/banners/fort_york_prerolls_banner.webp" },
  { name: "Vapes", detail: "Inventory pending", banner: "/banners/fort_york_vapes_banner.webp" },
  { name: "Edibles", detail: "Sample layout only", banner: "/banners/fort_york_edibles_banner.webp" },
  { name: "Concentrates", detail: "Owner confirmation pending", banner: "/banners/fort_york_concentrates_banner.webp" },
  { name: "Accessories", detail: "Menu coming soon", banner: "/banners/fort_york_accessories_banner.webp" },
];

export const DEMO_MENU_ITEMS: DemoMenuItem[] = [
  {
    name: "Sample Indica Flower",
    category: "Flower",
    format: "3.5 g example card",
    profile: "Relaxed profile pending confirmation",
    note: "Demo product card only",
  },
  {
    name: "Sample Sativa Flower",
    category: "Flower",
    format: "3.5 g example card",
    profile: "Bright profile pending confirmation",
    note: "Inventory pending owner confirmation",
  },
  {
    name: "Sample Single Pre-Roll",
    category: "Pre-Rolls",
    format: "Single pre-roll example",
    profile: "Profile pending confirmation",
    note: "Preview layout only",
  },
  {
    name: "Sample Multi-Pack",
    category: "Pre-Rolls",
    format: "Multi-pack example",
    profile: "Profile pending confirmation",
    note: "Final menu coming soon",
  },
  {
    name: "Sample 510 Vape Cart",
    category: "Vapes",
    format: "510 cart example",
    profile: "Profile pending confirmation",
    note: "No live availability claimed",
  },
  {
    name: "Sample Disposable Vape",
    category: "Vapes",
    format: "Disposable example",
    profile: "Profile pending confirmation",
    note: "Preview layout only",
  },
  {
    name: "Sample Gummies",
    category: "Edibles",
    format: "Edible example",
    profile: "Profile pending confirmation",
    note: "Demo product card only",
  },
  {
    name: "Sample Chocolate",
    category: "Edibles",
    format: "Edible example",
    profile: "Profile pending confirmation",
    note: "Inventory pending owner confirmation",
  },
  {
    name: "Sample Live Resin",
    category: "Concentrates",
    format: "Concentrate example",
    profile: "Profile pending confirmation",
    note: "Preview layout only",
  },
  {
    name: "Sample Hash",
    category: "Concentrates",
    format: "Concentrate example",
    profile: "Profile pending confirmation",
    note: "Final menu coming soon",
  },
  {
    name: "Sample Rolling Papers",
    category: "Accessories",
    format: "Accessory example",
    profile: "Accessory details pending confirmation",
    note: "Demo product card only",
  },
  {
    name: "Sample Grinder",
    category: "Accessories",
    format: "Accessory example",
    profile: "Accessory details pending confirmation",
    note: "Preview layout only",
  },
];

export const FEATURED_DEMO_MENU_ITEMS = DEMO_MENU_ITEMS.slice(0, 6);

export function getDemoItemsForCategory(category: string) {
  return DEMO_MENU_ITEMS.filter((item) => item.category === category);
}
