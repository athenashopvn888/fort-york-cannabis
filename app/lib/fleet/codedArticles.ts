import { DELIVERY_GUIDE_REGISTRY } from "../deliveryGuideRegistry.ts";
import { GUIDE_REGISTRY } from "../guideRegistry.ts";
import { RESOURCE_PAGES, slugFromPath } from "../../resources/resourceData.ts";
import type { CodedArticleLink, FleetArticle } from "./articles.ts";

/** Coded /resources links listed beside fleet articles. The coded URL stays. */
export function codedResourceLinks(): CodedArticleLink[] {
  return RESOURCE_PAGES.filter((page) => page.path !== "/resources").map((page) => ({
    slug: slugFromPath(page.path),
    title: page.title,
    href: page.path,
  }));
}

/** A coded resource or guide slug wins. The fleet article is omitted. */
export function codedSlugBlocksFleet(slug: string): boolean {
  if (codedResourceLinks().some((link) => link.slug === slug || link.slug.endsWith(`/${slug}`))) return true;
  if (GUIDE_REGISTRY.some((guide) => guide.slug === slug)) return true;
  if (DELIVERY_GUIDE_REGISTRY.some((guide) => guide.slug === slug)) return true;
  return false;
}

export function visibleFleetArticles(articles: readonly FleetArticle[]): FleetArticle[] {
  return articles.filter((article) => !codedSlugBlocksFleet(article.slug));
}
