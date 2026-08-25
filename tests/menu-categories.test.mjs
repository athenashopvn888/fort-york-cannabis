import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { isCigaretteDealSku } from "../app/lib/cigaretteDeals.mjs";

const productsSource = readFileSync(new URL("../app/lib/products.ts", import.meta.url), "utf8");
const categoryPageSource = readFileSync(new URL("../app/items/[category]/page.tsx", import.meta.url), "utf8");
const detailPageSource = readFileSync(new URL("../app/items/[category]/[product]/page.tsx", import.meta.url), "utf8");
const infoPageSource = readFileSync(new URL("../app/info/[seoPage]/page.tsx", import.meta.url), "utf8");
const seoPagesSource = readFileSync(new URL("../app/lib/seoPages.ts", import.meta.url), "utf8");
const footerSource = readFileSync(new URL("../app/components/Footer.tsx", import.meta.url), "utf8");
const sitemapSource = readFileSync(new URL("../app/sitemap.ts", import.meta.url), "utf8");
const nextConfigSource = readFileSync(new URL("../next.config.ts", import.meta.url), "utf8");
const items = JSON.parse(readFileSync(new URL("../app/lib/items.json", import.meta.url), "utf8"));

test("menu has dedicated Nicotine Vapes, Vape Disposables, and Cigarettes categories", () => {
  assert.match(productsSource, /key: "VAPE_PENS"[\s\S]*name: "Nicotine Vapes"[\s\S]*slug: "vapes"[\s\S]*itemKeys: \["VAPE PENS"\]/);
  assert.match(productsSource, /key: "VAPE_DISPOSABLES"[\s\S]*name: "Vape Disposables"[\s\S]*slug: "vape-disposables"[\s\S]*itemKeys: \["VAPE DISPOSABLE", "THC VAPE"\]/);
  assert.match(productsSource, /key: "CIGARETTES"[\s\S]*name: "Cigarettes"[\s\S]*slug: "cigarettes"[\s\S]*itemKeys: \["CIGARETTES"\]/);

  const accessoriesBlock = productsSource.match(/key: "ACCESSORIES"[\s\S]*?\n  },/)?.[0] || "";
  assert.doesNotMatch(accessoriesBlock, /"CIGARETTES"/);
});

test("product routing keeps nicotine Vape Pens separate from THC Vape Disposables", () => {
  assert.match(productsSource, /if \(category === "VAPE PENS"\) return "vapes"/);
  assert.match(productsSource, /\["VAPE DISPOSABLE", "THC VAPE", "VAPES"\][\s\S]*return "vape-disposables"/);
  assert.match(productsSource, /if \(category === "CIGARETTES"\) return "cigarettes"/);
});

test("legacy cigarette and disposable product URLs redirect to their new categories", () => {
  assert.match(productsSource, /categorySlug === "accessories" && currentCategory === "cigarettes"/);
  assert.match(productsSource, /categorySlug === "vapes" && currentCategory === "vape-disposables"/);
  assert.match(detailPageSource, /permanentRedirect\(legacyRedirect\)/);
});

test("approved cigarette cards and details show carton plus Mix & Match pricing", () => {
  assert.match(categoryPageSource, /\$25 Cartons/);
  assert.match(categoryPageSource, /2 Pack \$5/);
  assert.match(categoryPageSource, /isCigaretteDealSku\(product\.sku\)/);
  assert.match(detailPageSource, /CIGARETTE_MIX_MATCH_LABEL/);

  const listedApprovedItems = items.filter(
    (item) => item.category === "CIGARETTES" && isCigaretteDealSku(item.sku),
  );
  assert.ok(listedApprovedItems.length > 0);
  for (const item of listedApprovedItems) {
    assert.equal(item.price, "$25", `${item.sku} ${item.name}`);
  }
});

test("CityPlace and other info pages receive both new category cards", () => {
  assert.match(infoPageSource, /MENU_CATEGORIES\.map/);
  assert.match(infoPageSource, /Nicotine Vapes, Vape Disposables/);
  assert.match(infoPageSource, /Cigarettes category includes \$25 cartons plus 2 Pack \$5/);
});

test("both priority categories have unique Fort York SEO content and landing pages", () => {
  assert.match(productsSource, /heading: "Nicotine Vape Pens Near Fort York and CityPlace"/);
  assert.match(productsSource, /heading: "Native Cigarettes Near Fort York and CityPlace"/);
  assert.match(seoPagesSource, /slug: "native-cigarettes-fort-york"/);
  assert.match(seoPagesSource, /slug: "nicotine-vapes-fort-york"/);
  assert.match(seoPagesSource, /Brand preview only\. Selection varies by store/);
  assert.match(seoPagesSource, /Nicotine Vapes and THC Vapes Stay Separate/);
  assert.match(infoPageSource, /heroPreview\.products\.map/);
});

test("SEO landing pages are internally linked and included in the generated sitemap", () => {
  assert.match(footerSource, /href="\/info\/native-cigarettes-fort-york"/);
  assert.match(footerSource, /href="\/info\/nicotine-vapes-fort-york"/);
  assert.match(sitemapSource, /SEO_PAGES\.map/);
});

test("category metadata uses one absolute store-branded title", () => {
  assert.match(categoryPageSource, /title: \{ absolute: category\.seoTitle \}/);
});

test("Next Image accepts the approved live-menu image host", () => {
  assert.match(nextConfigSource, /pub-eb3e1fe18a43477eabc885cfb791d97c\.r2\.dev/);
});
