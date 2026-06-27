import type { MetadataRoute } from "next";
import { SEO_PAGES } from "./lib/seoPages";
import { MENU_CATEGORIES } from "./lib/products";

const BASE = "https://fortyorkcannabis.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/weed-dispensary-toronto/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/delivery`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/menu`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

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

  return [...staticPages, ...seoPages, ...menuPages];
}
