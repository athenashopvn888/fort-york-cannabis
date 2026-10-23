import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  CIG_WORDING_FALLBACK,
  decideCigaretteGuide,
  decideCigaretteSurface,
  foldCodedGate,
  reconcileSurfaceItems,
  resolveCigWording,
  resolveSurfaceFlag,
  visibleCategoryBoards,
} from "../app/lib/cigDecision.ts";
import { SHOW_CIGARETTES } from "../app/lib/siteConfig.ts";

const carton = { category: "CIGARETTES", name: "BB FULL CARTON", slug: "bb-full-carton" };
const grabba = { category: "CIGARETTES", name: "GRABBA", slug: "grabba" };
const backwoods = { category: "CIGARETTES", name: "BACKWOODS ASSORTED FLAVORS $20-$25", slug: "backwoods-assorted-flavors-20-25" };
const pouch = { category: "CIGARETTES", name: "NICOTINE POUCHES , VELO, PABLO, KILLA", slug: "nicotine-pouches-velo-pablo-killa" };
const zyn = { category: "CIGARETTES", name: "ZYN CITRUS", slug: "zyn-citrus" };
const velo = { category: "CIGARETTES", name: "VELO MINT", slug: "velo-mint" };
const wrap = { category: "CIGARETTES", name: "HEMP WRAP", slug: "hemp-wrap" };
const paper = { category: "CIGARETTES", name: "ROLLING PAPER", slug: "rolling-paper" };
const cigarillo = { category: "CIGARETTES", name: "CIGARILLO", slug: "cigarillo" };
const vape = { category: "VAPE PENS", name: "Mango Ice", slug: "mango-ice" };

const wording = {
  bannerText: "FEED BANNER",
  promoBrands: "FEED BRANDS",
  tv2BoardTitle: "FEED BOARD",
  wrapsTitle: "WRAPS FEED",
  tickerLine1: "FEED TICKER",
  priceTwoPack: "$5",
  priceCarton: "$25",
  priceBelmont: "$10",
  priceBB2Pack: "$5",
};

function cig(extra: Record<string, unknown> = {}) {
  return { on: false, tvOn: false, webOn: false, webFollowsTv: true, wording, ...extra };
}

test("website follows webOn and TV follows tvOn, with on as the fallback", () => {
  const items = [carton, backwoods];
  assert.equal(decideCigaretteSurface({ cig: cig({ webOn: true, tvOn: false }), items, surface: "web" }).show, true);
  assert.equal(decideCigaretteSurface({ cig: cig({ webOn: true, tvOn: false }), items, surface: "tv" }).show, false);
  assert.equal(decideCigaretteSurface({ cig: cig({ webOn: false, tvOn: true }), items, surface: "web" }).show, false);
  assert.equal(decideCigaretteSurface({ cig: cig({ webOn: false, tvOn: true }), items, surface: "tv" }).show, true);
  assert.equal(resolveSurfaceFlag({ on: true }, "web"), true);
  assert.equal(resolveSurfaceFlag({ on: true }, "tv"), true);
  assert.equal(resolveSurfaceFlag(cig({ on: true, webOn: false }), "web"), false);
  assert.equal(resolveSurfaceFlag(cig({ on: false, tvOn: true, webFollowsTv: true }), "tv"), true);
  assert.equal(resolveSurfaceFlag(cig({ on: true, webOn: false, webFollowsTv: true }), "web"), false);
});

test("only an explicit false flag, no real items, or the env override hides cigarettes", () => {
  const items = [carton, grabba, backwoods];
  const missing = decideCigaretteSurface({ cig: null, items, surface: "web" });
  assert.equal(missing.reason, "missing");
  assert.equal(missing.show, true);
  assert.equal(decideCigaretteSurface({ cig: cig(), items, surface: "tv" }).show, false);
  assert.equal(decideCigaretteSurface({ cig: cig({ on: true, webOn: true, tvOn: true }), items: [backwoods, pouch], surface: "web" }).reason, "no-items");
  const errored = decideCigaretteSurface({ cig: cig({ on: true, webOn: false, tvOn: false }), items, surface: "web", errored: true });
  assert.equal(errored.reason, "error");
  assert.equal(errored.show, true);
  assert.equal(decideCigaretteSurface({ cig: cig({ on: true, webOn: true, tvOn: true }), items, surface: "tv", envRaw: "false" }).reason, "env");
  assert.equal(decideCigaretteSurface({ cig: cig({ on: true, webOn: true, tvOn: true }), items, surface: "web", envRaw: "true" }).show, true);
});

test("wording uses the feed and falls back to the current copy field by field", () => {
  assert.equal(resolveCigWording({ bannerText: "  FEED BANNER  ", wrapsTitle: "" }).bannerText, "FEED BANNER");
  assert.equal(resolveCigWording({ bannerText: "  FEED BANNER  " }).wrapsTitle, CIG_WORDING_FALLBACK.wrapsTitle);
  assert.equal(resolveCigWording(undefined).tickerLine1, CIG_WORDING_FALLBACK.tickerLine1);
  assert.equal(CIG_WORDING_FALLBACK.bannerText, "2 PACKS $5 / $25 CARTON");
  assert.equal(CIG_WORDING_FALLBACK.tickerLine1, "CIGARETTES 2 PACK $5 MIX MATCH !");
  assert.equal(decideCigaretteSurface({ cig: cig({ webOn: false }), items: [backwoods], surface: "web" }).wording.wrapsTitle, "WRAPS FEED");
  assert.equal(decideCigaretteSurface({ cig: null, items: [], surface: "tv" }).wording.bannerText, CIG_WORDING_FALLBACK.bannerText);
});

test("null flags with real cigarettes stay open and an explicit false still hides", () => {
  const open = decideCigaretteSurface({ cig: { on: null, webOn: null, tvOn: null, wording }, items: [carton], surface: "web" });
  assert.equal(open.show, true);
  assert.equal(open.reason, "on");
  assert.equal(decideCigaretteSurface({ cig: { on: false }, items: [carton], surface: "tv" }).reason, "off");
  assert.equal(decideCigaretteGuide({ cig: { master: null, on: null }, items: [carton] }).show, true);
});

test("guide pages follow the master switch and a feed error stays open", () => {
  const items = [carton];
  assert.equal(decideCigaretteGuide({ cig: cig({ on: false, master: false, webOn: true }), items }).show, false);
  assert.equal(decideCigaretteGuide({ cig: cig({ on: true, master: true, webOn: false }), items }).show, true);
  assert.equal(decideCigaretteGuide({ cig: null, items, errored: true }).show, true);
  assert.equal(decideCigaretteGuide({ cig: cig({ on: true, master: true }), items, envRaw: "off" }).reason, "env");
});

test("each surface hides real cigarettes itself and always keeps wraps and pouches", () => {
  const menu = [vape, carton, grabba, backwoods, pouch, zyn, velo, wrap, paper, cigarillo];
  const hidden = reconcileSurfaceItems(menu, menu, false);
  assert.deepEqual(hidden.map((item) => item.slug), [vape.slug, backwoods.slug, pouch.slug, zyn.slug, velo.slug, wrap.slug, paper.slug, cigarillo.slug]);
  const shown = reconcileSurfaceItems([vape, backwoods], [carton, backwoods], true);
  assert.deepEqual(shown.map((item) => item.slug), [vape.slug, backwoods.slug, carton.slug]);
});

test("TV follows tvOn and the website keeps the coded gate when TV is on", () => {
  const items = [carton, backwoods, pouch];
  const feed = cig({ webOn: false, tvOn: true, on: true });
  const web = foldCodedGate(decideCigaretteSurface({ cig: feed, items, surface: "web" }), "web");
  const tv = foldCodedGate(decideCigaretteSurface({ cig: feed, items, surface: "tv" }), "tv");
  assert.equal(web.show, false);
  assert.equal(web.reason, "off");
  assert.equal(tv.show, true);
  assert.equal(tv.reason, "on");

  const webOn = foldCodedGate(decideCigaretteSurface({ cig: cig({ webOn: true, tvOn: true, on: true }), items, surface: "web" }), "web");
  assert.equal(webOn.show, SHOW_CIGARETTES);
  const tvOff = foldCodedGate(decideCigaretteSurface({ cig: cig({ webOn: true, tvOn: false, on: true }), items, surface: "tv" }), "tv");
  assert.equal(tvOff.show, false);
  assert.equal(tvOff.reason, "off");

  const tvMissing = foldCodedGate(decideCigaretteSurface({ cig: null, items, surface: "tv" }), "tv");
  assert.equal(tvMissing.reason, "missing");
  assert.equal(tvMissing.show, true);
  const webMissing = foldCodedGate(decideCigaretteSurface({ cig: null, items, surface: "web" }), "web");
  assert.equal(webMissing.show, SHOW_CIGARETTES);

  const tvEnv = foldCodedGate(decideCigaretteSurface({ cig: cig({ webOn: true, tvOn: true, on: true }), items, surface: "tv", envRaw: "false" }), "tv");
  assert.equal(tvEnv.reason, "env");
  assert.equal(tvEnv.show, false);
  const webEnv = foldCodedGate(decideCigaretteSurface({ cig: cig({ webOn: true, tvOn: true, on: true }), items, surface: "web", envRaw: "off" }), "web");
  assert.equal(webEnv.show, false);

  const hiddenItems = reconcileSurfaceItems(items, items, false).map((item) => item.slug);
  const shownItems = reconcileSurfaceItems(items, items, true).map((item) => item.slug);
  assert.deepEqual(hiddenItems, [backwoods.slug, pouch.slug]);
  assert.deepEqual(shownItems, [carton.slug, backwoods.slug, pouch.slug]);
});

test("the TV card list includes cigarettes only while the live flag is on", () => {
  const boards = [{ id: "EDIBLES" }, { id: "CIGARETTES" }, { id: "CONCENTRATES" }];
  assert.deepEqual(visibleCategoryBoards(boards, true).map((board) => board.id), ["EDIBLES", "CIGARETTES", "CONCENTRATES"]);
  assert.deepEqual(visibleCategoryBoards(boards, false).map((board) => board.id), ["EDIBLES", "CONCENTRATES"]);
});

test("TV pages read the live header and the items route does not use the coded switch", () => {
  const tv2 = readFileSync(new URL("../app/tv2/page.tsx", import.meta.url), "utf8");
  const tv = readFileSync(new URL("../app/tv/page.tsx", import.meta.url), "utf8");
  const route = readFileSync(new URL("../app/api/tv-data/route.ts", import.meta.url), "utf8");
  assert.match(tv2, /readCigaretteTvHeader\(res\.headers\)/);
  assert.match(tv2, /visibleCategoryBoards\(BOARDS_RAW, showCigs\)/);
  assert.match(tv2, /setInterval\(load, 5 \* 60 \* 1000\)/);
  assert.doesNotMatch(tv2, /SHOW_CIGARETTES/);
  assert.match(tv, /readCigaretteTvHeader\(itemRes\.headers\)/);
  assert.match(tv, /setInterval\(load, 5 \* 60 \* 1000\)/);
  assert.doesNotMatch(tv, /SHOW_CIGARETTES/);
  assert.match(route, /reconcileSurfaceItems\([\s\S]*cig\.tv\.show\)/);
  assert.doesNotMatch(route, /filterCigaretteItems/);
  const homepage = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(homepage, /showCigs=\{cigarettes\.web\.show\}/);
  assert.match(homepage, /SHOW_CIGARETTES/);
});
