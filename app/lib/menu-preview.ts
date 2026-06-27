import { MENU_CATEGORIES, MENU_SOURCE_STATE, MENU_STATUS_NOTICE } from "./products";

export type MenuPreviewCategory = {
  name: string;
  detail: string;
  banner: string;
  href: string;
};

export { MENU_SOURCE_STATE };

export const MENU_PREVIEW_NOTICE = MENU_STATUS_NOTICE;

export const MENU_PREVIEW_CATEGORIES: MenuPreviewCategory[] = MENU_CATEGORIES.map(
  (category) => ({
    name: category.name,
    detail: category.detail,
    banner: category.banner,
    href: `/items/${category.slug}`,
  }),
);
