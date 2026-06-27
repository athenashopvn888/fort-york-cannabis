import { MENU_CATEGORIES, MENU_SOURCE_STATE, MENU_STATUS_NOTICE, getMenuItemCount } from "./products";

export type MenuCatalogCategory = {
  name: string;
  detail: string;
  banner: string;
  href: string;
  count: number;
};

export { MENU_SOURCE_STATE };

export const MENU_CATALOG_NOTICE = MENU_STATUS_NOTICE;

export const MENU_CATALOG_CATEGORIES: MenuCatalogCategory[] = MENU_CATEGORIES.map(
  (category) => ({
    name: category.name,
    detail: category.detail,
    banner: category.banner,
    href: `/items/${category.slug}`,
    count: getMenuItemCount(category),
  }),
);
