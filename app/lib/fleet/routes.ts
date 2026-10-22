import { FLEET_ARTICLES_PATH } from "./config.ts";

/** Paths revalidated when a content bundle is published. */
export const FLEET_AFFECTED_PATHS = [
  "/",
  "/contact",
  "/visit",
  "/hours",
  "/faq",
  "/tv",
  "/tv2",
  "/exotic",
  "/premium",
  "/aaa",
  "/aa",
  "/budget",
  "/items/vapes",
  "/items/vape-disposables",
  "/items/edibles",
  "/items/concentrates",
  "/items/prerolls",
  "/items/add-ons",
  "/items/accessories",
  "/items/magic",
  "/items/cigarettes",
  "/native-cigarettes-fort-york",
  "/nicotine-vape-fort-york",
  "/delivery",
  "/guides",
  "/menu",
  "/resources",
  FLEET_ARTICLES_PATH,
] as const;

/** Dynamic article pages. Passed to revalidatePath with type "page". */
export const FLEET_DYNAMIC_PATHS = ["/articles/[slug]"] as const;
