export type ResourceAuthorKey = "team" | "menu" | "local";

export interface ResourceAuthor {
  name: string;
  handle: string;
  role: string;
}

export interface ResourceLink {
  label: string;
  href: string;
  description?: string;
}

export interface ResourceSection {
  heading: string;
  body: string[];
  bullets?: string[];
  links?: ResourceLink[];
}

export interface ResourcePage {
  path: string;
  kind: "root" | "category" | "article";
  parent?: string;
  categoryLabel: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  excerpt: string;
  primaryKeyword: string;
  supportingKeywords: string[];
  searchIntent: string;
  author: ResourceAuthorKey;
  datePublished: string;
  dateModified: string;
  image: { src: string; alt: string };
  intro: string[];
  sections: ResourceSection[];
  commercialLinks: ResourceLink[];
  related: string[];
}

export const SITE = {
  name: "FORT YORK CANNABIS",
  domain: "fortyorkcannabis.com",
  baseUrl: "https://fortyorkcannabis.com",
  storePage: "/weed-dispensary-toronto",
  address: "38 Fort York Blvd, Toronto, ON",
  phone: "437-783-2511",
  hours: "24 hours",
};

export const AUTHORS: Record<ResourceAuthorKey, ResourceAuthor> = {
  team: { name: "FORT YORK CANNABIS Team", handle: "@FortYorkCannabis", role: "Store Team" },
  menu: { name: "Fort York Menu Desk", handle: "@FortYorkMenu", role: "Menu Guide" },
  local: { name: "CityPlace Desk", handle: "@FortYorkLocal", role: "Local Guide" },
};

export const updated = "2026-07-15";

const hero = {
  src: "/brand/og-fort-york-cannabis.webp",
  alt: "FORT YORK CANNABIS resource guide",
};

export const RESOURCE_PAGES: ResourcePage[] = [
  {
    path: "/resources",
    kind: "root",
    categoryLabel: "Resource Centre",
    title: "FORT YORK CANNABIS Resource Centre",
    seoTitle: "FORT YORK CANNABIS Resources | Fort York, CityPlace, Vapes, Pouches",
    metaDescription:
      "FORT YORK CANNABIS resources for Fort York, CityPlace, King West, Gas Gang, Drizzle, nicotine pouches, Backwoods, grabba, vapes, edibles, pre-rolls, flower, and accessories.",
    h1: "FORT YORK CANNABIS Resource Centre",
    excerpt:
      "Downtown Toronto guides for the full menu: Gas Gang, Drizzle, nicotine pouches, Backwoods, grabba, vapes, edibles, pre-rolls, flower, concentrates, accessories, and local visits.",
    primaryKeyword: "FORT YORK CANNABIS resources",
    supportingKeywords: [
      "Fort York cannabis guide",
      "CityPlace cannabis store",
      "Gas Gang vapes Toronto",
      "Drizzle Switch Toronto",
      "nicotine pouches Fort York",
    ],
    searchIntent: "Find Fort York cannabis shopping guides and current product-brand pages.",
    author: "team",
    datePublished: updated,
    dateModified: updated,
    image: hero,
    intro: [
      "Fort York shoppers are not all asking the same flower question. The current menu data carries strong non-flower language: Gas Gang Dispo Vape 1G, 2g Gas Gang Vol.3 Hybrid, Drizzle Switch 3in1 / 2G, Happy Dad pouches, ZYN pouches, Velo, Pablo, Killa, Backwoods, and grabba.",
      "This resource centre gives those terms a home beside flower, pre-rolls, edibles, concentrates, and local Fort York/CityPlace visit guides.",
    ],
    sections: [
      {
        heading: "Product Names Shape the Shop",
        body: [
          "Gas Gang, Drizzle, nicotine pouches, Backwoods, and grabba are current product names shoppers can search directly. They should sit in the site vocabulary, not hide under one accessories page.",
        ],
      },
      {
        heading: "Downtown Context Matters",
        body: [
          "Fort York, CityPlace, the waterfront, King West, Rogers Centre, and the Entertainment District all create different trip styles. The resource hub connects local intent to the right shelf.",
        ],
      },
    ],
    commercialLinks: [
      { label: "View the Fort York store page", href: SITE.storePage },
      { label: "Shop vapes", href: "/items/vapes" },
      { label: "Shop accessories, pouches, and smokes", href: "/items/accessories" },
      { label: "Browse edibles", href: "/items/edibles" },
    ],
    related: [
      "/resources/brand-guides/gas-gang-drizzle-vapes",
      "/resources/nicotine-pouches",
      "/resources/native-smokes/backwoods-grabba-guide",
    ],
  },
  {
    path: "/resources/menu-guide",
    kind: "article",
    parent: "/resources",
    categoryLabel: "Menu Guide",
    title: "Fort York Menu Guide",
    seoTitle: "Fort York Cannabis Menu Guide | Vapes, Pouches, Edibles, Flower",
    metaDescription:
      "Fort York menu guide for Gas Gang, Drizzle, nicotine pouches, Backwoods, grabba, vapes, edibles, pre-rolls, concentrates, flower, and accessories.",
    h1: "Fort York Menu Guide: Start With the Shelf",
    excerpt:
      "Use the menu by category first, then narrow with current names like Gas Gang, Drizzle, Happy Dad, ZYN, Velo, Pablo, Killa, Backwoods, and grabba.",
    primaryKeyword: "Fort York cannabis menu guide",
    supportingKeywords: ["CityPlace cannabis menu", "Gas Gang menu Toronto", "Drizzle vape menu", "nicotine pouches Toronto"],
    searchIntent: "Navigate the current Fort York menu by shelf and brand name.",
    author: "menu",
    datePublished: updated,
    dateModified: updated,
    image: { src: "/brand/category-vapes.webp", alt: "Fort York menu guide for vapes and non-flower shelves" },
    intro: [
      "Fort York's menu is easier when the shelf comes first. Vapes, edibles, pre-rolls, concentrates, accessories, pouches, smokes, and flower all need their own comparison logic.",
    ],
    sections: [
      {
        heading: "Current Non-Flower Names Worth Search Space",
        body: [
          "The current data lists Gas Gang Dispo Vape 1G at $45, 2g Gas Gang Vol.3 Hybrid at $50, Drizzle Switch 3in1 / 2G at $50, nicotine pouches with Velo, Pablo, and Killa at $20, Happy Dad 6MGx20 nicotine pouches, ZYN nicotine pouches, Backwoods, grabba, and grabba shaker.",
        ],
      },
      {
        heading: "Use Accessories for Smoke-Shelf Items",
        body: [
          "Fort York groups cigarettes, pouches, Backwoods, grabba, and specialty add-ons through the accessories path, so resource pages should point shoppers there without calling everything flower.",
        ],
      },
    ],
    commercialLinks: [
      { label: "Shop vapes", href: "/items/vapes" },
      { label: "Shop accessories and smokes", href: "/items/accessories" },
      { label: "Shop pre-rolls", href: "/items/pre-rolls" },
      { label: "Shop edibles", href: "/items/edibles" },
    ],
    related: ["/resources/brand-guides/gas-gang-drizzle-vapes", "/resources/nicotine-pouches", "/resources/local-guides/fort-york-cityplace-visit-guide"],
  },
  {
    path: "/resources/brand-guides",
    kind: "category",
    parent: "/resources",
    categoryLabel: "Brand Guides",
    title: "Brand and Product Guides",
    seoTitle: "Fort York Brand Guides | Gas Gang, Drizzle, Pouches, Backwoods",
    metaDescription:
      "FORT YORK CANNABIS brand guides for Gas Gang, Drizzle, nicotine pouches, Backwoods, grabba, and current non-flower product names.",
    h1: "Brand Guides for the Downtown Shelf",
    excerpt:
      "Gas Gang, Drizzle, pouches, Backwoods, and grabba get direct guide pages built from current product data.",
    primaryKeyword: "Fort York brand guides",
    supportingKeywords: ["Gas Gang Toronto", "Drizzle Switch Toronto", "Backwoods Fort York", "grabba Fort York"],
    searchIntent: "Find current product-brand guide pages.",
    author: "menu",
    datePublished: updated,
    dateModified: updated,
    image: { src: "/brand/category-vapes.webp", alt: "Fort York product brand guides" },
    intro: [
      "Brand-led searches are real searches. If a shopper asks for Gas Gang, Drizzle, Velo, Pablo, Killa, Backwoods, or grabba, the site should have a clear answer path.",
    ],
    sections: [
      {
        heading: "Not Every Query Starts With Cannabis Flower",
        body: [
          "This section gives non-flower products their own weight while still linking shoppers back to current menu categories.",
        ],
      },
    ],
    commercialLinks: [
      { label: "Gas Gang and Drizzle vapes", href: "/resources/brand-guides/gas-gang-drizzle-vapes" },
      { label: "Nicotine pouches", href: "/resources/nicotine-pouches" },
      { label: "Backwoods and grabba", href: "/resources/native-smokes/backwoods-grabba-guide" },
    ],
    related: ["/resources/vape-guides", "/resources/native-smokes", "/resources/menu-guide"],
  },
  {
    path: "/resources/brand-guides/gas-gang-drizzle-vapes",
    kind: "article",
    parent: "/resources/brand-guides",
    categoryLabel: "Vape Brands",
    title: "Gas Gang and Drizzle Vape Guide",
    seoTitle: "Gas Gang and Drizzle Vapes | FORT YORK CANNABIS",
    metaDescription:
      "FORT YORK CANNABIS guide for Gas Gang Dispo Vape 1G, 2g Gas Gang Vol.3 Hybrid, and Drizzle Switch 3in1 / 2G from the current vape menu.",
    h1: "Gas Gang and Drizzle Vapes at Fort York",
    excerpt:
      "A direct guide for Gas Gang Dispo Vape 1G, 2g Gas Gang Vol.3 Hybrid, and Drizzle Switch 3in1 / 2G.",
    primaryKeyword: "Gas Gang vapes Toronto",
    supportingKeywords: ["Drizzle Switch 3in1 2G", "Gas Gang disposable vape", "Fort York vapes"],
    searchIntent: "Compare named vape products at Fort York Cannabis.",
    author: "menu",
    datePublished: updated,
    dateModified: updated,
    image: { src: "/brand/category-vapes.webp", alt: "Gas Gang and Drizzle vapes at Fort York" },
    intro: [
      "The current vape data supports a real brand guide: Gas Gang Dispo Vape 1G at $45, 2g Gas Gang Vol.3 Hybrid at $50, and Drizzle Switch 3in1 / 2G at $50.",
    ],
    sections: [
      {
        heading: "Current Listed Vape Names",
        body: [
          "These product names should show up in search-friendly content because shoppers recognize them faster than a generic vape category.",
        ],
        bullets: [
          "Gas Gang Dispo Vape 1G - $45",
          "2g Gas Gang Vol.3 Hybrid - $50",
          "Drizzle Switch 3in1 / 2G - $50",
        ],
      },
      {
        heading: "Downtown Vape Shopping",
        body: [
          "For Fort York, CityPlace, King West, waterfront, Rogers Centre, and Entertainment District shoppers, this page gives Gas Gang and Drizzle a direct route back into the current vape menu.",
        ],
      },
    ],
    commercialLinks: [{ label: "Shop vapes", href: "/items/vapes" }],
    related: ["/resources/vape-guides", "/resources/menu-guide", "/resources/value-guides"],
  },
  {
    path: "/resources/vape-guides",
    kind: "category",
    parent: "/resources",
    categoryLabel: "Vape Guides",
    title: "Vape Guides",
    seoTitle: "Fort York Vape Guides | Gas Gang and Drizzle | FORT YORK CANNABIS",
    metaDescription:
      "Fort York vape guides for Gas Gang, Drizzle, vape disposables, vape pens, and current THC vape menu browsing.",
    h1: "Vape Guides: Put Brand Names Where Shoppers Look",
    excerpt:
      "Gas Gang and Drizzle make the vape section more searchable than a plain category label.",
    primaryKeyword: "vapes Fort York",
    supportingKeywords: ["THC vapes CityPlace", "Gas Gang vapes", "Drizzle vapes"],
    searchIntent: "Browse Fort York vape shopping guidance.",
    author: "menu",
    datePublished: updated,
    dateModified: updated,
    image: { src: "/banners/fort_york_vapes_banner.webp", alt: "Fort York vape guide" },
    intro: [
      "Fort York's vape guide should catch both category searches and brand searches. Gas Gang and Drizzle are current menu names, so they sit close to the main vape section.",
    ],
    sections: [
      {
        heading: "Vapes Are Not One Search",
        body: [
          "Some shoppers search for THC vapes. Some search the brand. A good resource page gives both a clean path without stuffing everything into the flower guide.",
        ],
      },
    ],
    commercialLinks: [{ label: "Shop vapes", href: "/items/vapes" }],
    related: ["/resources/brand-guides/gas-gang-drizzle-vapes", "/resources/menu-guide"],
  },
  {
    path: "/resources/nicotine-pouches",
    kind: "article",
    parent: "/resources/native-smokes",
    categoryLabel: "Nicotine Pouches",
    title: "Nicotine Pouches Guide",
    seoTitle: "Nicotine Pouches, Happy Dad, ZYN, Velo, Pablo, Killa | Fort York",
    metaDescription:
      "FORT YORK CANNABIS nicotine pouch guide for Happy Dad, ZYN, Velo, Pablo, and Killa from the current accessories menu.",
    h1: "Nicotine Pouches: Happy Dad, ZYN, Velo, Pablo, Killa",
    excerpt:
      "A current pouch guide for Happy Dad 6MGx20, ZYN, and nicotine pouches naming Velo, Pablo, and Killa.",
    primaryKeyword: "nicotine pouches Fort York",
    supportingKeywords: ["Happy Dad nicotine pouches", "ZYN Fort York", "Velo Pablo Killa Toronto"],
    searchIntent: "Find current nicotine pouch product names at Fort York.",
    author: "menu",
    datePublished: updated,
    dateModified: updated,
    image: { src: "/brand/category-accessories.webp", alt: "Fort York nicotine pouch guide" },
    intro: [
      "The current Fort York data includes Happy Dad 6MGx20 nicotine pouches, ZYN nicotine pouches, and a nicotine pouch listing with Velo, Pablo, and Killa at $20.",
    ],
    sections: [
      {
        heading: "Current Listed Pouch Names",
        body: ["Pouch shoppers search brand names. Fort York can speak directly to those searches while routing the click through accessories."],
        bullets: [
          "Happy Dad 6MGx20 nicotine pouches",
          "ZYN nicotine pouches",
          "Nicotine pouches, Velo, Pablo, Killa - $20",
        ],
      },
    ],
    commercialLinks: [{ label: "Shop accessories and pouches", href: "/items/accessories" }],
    related: ["/resources/native-smokes", "/resources/native-smokes/backwoods-grabba-guide"],
  },
  {
    path: "/resources/native-smokes",
    kind: "category",
    parent: "/resources",
    categoryLabel: "Smoke Shelf",
    title: "Smoke-Shelf Guides",
    seoTitle: "Fort York Smoke-Shelf Guides | Pouches, Backwoods, Grabba",
    metaDescription:
      "FORT YORK CANNABIS smoke-shelf guide for nicotine pouches, Backwoods, grabba, grabba shaker, cigarettes, and accessories.",
    h1: "Smoke-Shelf Guides: Pouches, Backwoods, Grabba",
    excerpt:
      "Pouches, Backwoods, grabba, and cigarette terms get a practical guide beside the cannabis menu.",
    primaryKeyword: "Backwoods and grabba Fort York",
    supportingKeywords: ["nicotine pouches Toronto", "grabba Toronto", "Backwoods Fort York"],
    searchIntent: "Browse smoke-shelf and accessories product guidance.",
    author: "menu",
    datePublished: updated,
    dateModified: updated,
    image: { src: "/brand/category-accessories.webp", alt: "Fort York smoke shelf guide" },
    intro: [
      "The accessories shelf carries more than rolling papers. Fort York's current data includes pouches, Backwoods, grabba, and grabba shaker, so those words need visible guide pages.",
    ],
    sections: [
      {
        heading: "Search the Smoke Shelf by Name",
        body: [
          "Backwoods, grabba, ZYN, Happy Dad, Velo, Pablo, and Killa are shopper terms. This section keeps them separate from flower, edibles, vapes, and pre-rolls.",
        ],
      },
    ],
    commercialLinks: [
      { label: "Nicotine pouches guide", href: "/resources/nicotine-pouches" },
      { label: "Backwoods and grabba guide", href: "/resources/native-smokes/backwoods-grabba-guide" },
      { label: "Shop accessories", href: "/items/accessories" },
    ],
    related: ["/resources/nicotine-pouches", "/resources/menu-guide"],
  },
  {
    path: "/resources/native-smokes/backwoods-grabba-guide",
    kind: "article",
    parent: "/resources/native-smokes",
    categoryLabel: "Backwoods and Grabba",
    title: "Backwoods and Grabba Guide",
    seoTitle: "Backwoods and Grabba Guide | FORT YORK CANNABIS",
    metaDescription:
      "Fort York guide for Backwoods assorted flavors, grabba, grabba RedRose / RedHerring, and grabba shaker from the current accessories menu.",
    h1: "Backwoods and Grabba at Fort York",
    excerpt:
      "Backwoods assorted flavors, grabba, RedRose / RedHerring, and grabba shaker get a clear product-name guide.",
    primaryKeyword: "Backwoods and grabba Fort York",
    supportingKeywords: ["Backwoods Toronto", "grabba Fort York", "grabba shaker Toronto"],
    searchIntent: "Find current Backwoods and grabba product names.",
    author: "menu",
    datePublished: updated,
    dateModified: updated,
    image: { src: "/brand/category-accessories.webp", alt: "Fort York Backwoods and grabba guide" },
    intro: [
      "Current product data lists Backwoods assorted flavors at $20, grabba at $5, grabba RedRose / RedHerring at $5, and grabba shaker RedRose / Red Herring at $19.",
    ],
    sections: [
      {
        heading: "Current Listed Smoke Add-Ons",
        body: ["Backwoods and grabba shoppers are usually product-name shoppers. This guide gives those names a direct page."],
        bullets: [
          "Backwoods assorted flavors - $20",
          "Grabba - $5",
          "Grabba RedRose / RedHerring - $5",
          "Grabba Shaker RedRose / Red Herring - $19",
        ],
      },
    ],
    commercialLinks: [{ label: "Shop accessories", href: "/items/accessories" }],
    related: ["/resources/native-smokes", "/resources/nicotine-pouches"],
  },
  {
    path: "/resources/flower-guides",
    kind: "category",
    parent: "/resources",
    categoryLabel: "Flower Guides",
    title: "Flower Guides",
    seoTitle: "Fort York Flower Guides | Exotic, Premium, AAA+, AA, Budget",
    metaDescription:
      "FORT YORK CANNABIS flower guides for Exotic, Premium, AAA+, AA, Budget, and downtown Toronto menu browsing.",
    h1: "Flower Guides: Keep the Tiers Clear",
    excerpt:
      "Flower stays strong, but it no longer has to carry every product keyword on the site.",
    primaryKeyword: "Fort York flower guide",
    supportingKeywords: ["Exotic flower Fort York", "Budget flower Toronto", "AAA+ flower CityPlace"],
    searchIntent: "Compare Fort York flower tiers.",
    author: "menu",
    datePublished: updated,
    dateModified: updated,
    image: { src: "/brand/category-flower.webp", alt: "Fort York flower guide" },
    intro: ["Use flower tiers for flower decisions, then let vapes, pouches, Backwoods, grabba, edibles, concentrates, and pre-rolls sit in their own sections."],
    sections: [
      {
        heading: "Tier Labels Help the First Sort",
        body: ["Exotic, Premium, AAA+, AA, and Budget make flower browsing easier when the shopper is actually comparing flower."],
      },
    ],
    commercialLinks: [{ label: "Shop flower", href: "/items/flower" }],
    related: ["/resources/value-guides", "/resources/menu-guide"],
  },
  {
    path: "/resources/edibles-guides",
    kind: "category",
    parent: "/resources",
    categoryLabel: "Edibles",
    title: "Edibles Guides",
    seoTitle: "Fort York Edibles Guides | CityPlace Cannabis",
    metaDescription:
      "FORT YORK CANNABIS edibles guides for gummies, chocolates, drinks, package details, and current menu browsing.",
    h1: "Edibles Guides for Downtown Menu Browsing",
    excerpt:
      "Edibles should talk in package and product-format language, not flower-tier language.",
    primaryKeyword: "edibles Fort York",
    supportingKeywords: ["CityPlace edibles", "Toronto cannabis gummies", "Fort York edible menu"],
    searchIntent: "Browse edible product guidance.",
    author: "menu",
    datePublished: updated,
    dateModified: updated,
    image: { src: "/brand/category-edibles.webp", alt: "Fort York edibles guide" },
    intro: ["Edible shoppers need a clean category section for package style, product name, and posted details."],
    sections: [{ heading: "Read the Edible Shelf Separately", body: ["Keep edibles separate from vapes, flower, concentrates, pouches, and cigarettes so the shopper can compare similar products."] }],
    commercialLinks: [{ label: "Shop edibles", href: "/items/edibles" }],
    related: ["/resources/menu-guide", "/resources/vape-guides"],
  },
  {
    path: "/resources/pre-roll-guides",
    kind: "category",
    parent: "/resources",
    categoryLabel: "Pre-Rolls",
    title: "Pre-Roll Guides",
    seoTitle: "Fort York Pre-Roll Guides | Downtown Toronto Cannabis",
    metaDescription:
      "FORT YORK CANNABIS pre-roll guides for quick downtown visits, pre-roll category browsing, and current menu links.",
    h1: "Pre-Roll Guides for Quick Downtown Stops",
    excerpt:
      "Pre-rolls are a quick-trip section, not a place to bury vape and pouch keywords.",
    primaryKeyword: "pre-rolls Fort York",
    supportingKeywords: ["CityPlace pre-rolls", "downtown Toronto pre-rolls", "Fort York cannabis pre-rolls"],
    searchIntent: "Browse pre-roll shopping guidance.",
    author: "menu",
    datePublished: updated,
    dateModified: updated,
    image: { src: "/brand/category-pre-rolls.webp", alt: "Fort York pre-roll guide" },
    intro: ["Pre-roll shoppers often want a fast current-category link before a local stop near Fort York, CityPlace, or King West."],
    sections: [{ heading: "Format First", body: ["Compare pre-rolls by product name, pack format, and current category details before mixing in flower, edibles, or vapes."] }],
    commercialLinks: [{ label: "Shop pre-rolls", href: "/items/pre-rolls" }],
    related: ["/resources/menu-guide", "/resources/flower-guides"],
  },
  {
    path: "/resources/value-guides",
    kind: "category",
    parent: "/resources",
    categoryLabel: "Value Guides",
    title: "Value Guides",
    seoTitle: "Fort York Value Guides | Flower, Vapes, Pouches, Backwoods",
    metaDescription:
      "FORT YORK CANNABIS value guides for flower tiers, Gas Gang, Drizzle, nicotine pouches, Backwoods, grabba, and current menu comparisons.",
    h1: "Value Guides: Compare Inside the Right Shelf",
    excerpt:
      "A $45 Gas Gang disposable, a $50 Drizzle Switch, a $20 pouch listing, and flower tier pricing all need different value math.",
    primaryKeyword: "cheap weed Fort York",
    supportingKeywords: ["Fort York value menu", "Gas Gang price Toronto", "nicotine pouches price Toronto"],
    searchIntent: "Compare value across current Fort York product sections.",
    author: "menu",
    datePublished: updated,
    dateModified: updated,
    image: { src: "/brand/visit-cta-banner.webp", alt: "Fort York value guide" },
    intro: ["Value copy works better when it keeps flower, vapes, pouches, Backwoods, grabba, edibles, and pre-rolls separate."],
    sections: [{ heading: "Product Names Carry Price Intent", body: ["Gas Gang at $45/$50, Drizzle at $50, and pouches at $20 are current product-price terms that can support value pages without pretending they are flower deals."] }],
    commercialLinks: [
      { label: "Shop flower", href: "/items/flower" },
      { label: "Shop vapes", href: "/items/vapes" },
      { label: "Shop accessories", href: "/items/accessories" },
    ],
    related: ["/resources/brand-guides/gas-gang-drizzle-vapes", "/resources/nicotine-pouches"],
  },
  {
    path: "/resources/local-guides",
    kind: "category",
    parent: "/resources",
    categoryLabel: "Local Guides",
    title: "Fort York and CityPlace Local Guides",
    seoTitle: "Fort York and CityPlace Cannabis Guides | FORT YORK CANNABIS",
    metaDescription:
      "Local cannabis guides for Fort York, CityPlace, waterfront, King West, Rogers Centre, and Entertainment District shoppers.",
    h1: "Fort York and CityPlace Local Guides",
    excerpt:
      "Local guides for shoppers who start with the area, then need the right menu section.",
    primaryKeyword: "weed dispensary Fort York",
    supportingKeywords: ["CityPlace cannabis store", "King West cannabis", "waterfront cannabis Toronto"],
    searchIntent: "Plan a Fort York or CityPlace store visit.",
    author: "local",
    datePublished: updated,
    dateModified: updated,
    image: { src: "/brand/local-area-waterfront.webp", alt: "Fort York local cannabis guide" },
    intro: [
      "Fort York, CityPlace, the waterfront, King West, Rogers Centre, and the Entertainment District all bring shoppers who may be looking for flower, vapes, pouches, Backwoods, grabba, edibles, or pre-rolls.",
    ],
    sections: [
      {
        heading: "Local Intent Needs a Next Shelf",
        body: ["Use the local store page for the visit anchor, then send shoppers into the right shelf from the resource centre."],
      },
    ],
    commercialLinks: [
      { label: "Fort York CityPlace visit guide", href: "/resources/local-guides/fort-york-cityplace-visit-guide" },
      { label: "Store page", href: SITE.storePage },
    ],
    related: ["/resources/menu-guide", "/resources/value-guides"],
  },
  {
    path: "/resources/local-guides/fort-york-cityplace-visit-guide",
    kind: "article",
    parent: "/resources/local-guides",
    categoryLabel: "Visit Guide",
    title: "Fort York and CityPlace Visit Guide",
    seoTitle: "Fort York and CityPlace Visit Guide | FORT YORK CANNABIS",
    metaDescription:
      "Visit guide for FORT YORK CANNABIS at 38 Fort York Blvd with local menu links for flower, vapes, edibles, pouches, Backwoods, grabba, pre-rolls, and accessories.",
    h1: "Fort York and CityPlace Visit Guide",
    excerpt:
      "Start with the downtown location, then pick the product section that fits the trip.",
    primaryKeyword: "weed dispensary near CityPlace",
    supportingKeywords: ["Fort York Blvd cannabis", "CityPlace weed store", "downtown Toronto cannabis store"],
    searchIntent: "Plan a local visit to FORT YORK CANNABIS.",
    author: "local",
    datePublished: updated,
    dateModified: updated,
    image: { src: "/brand/local-area-waterfront.webp", alt: "Fort York CityPlace visit guide" },
    intro: [
      "FORT YORK CANNABIS is listed at 38 Fort York Blvd. Use this guide when the trip starts near Fort York, CityPlace, the waterfront, King West, Rogers Centre, or the Entertainment District.",
    ],
    sections: [
      {
        heading: "Best First Click",
        body: [
          "Use the store page for location context. Use the resource hub when the trip is about Gas Gang, Drizzle, pouches, Backwoods, grabba, edibles, pre-rolls, concentrates, accessories, or flower.",
        ],
      },
    ],
    commercialLinks: [
      { label: "Store page", href: SITE.storePage },
      { label: "Menu guide", href: "/resources/menu-guide" },
    ],
    related: ["/resources/local-guides", "/resources/menu-guide"],
  },
];

export const RESOURCE_HOME = RESOURCE_PAGES[0];

export function normalizeResourcePath(path: string) {
  const clean = path.trim().replace(/^\/+|\/+$/g, "");
  return clean ? `/resources/${clean.replace(/^resources\/?/, "")}` : "/resources";
}

export function slugFromPath(path: string) {
  return path.replace(/^\/resources\/?/, "");
}

export function getResourcePageBySlug(slug?: string[] | string) {
  const slugPath = Array.isArray(slug) ? slug.join("/") : slug || "";
  const path = normalizeResourcePath(slugPath);
  return RESOURCE_PAGES.find((page) => page.path === path);
}

export function getStaticResourceParams() {
  return RESOURCE_PAGES.filter((page) => page.path !== "/resources").map((page) => ({
    slug: slugFromPath(page.path).split("/"),
  }));
}

export function getCategoryPages() {
  return RESOURCE_PAGES.filter((page) => page.parent === "/resources");
}

export function getChildPages(parentPath: string) {
  return RESOURCE_PAGES.filter((page) => page.parent === parentPath);
}

export function getFeaturedPages() {
  const featured = [
    "/resources/brand-guides/gas-gang-drizzle-vapes",
    "/resources/nicotine-pouches",
    "/resources/native-smokes/backwoods-grabba-guide",
    "/resources/menu-guide",
    "/resources/local-guides/fort-york-cityplace-visit-guide",
    "/resources/value-guides",
  ];
  return featured.map((path) => RESOURCE_PAGES.find((page) => page.path === path)).filter(Boolean) as ResourcePage[];
}

export function getRelatedPages(page: ResourcePage) {
  return page.related.map((path) => RESOURCE_PAGES.find((item) => item.path === path)).filter(Boolean) as ResourcePage[];
}
