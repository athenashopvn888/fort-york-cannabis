import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const sitemap = await readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8");
const cityPage = await readFile(
  new URL("../app/weed-dispensary-toronto/page.tsx", import.meta.url),
  "utf8",
);

test("Toronto city URL is no-slash in the sitemap and canonical", () => {
  assert.match(sitemap, /`\$\{BASE\}\/weed-dispensary-toronto`/);
  assert.doesNotMatch(sitemap, /`\$\{BASE\}\/weed-dispensary-toronto\/`/);
  assert.match(cityPage, /`https:\/\/\$\{gbpLocation\.domain\}\/\$\{gbpLocation\.slug\}`/);
  assert.doesNotMatch(
    cityPage,
    /canonical:\s*`https:\/\/\$\{gbpLocation\.domain\}\/\$\{gbpLocation\.slug\}\/`/,
  );
});
