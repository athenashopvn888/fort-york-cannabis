export type MenuPreviewCategory = {
  name: string;
  detail: string;
  banner: string;
};

export const MENU_PREVIEW_NOTICE =
  "Preview categories are shown while the final Fort York menu is prepared. Inventory, brands, pricing, and availability are coming soon.";

export const MENU_PREVIEW_CATEGORIES: MenuPreviewCategory[] = [
  { name: "Flower", detail: "Menu coming soon", banner: "/banners/fort_york_flower_banner.webp" },
  { name: "Pre-Rolls", detail: "Menu coming soon", banner: "/banners/fort_york_prerolls_banner.webp" },
  { name: "Vapes", detail: "Menu coming soon", banner: "/banners/fort_york_vapes_banner.webp" },
  { name: "Edibles", detail: "Menu coming soon", banner: "/banners/fort_york_edibles_banner.webp" },
  { name: "Concentrates", detail: "Menu coming soon", banner: "/banners/fort_york_concentrates_banner.webp" },
  { name: "Accessories", detail: "Menu coming soon", banner: "/banners/fort_york_accessories_banner.webp" },
];
