export type MenuPreviewCategory = {
  name: string;
  detail: string;
  banner: string;
};

export const MENU_PREVIEW_NOTICE =
  "Preview categories are shown while the final Fort York menu is prepared. Inventory, brands, pricing, and availability are coming soon.";

export const MENU_PREVIEW_CATEGORIES: MenuPreviewCategory[] = [
  { name: "Flower", detail: "Menu coming soon", banner: "/brand/category-flower.webp" },
  { name: "Pre-Rolls", detail: "Menu coming soon", banner: "/brand/category-pre-rolls.webp" },
  { name: "Vapes", detail: "Menu coming soon", banner: "/brand/category-vapes.webp" },
  { name: "Edibles", detail: "Menu coming soon", banner: "/brand/category-edibles.webp" },
  { name: "Concentrates", detail: "Menu coming soon", banner: "/brand/category-concentrates.webp" },
  { name: "Accessories", detail: "Menu coming soon", banner: "/brand/category-accessories.webp" },
];
