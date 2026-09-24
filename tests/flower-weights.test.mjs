import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => readFileSync(join(root, rel), "utf8");

const LABEL_FILES = [
  "app/lib/products.ts",
  "app/tv/page.tsx",
  "app/tv2/page.tsx",
  "app/[tier]/page.tsx",
  "app/items/[category]/page.tsx",
  "app/items/[category]/[product]/page.tsx",
  "app/menu/page.tsx",
];

test("store menus label price5g as 5g and do not remap it to 6g", () => {
  const products = read("app/lib/products.ts");
  assert.match(products, /field: "price5g"[\s\S]*?label: "5g"[\s\S]*?grams: 5/);
  assert.doesNotMatch(products, /deal6g|6g Bundle|6g Total|6G BUNDLE|6G TOTAL|grams: 6/);
  assert.doesNotMatch(products, /Buy 3g Get 3g Free/);
});

test("TV and TV2 copy does not advertise a 6g weight", () => {
  for (const rel of ["app/tv/page.tsx", "app/tv2/page.tsx"]) {
    const source = read(rel);
    assert.doesNotMatch(source, /6g|6G|Buy 3g Get 3g Free/);
    assert.doesNotMatch(source, /unitPrice \* 3|unitPrice \* 2/);
  }
  assert.match(read("app/tv/page.tsx"), /Flower weights: 3g, 5g, 14g, and 28g/);
});

test("tier and menu surfaces do not hide a positive 5g or 28g chip", () => {
  const tier = read("app/[tier]/page.tsx");
  assert.match(tier, /hasPositivePrice\(flower\.price5g\)/);
  assert.match(tier, /hasPositivePrice\(flower\.price28g\)/);
  assert.doesNotMatch(tier, /tierKey === "AA"/);
  const css = read("app/items/[category]/items.module.css");
  assert.doesNotMatch(css, /\.weightPill:nth-child\(n\+3\)/);
});

test("baked FYC01 catalog matches the Apps Script snapshot counts", () => {
  const flowers = JSON.parse(read("app/lib/flowers.json"));
  const items = JSON.parse(read("app/lib/items.json"));
  const snapshot = JSON.parse(read("app/lib/stock-snapshot.json"));
  assert.equal(flowers.length, 50);
  assert.equal(items.length, 52);
  assert.equal(snapshot.storeCode, "FYC01");
  assert.equal(snapshot.flowerCount, 50);
  assert.equal(snapshot.itemCount, 52);
  for (const flower of flowers) {
    for (const key of Object.keys(flower)) {
      assert.doesNotMatch(key, /6g|7g/);
    }
    for (const field of ["price3g", "price5g", "price14g", "price28g"]) {
      const price = flower[field];
      if (!price) continue;
      const amount = price.sale ?? price.regular;
      assert.equal(typeof amount, "number");
      assert.ok(amount > 0, `${flower.sku} ${field}`);
    }
  }
});

test("menu label files do not contain a 6g or 7g weight label", () => {
  for (const rel of LABEL_FILES) {
    assert.doesNotMatch(read(rel), /\b[67]g\b/i, rel);
  }
});
