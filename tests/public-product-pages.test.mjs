import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const sources = [
  "app/lib/publicCatalog.ts",
  "app/flower/[slug]/page.tsx",
  "app/item/[slug]/page.tsx",
  "app/components/CategoryLanding.tsx",
  "app/pre-rolls/page.tsx",
  "app/thc-vapes/page.tsx",
  "app/accessories/page.tsx",
  "app/sitemap.ts",
  "app/[tier]/page.tsx",
].map(read);

test("new product copy does not hardcode an eighth, a delivery desk, or a blocked vendor", () => {
  const blob = sources.join("\n");
  const eighth = ["3", ".", "5"].join("");
  const vendor = ["tel", "nyx"].join("");
  const desk = ["s", "od"].join("");
  assert.equal(blob.includes(eighth), false);
  assert.equal(blob.toLowerCase().includes(vendor), false);
  assert.doesNotMatch(blob, new RegExp(`\\b${desk}\\b`, "i"));
});

test("public item pages drop cigarette and grabba rows and read the live menu", () => {
  const catalog = read("app/lib/publicCatalog.ts");
  const itemPage = read("app/item/[slug]/page.tsx");
  const flowerPage = read("app/flower/[slug]/page.tsx");
  assert.match(catalog, /isRealCigaretteItem/);
  assert.match(catalog, /isGrabbaItem/);
  assert.match(itemPage, /isPublicCatalogItem/);
  assert.match(itemPage, /loadLiveMenuCatalog/);
  assert.match(flowerPage, /loadLiveMenuCatalog/);
  assert.match(flowerPage, /BOGO_BUY_2_GET_1/);
  assert.match(flowerPage, /isFreeGramTier/);
});

test("sitemap lists flower, item, and the new category landings", () => {
  const sitemap = read("app/sitemap.ts");
  assert.match(sitemap, /\/flower\/\$\{flower\.slug\}/);
  assert.match(sitemap, /\/item\/\$\{group\[0\]\.slug\}/);
  assert.match(sitemap, /CATEGORY_LANDINGS/);
  assert.match(sitemap, /isPublicCatalogItem/);
});

test("product grids stay two columns on small screens", () => {
  const shelf = read("app/components/PublicShelf.module.css");
  const tier = read("app/[tier]/tier.module.css");
  assert.match(shelf, /\.grid \{[\s\S]*grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(tier, /\.grid \{[\s\S]*grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/);
});

test("flower links leave cigarette rows on the existing item path", () => {
  const products = read("app/lib/products.ts");
  assert.match(products, /if \("tier" in product\) return `\/flower\/\$\{product\.slug\}`/);
  assert.match(products, /if \(isRealCigaretteItem\(product\)\) return `\/items\/\$\{getProductCategorySlug\(product\)\}\/\$\{product\.slug\}`/);
  assert.match(products, /return `\/item\/\$\{product\.slug\}`/);
});
