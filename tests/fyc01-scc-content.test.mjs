import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => readFileSync(join(root, rel), "utf8");

test("visit and hours routes exist with indexable metadata", () => {
  const visit = read("app/visit/page.tsx");
  const hours = read("app/hours/page.tsx");
  assert.match(visit, /canonical: `\$\{STORE_NAP\.origin\}\/visit`/);
  assert.match(hours, /canonical: `\$\{STORE_NAP\.origin\}\/hours`/);
  assert.match(visit, /robots:\s*\{\s*index:\s*true,\s*follow:\s*true/);
  assert.match(hours, /robots:\s*\{\s*index:\s*true,\s*follow:\s*true/);
  assert.match(hours, /Open 24 hours/);
  assert.match(visit, /38 Fort York Blvd/);
});

test("tier CollectionPage+ItemList schema is wired for fleet slugs", () => {
  const tier = read("app/[tier]/page.tsx");
  const routes = read("app/lib/tierRoutes.ts");
  assert.match(routes, /"exotic".*"premium".*"aaa".*"aa".*"budget"/s);
  assert.match(tier, /"@type": "CollectionPage"/);
  assert.match(tier, /"@type": "ItemList"/);
  assert.match(tier, /mainEntity/);
});

test("sitemap lists visit, hours, and tier routes", () => {
  const sitemap = read("app/sitemap.ts");
  assert.match(sitemap, /\/visit/);
  assert.match(sitemap, /\/hours/);
  assert.match(sitemap, /TIER_ROUTE_SLUGS/);
});

test("layout emits Store and FAQPage schema", () => {
  const layout = read("app/layout.tsx");
  assert.match(layout, /storeJsonLd/);
  assert.match(layout, /faqPageJsonLd\(HOME_FAQS\)/);
});

test("NAP and 24h claim match GBP-backed storeNap", () => {
  const nap = read("app/lib/storeNap.ts");
  assert.match(nap, /streetAddress: "38 Fort York Blvd"/);
  assert.match(nap, /postalCode: "M5V 3Z3"/);
  assert.match(nap, /phoneDisplay: "437-783-2511"/);
  assert.match(nap, /is24h: true/);
  assert.match(nap, /latitude: 43\.6403021/);
  assert.match(nap, /longitude: -79\.3952522/);
});

test("flower weight vocabulary on tier SEO copy stays on 3/5/14/28g", () => {
  const seo = read("app/lib/tierSeoContent.ts");
  assert.doesNotMatch(seo, /3\.5g|7g/);
  assert.match(seo, /3g, 5g, 14g, and 28g/);
});

test("native cigarette wording stays merchandise-category careful", () => {
  const footer = read("app/components/Footer.tsx");
  assert.match(footer, /Native Cigarettes Fort York/);
  assert.doesNotMatch(footer, /traditional|ceremony|indigenous medicine/i);
});
