import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

function read(rel) {
  return readFileSync(new URL(`../${rel}`, import.meta.url), "utf8");
}

test("FYC01 hiring config and policy line match the TV ribbon copy", () => {
  const hiring = read("app/lib/tvHiring.ts");
  const policy = read("app/lib/tvPolicy.ts");

  assert.match(hiring, /store:\s*"FYC01"/);
  assert.match(hiring, /headline:\s*"NOW HIRING"/);
  assert.match(hiring, /role:\s*"BUDTENDERS \/ MANAGERS"/);
  assert.match(hiring, /cta:\s*"APPLY ONLINE"/);
  assert.match(hiring, /url:\s*"https:\/\/fortyorkcannabis.com\/weed-dispensary-toronto"/);
  assert.match(hiring, /displayUrl:\s*"fortyorkcannabis.com\/weed-dispensary-toronto"/);
  assert.match(policy, /ALL SALES ARE FINAL - NO EXCHANGE OR REFUNDS/);
  assert.match(policy, /TV_POLICY_MESSAGE:\s*string\s*\|\s*null/);
});

test("both TV boards render the hiring ribbon under the header and stay noindex", () => {
  const ribbon = read("app/components/HiringRibbon.tsx");
  assert.match(ribbon, /ROTATE_MS = 3000/);
  assert.match(ribbon, /POLICY_FONT_PX = 36/);
  assert.match(ribbon, /TV_POLICY_MESSAGE/);
  assert.match(read("app/components/HiringRibbon.module.css"), /--hiringH:\s*74px/);
  assert.match(read("app/components/HiringRibbon.module.css"), /font-size:\s*36px/);
  assert.match(read("app/tv2/page.tsx"), /<TvPromoTakeover promos=\{TAKEOVER_PROMOS\} \/>/);

  const tv = read("app/tv/page.tsx");
  const tv2 = read("app/tv2/page.tsx");
  assert.match(tv, /<HiringRibbon hiring=\{tvHiring\} \/>/);
  assert.match(tv2, /<HiringRibbon hiring=\{tvHiring\} \/>/);
  assert.match(tv, /className=\{styles\.header\}[\s\S]*hoursAlert[\s\S]*<HiringRibbon/);
  assert.match(tv2, /className=\{styles\.header\}[\s\S]*<HiringRibbon/);

  for (const layout of ["app/tv/layout.tsx", "app/tv2/layout.tsx"]) {
    assert.match(read(layout), /robots:\s*\{\s*index:\s*false,\s*follow:\s*false\s*\}/);
  }
});

test("TV data route and non-TV pages are left alone by the ribbon", () => {
  const route = read("app/api/tv-data/route.ts");
  assert.doesNotMatch(route, /HiringRibbon|TV_POLICY_MESSAGE|tvHiring/);
  assert.doesNotMatch(read("app/page.tsx"), /HiringRibbon/);
  assert.doesNotMatch(read("app/layout.tsx"), /HiringRibbon/);
});
