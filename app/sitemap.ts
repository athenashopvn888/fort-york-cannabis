import type { MetadataRoute } from "next";
import { SEO_PAGES } from "./lib/seoPages";
import { MENU_CATEGORIES } from "./lib/products";
import { RESOURCE_PAGES } from "./resources/resourceData";
import { TIER_ROUTE_SLUGS } from "./lib/tierRoutes";

const BASE = "https://fortyorkcannabis.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/visit`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/hours`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/careers/budtender`, lastModified: now, changeFrequency: "monthly", priority: 0.65 },
    { url: `${BASE}/weed-dispensary-toronto/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/delivery`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/menu`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

  const tierPages: MetadataRoute.Sitemap = TIER_ROUTE_SLUGS.map((slug) => ({
    url: `${BASE}/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const seoPages: MetadataRoute.Sitemap = SEO_PAGES.map((p) => ({
    url: `${BASE}/info/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const menuPages: MetadataRoute.Sitemap = MENU_CATEGORIES.map((category) => ({
    url: `${BASE}/items/${category.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.55,
  }));

  const resourcePages: MetadataRoute.Sitemap = RESOURCE_PAGES.map((page) => ({
    url: `${BASE}${page.path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: page.path === "/resources" ? 0.75 : 0.65,
  }));

  return [...staticPages, ...tierPages, ...seoPages, ...menuPages, ...resourcePages];
}
