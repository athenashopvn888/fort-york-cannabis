export type GuideLane = "strain" | "native_cig" | "nic_vape" | "thc_vape";
export type GuideEntry = { slug: string; lane: GuideLane; title: string; name: string; matchedSku: string; categoryPath: string; productPath: string; stockSource: string };
export const GUIDE_STORE = {
  "code": "FYC01",
  "brand": "Fort York Cannabis",
  "domain": "fortyorkcannabis.com",
  "corridor": "Fort York Blvd"
} as const;
export const GUIDE_REGISTRY: GuideEntry[] = [
  {
    "slug": "og-kush",
    "lane": "strain",
    "title": "OG Kush at Fort York Cannabis | Fort York Blvd",
    "name": "OG Kush",
    "matchedSku": "OG KUSH (AAA+) (sku 376) → /items/flower/og-kush-aaa",
    "categoryPath": "/menu",
    "productPath": "/items/flower/og-kush-aaa",
    "stockSource": "live tv-data"
  },
  {
    "slug": "gorilla-glue",
    "lane": "strain",
    "title": "Gorilla Glue at Fort York Cannabis | Fort York Blvd",
    "name": "Gorilla Glue",
    "matchedSku": "GORILLA GLUE 4 (sku 220) → /items/flower/gorilla-glue-4",
    "categoryPath": "/menu",
    "productPath": "/items/flower/gorilla-glue-4",
    "stockSource": "live tv-data"
  },
  {
    "slug": "northern-lights",
    "lane": "strain",
    "title": "Northern Lights at Fort York Cannabis | Fort York Blvd",
    "name": "Northern Lights",
    "matchedSku": "NORTHERN LIGHTS (SHREDS) (sku 107) → /items/flower/northern-lights-shreds",
    "categoryPath": "/menu",
    "productPath": "/items/flower/northern-lights-shreds",
    "stockSource": "live tv-data"
  },
  {
    "slug": "master-kush",
    "lane": "strain",
    "title": "Master Kush at Fort York Cannabis | Fort York Blvd",
    "name": "Master Kush",
    "matchedSku": "MASTER KUSH (AAA+) (sku 310) → /items/flower/master-kush-aaa",
    "categoryPath": "/menu",
    "productPath": "/items/flower/master-kush-aaa",
    "stockSource": "live tv-data"
  },
  {
    "slug": "pineapple-haze",
    "lane": "strain",
    "title": "Pineapple Haze at Fort York Cannabis | Fort York Blvd",
    "name": "Pineapple Haze",
    "matchedSku": "PINEAPPLE HAZE (sku 410) → /items/flower/pineapple-haze",
    "categoryPath": "/menu",
    "productPath": "/items/flower/pineapple-haze",
    "stockSource": "live tv-data"
  },
  {
    "slug": "granddaddy-purple",
    "lane": "strain",
    "title": "Granddaddy Purple at Fort York Cannabis | Fort York Blvd",
    "name": "Granddaddy Purple",
    "matchedSku": "GRANDADDY PURPLE (SHREDS) (sku 106) → /items/flower/grandaddy-purple-shreds",
    "categoryPath": "/menu",
    "productPath": "/items/flower/grandaddy-purple-shreds",
    "stockSource": "live tv-data"
  },
  {
    "slug": "peanut-butter-rockstar",
    "lane": "strain",
    "title": "Peanut Butter Rockstar at Fort York Cannabis | Fort York Blvd",
    "name": "Peanut Butter Rockstar",
    "matchedSku": "PEANUT BUTTER ROCKSTAR (sku 539) → /items/flower/peanut-butter-rockstar",
    "categoryPath": "/menu",
    "productPath": "/items/flower/peanut-butter-rockstar",
    "stockSource": "live tv-data"
  },
  {
    "slug": "slurricane",
    "lane": "strain",
    "title": "Slurricane at Fort York Cannabis | Fort York Blvd",
    "name": "Slurricane",
    "matchedSku": "SLURRICANE (sku 278) → /items/flower/slurricane",
    "categoryPath": "/menu",
    "productPath": "/items/flower/slurricane",
    "stockSource": "live tv-data"
  },
  {
    "slug": "island-pink",
    "lane": "strain",
    "title": "Island Pink at Fort York Cannabis | Fort York Blvd",
    "name": "Island Pink",
    "matchedSku": "ISLAND PINK (sku 400) → /items/flower/island-pink",
    "categoryPath": "/menu",
    "productPath": "/items/flower/island-pink",
    "stockSource": "live tv-data"
  },
  {
    "slug": "pink-rockstar",
    "lane": "strain",
    "title": "Pink Rockstar at Fort York Cannabis | Fort York Blvd",
    "name": "Pink Rockstar",
    "matchedSku": "PINK ROCKSTAR (sku 314) → /items/flower/pink-rockstar",
    "categoryPath": "/menu",
    "productPath": "/items/flower/pink-rockstar",
    "stockSource": "live tv-data"
  },
  {
    "slug": "tequila-sunrise",
    "lane": "strain",
    "title": "Tequila Sunrise at Fort York Cannabis | Fort York Blvd",
    "name": "Tequila Sunrise",
    "matchedSku": "TEQUILA SUNRISE (S) (sku 572) → /items/flower/tequila-sunrise-s",
    "categoryPath": "/menu",
    "productPath": "/items/flower/tequila-sunrise-s",
    "stockSource": "live tv-data"
  },
  {
    "slug": "royal-gorilla",
    "lane": "strain",
    "title": "Royal Gorilla at Fort York Cannabis | Fort York Blvd",
    "name": "Royal Gorilla",
    "matchedSku": "ROYAL GORILLA (sku 204) → /items/flower/royal-gorilla",
    "categoryPath": "/menu",
    "productPath": "/items/flower/royal-gorilla",
    "stockSource": "live tv-data"
  },
  {
    "slug": "diamond-og",
    "lane": "strain",
    "title": "Diamond OG at Fort York Cannabis | Fort York Blvd",
    "name": "Diamond OG",
    "matchedSku": "DIAMOND OG (sku 291) → /items/flower/diamond-og",
    "categoryPath": "/menu",
    "productPath": "/items/flower/diamond-og",
    "stockSource": "live tv-data"
  },
  {
    "slug": "lavender-kush",
    "lane": "strain",
    "title": "Lavender Kush at Fort York Cannabis | Fort York Blvd",
    "name": "Lavender Kush",
    "matchedSku": "LAVENDER KUSH (sku 172) → /items/flower/lavender-kush",
    "categoryPath": "/menu",
    "productPath": "/items/flower/lavender-kush",
    "stockSource": "live tv-data"
  },
  {
    "slug": "bb-cigarettes",
    "lane": "native_cig",
    "title": "BB Native Cigarettes at Fort York Cannabis | Fort York Blvd",
    "name": "BB",
    "matchedSku": "BB LIGHTS CARTON (sku 1000, 1001) → /items/cigarettes/bb-lights-carton, BB FULL CARTON (sku 1002, 1003) → /items/cigarettes/bb-full-carton",
    "categoryPath": "/items/cigarettes",
    "productPath": "/items/cigarettes/bb-lights-carton",
    "stockSource": "items.json (live category verify)"
  },
  {
    "slug": "canadian-classics",
    "lane": "native_cig",
    "title": "Canadian Classics Native Cigarettes at Fort York Cannabis | Fort York Blvd",
    "name": "Canadian Classics",
    "matchedSku": "CANADIAN CLASSICS ORIGINAL (sku 1014) → /items/cigarettes/canadian-classics-original, CANADIAN CLASSICS SILVER (sku 1015) → /items/cigarettes/canadian-classics-silver",
    "categoryPath": "/items/cigarettes",
    "productPath": "/items/cigarettes/canadian-classics-original",
    "stockSource": "items.json (live category verify)"
  },
  {
    "slug": "nexus-cigarettes",
    "lane": "native_cig",
    "title": "Nexus Native Cigarettes at Fort York Cannabis | Fort York Blvd",
    "name": "Nexus",
    "matchedSku": "NEXUS FULL (sku 1017) → /items/cigarettes/nexus-full, NEXUS LIGHTS (sku 1018) → /items/cigarettes/nexus-lights",
    "categoryPath": "/items/cigarettes",
    "productPath": "/items/cigarettes/nexus-full",
    "stockSource": "items.json (live category verify)"
  },
  {
    "slug": "canadian-goose",
    "lane": "native_cig",
    "title": "Canadian Goose Native Cigarettes at Fort York Cannabis | Fort York Blvd",
    "name": "Canadian Goose",
    "matchedSku": "CANADIAN GOOSE FULL (sku 1011) → /items/cigarettes/canadian-goose-full, CANADIAN GOOSE LIGHTS (sku 1012) → /items/cigarettes/canadian-goose-lights",
    "categoryPath": "/items/cigarettes",
    "productPath": "/items/cigarettes/canadian-goose-full",
    "stockSource": "items.json (live category verify)"
  },
  {
    "slug": "putters",
    "lane": "native_cig",
    "title": "Putters Native Cigarettes at Fort York Cannabis | Fort York Blvd",
    "name": "Putters",
    "matchedSku": "PUTTERS (sku 1008) → /items/cigarettes/putters",
    "categoryPath": "/items/cigarettes",
    "productPath": "/items/cigarettes/putters",
    "stockSource": "items.json (live category verify)"
  },
  {
    "slug": "time-cigarettes",
    "lane": "native_cig",
    "title": "Time Native Cigarettes at Fort York Cannabis | Fort York Blvd",
    "name": "Time",
    "matchedSku": "TIME FULL (sku 1019) → /items/cigarettes/time-full",
    "categoryPath": "/items/cigarettes",
    "productPath": "/items/cigarettes/time-full",
    "stockSource": "items.json (live category verify)"
  },
  {
    "slug": "rolled-gold",
    "lane": "native_cig",
    "title": "Rolled Gold Native Cigarettes at Fort York Cannabis | Fort York Blvd",
    "name": "Rolled Gold",
    "matchedSku": "* ROLLED GOLD LIGHTS (sku 1016) → /items/cigarettes/rolled-gold-lights",
    "categoryPath": "/items/cigarettes",
    "productPath": "/items/cigarettes/rolled-gold-lights",
    "stockSource": "items.json (live category verify)"
  },
  {
    "slug": "canadian-cigarettes",
    "lane": "native_cig",
    "title": "Canadian Native Cigarettes at Fort York Cannabis | Fort York Blvd",
    "name": "Canadian",
    "matchedSku": "CANADIAN FULL (sku 1006) → /items/cigarettes/canadian-full, CANADIAN LIGHTS (sku 1005) → /items/cigarettes/canadian-lights, CANADIAN MENTHOL (sku 1013) → /items/cigarettes/canadian-menthol",
    "categoryPath": "/items/cigarettes",
    "productPath": "/items/cigarettes/canadian-full",
    "stockSource": "items.json (live category verify)"
  },
  {
    "slug": "belmont",
    "lane": "native_cig",
    "title": "Belmont Native Cigarettes at Fort York Cannabis | Fort York Blvd",
    "name": "Belmont",
    "matchedSku": "BELMONT KING (PACK ONLY) *NEW PRICE* (sku 1026) → /items/cigarettes/belmont-king-pack-only-new-price",
    "categoryPath": "/items/cigarettes",
    "productPath": "/items/cigarettes/belmont-king-pack-only-new-price",
    "stockSource": "live category page (missing from GH items.json)"
  },
  {
    "slug": "backwoods",
    "lane": "native_cig",
    "title": "Backwoods Native Cigarettes at Fort York Cannabis | Fort York Blvd",
    "name": "Backwoods",
    "matchedSku": "BACKWOODS ASSORTED FLAVORS $20-$25 (sku 701, 702, 704, 705, 706, 707, 708) → /items/cigarettes/backwoods-assorted-flavors-20-25",
    "categoryPath": "/items/cigarettes",
    "productPath": "/items/cigarettes/backwoods-assorted-flavors-20-25",
    "stockSource": "items.json (live category verify)"
  },
  {
    "slug": "grabba",
    "lane": "native_cig",
    "title": "Grabba Native Cigarettes at Fort York Cannabis | Fort York Blvd",
    "name": "Grabba",
    "matchedSku": "GRABBA (sku 240, 241) → /items/cigarettes/grabba, GRABBA RedRose / RedHerring (sku 240, 241) → /items/cigarettes/grabba-redrose-redherring, GRABBA SHAKER *RedRose / Red Herring* X2 AVAILABLE (sku 668, 669, 670, 671) → /items/cigarettes/grabba-shaker-redrose-red-herring-x2-available",
    "categoryPath": "/items/cigarettes",
    "productPath": "/items/cigarettes/grabba",
    "stockSource": "items.json (live category verify)"
  },
  {
    "slug": "ovns-vape",
    "lane": "nic_vape",
    "title": "OVNS Nicotine Vape at Fort York Cannabis | Fort York Blvd",
    "name": "OVNS",
    "matchedSku": "OVNS 10000 – 5% | 10K PUFFS NVape (sku 1081) → /items/vapes/ovns-10000-5-10k-puffs-nvape, OVNS PIONEER – 5% | 22K PUFFS NVape (sku 1082) → /items/vapes/ovns-pioneer-5-22k-puffs-nvape",
    "categoryPath": "/items/vapes",
    "productPath": "/items/vapes/ovns-10000-5-10k-puffs-nvape",
    "stockSource": "items.json (live category verify)"
  },
  {
    "slug": "geek-bar-vape",
    "lane": "nic_vape",
    "title": "Geek Bar Nicotine Vape at Fort York Cannabis | Fort York Blvd",
    "name": "Geek Bar",
    "matchedSku": "GEEK PROMAX – 5% | 30K PUFFS NVape (sku 1072) → /items/vapes/geek-promax-5-30k-puffs-nvape",
    "categoryPath": "/items/vapes",
    "productPath": "/items/vapes/geek-promax-5-30k-puffs-nvape",
    "stockSource": "items.json (live category verify)"
  },
  {
    "slug": "gas-gang-thc-vape",
    "lane": "thc_vape",
    "title": "Gas Gang THC Vape at Fort York Cannabis | Fort York Blvd",
    "name": "Gas Gang",
    "matchedSku": "GAS GANG DISPO THCVape 1G (sku 800, 801, 802) → /items/vape-disposables/gas-gang-dispo-thcvape-1g, 2g GAS GANG Vol.3 HYBRID THCVape (sku 803, 804, 805) → /items/vape-disposables/2g-gas-gang-vol3-hybrid-thcvape",
    "categoryPath": "/items/vape-disposables",
    "productPath": "/items/vape-disposables/gas-gang-dispo-thcvape-1g",
    "stockSource": "items.json (live category verify)"
  },
  {
    "slug": "drizzle-thc-vape",
    "lane": "thc_vape",
    "title": "Drizzle THC Vape at Fort York Cannabis | Fort York Blvd",
    "name": "Drizzle",
    "matchedSku": "DRIZZLE SWITCH 3in1 / 2G THCVape (sku 813) → /items/vape-disposables/drizzle-switch-3in1-2g-thcvape",
    "categoryPath": "/items/vape-disposables",
    "productPath": "/items/vape-disposables/drizzle-switch-3in1-2g-thcvape",
    "stockSource": "items.json (live category verify)"
  }
];
export const getGuide = (slug: string) => GUIDE_REGISTRY.find((guide) => guide.slug === slug);
export const getMenuGuideLinks = () => GUIDE_REGISTRY.filter((guide) => guide.lane === "strain").slice(0, 6);
export function getCategoryGuideGroups(categoryPath: string) {
  const exact = GUIDE_REGISTRY.filter((guide) => guide.categoryPath === categoryPath && guide.lane !== "strain");
  const groups = [
    { label: "Native Cigarettes guides", lane: "native_cig" as const },
    { label: "Nicotine Vape guides", lane: "nic_vape" as const },
    { label: "THC Vape guides", lane: "thc_vape" as const },
  ];
  return groups.map((group) => ({ label: group.label, guides: exact.filter((guide) => guide.lane === group.lane).slice(0, 6) })).filter((group) => group.guides.length);
}
