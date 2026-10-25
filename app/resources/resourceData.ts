import { SHOW_CIGARETTES, cigaretteSafeContent, isCigarettePath } from "../lib/siteConfig";
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

const RESOURCE_PAGES_RAW: ResourcePage[] = [
  {
    path: "/resources",
    kind: "root",
    categoryLabel: "Resource Centre",
    title: "FORT YORK CANNABIS Resource Centre",
    seoTitle: "Cannabis Guides | Fort York Cannabis Resource Hub",
    metaDescription:
      "Fort York Cannabis guides for adults 19+: how flower is graded, choosing a vape format, reading edible labels and planning a first visit. Open 24 hours.",
    h1: "Fort York Cannabis Guides: Read This, Shop Smarter",
    excerpt:
      "Short, honest guides that make your next visit quicker. No prices, no effect claims, and no availability promises.",
    primaryKeyword: "Fort York Cannabis guides",
    supportingKeywords: [
      "how flower is graded",
      "choosing a cannabis vape",
      "edibles mg labels",
      "Fort York first visit",
    ],
    searchIntent: "Read Fort York Cannabis shopping guides before a visit.",
    author: "team",
    datePublished: updated,
    dateModified: "2026-10-26",
    image: hero,
    intro: [
      "Our counter staff answer the same five questions all day. So we wrote the answers down. Here is the Fort York Cannabis study hall: short, honest guides that make your next visit quicker.",
    ],
    sections: [
      {
        heading: "The guides",
        body: [
          "Start with how flower gets graded, then how to choose a vape format, then how to read an edible label.",
        ],
        links: [
          { label: "How flower gets graded", href: "/resources/flower-guides", description: "Five tiers and a 30-second jar test." },
          { label: "Choosing a vape format", href: "/resources/vape-guides", description: "Disposable, 510 cart, or pod." },
          { label: "Edibles, by the numbers", href: "/resources/edibles-guides", description: "mg per piece versus per pack." },
        ],
      },
      {
        heading: "Our rules for writing these",
        body: [
          "No prices. No effect claims. No availability promises. Real strain names show up as examples, not promises. The menu is always the source for what's listed today.",
        ],
      },
      {
        heading: "Then come say hi",
        body: [
          "Top shelf lives in Exotic. Map and directions are on the visit page. Adults 19+. ID checked for anyone who looks under 25. Open 24 hours.",
        ],
      },
    ],
    commercialLinks: [
      { label: "Name Guides", href: "/guides", description: "Browse every live Fort York name guide by shelf." },
      { label: "Open the menu", href: "/menu" },
      { label: "See Exotic", href: "/exotic" },
      { label: "Visit", href: "/visit" },
    ],
    related: [
      "/resources/flower-guides",
      "/resources/vape-guides",
      "/resources/edibles-guides",
    ],
  },
  {
    path: "/resources/menu-guide",
    kind: "article",
    parent: "/resources",
    categoryLabel: "Menu Guide",
    title: "Fort York Menu Guide",
    seoTitle: "Fort York Cannabis Menu Guide | Flower, Vapes, Edibles",
    metaDescription:
      "How to read the Fort York Cannabis menu: start with the shelf, then check what is listed today. Adults 19+. Open 24 hours.",
    h1: "Fort York Menu Guide: Start With the Shelf",
    excerpt:
      "Use the menu by category first. Flower, vapes, pre-rolls, edibles and accessories each have their own page.",
    primaryKeyword: "Fort York cannabis menu guide",
    supportingKeywords: ["Fort York menu", "flower menu", "edibles menu", "pre-roll menu"],
    searchIntent: "Navigate the current Fort York menu by shelf.",
    author: "menu",
    datePublished: updated,
    dateModified: "2026-10-26",
    image: { src: "/brand/category-vapes.webp", alt: "Fort York menu guide" },
    intro: [
      "Fort York's menu is easier when the shelf comes first. Open today's menu for what is listed, then compare inside one category.",
    ],
    sections: [
      {
        heading: "How to use it",
        body: [
          "Pick a shelf, then read the cards posted today. A listing is what is on the menu right now, not a promise that the same jar will be there tomorrow.",
        ],
      },
      {
        heading: "Keep shelves separate",
        body: [
          "Flower, vapes, pre-rolls, edibles and accessories are different comparisons. Stay inside one shelf before you jump.",
        ],
      },
    ],
    commercialLinks: [
      { label: "Open the menu", href: "/menu" },
      { label: "Shop flower", href: "/items/flower" },
      { label: "Shop pre-rolls", href: "/items/pre-rolls" },
      { label: "Shop edibles", href: "/items/edibles" },
      { label: "See Exotic", href: "/exotic" },
    ],
    related: ["/resources/flower-guides", "/resources/vape-guides", "/resources/edibles-guides"],
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
    commercialLinks: [{ label: "Shop Vape Disposables", href: "/items/vape-disposables" }],
    related: ["/resources/vape-guides", "/resources/menu-guide", "/resources/value-guides"],
  },
  {
    path: "/resources/vape-guides",
    kind: "category",
    parent: "/resources",
    categoryLabel: "Vape Guides",
    title: "Vape Guides",
    seoTitle: "Disposable, Cart or Pod? Choosing a Cannabis Vape | Fort York Cannabis",
    metaDescription:
      "Choosing a cannabis vape at Fort York Cannabis: disposables, 510 carts and pods, plus label basics and battery care. Adults 19+. Open 24 hours.",
    h1: "Choosing a Cannabis Vape: Answer Three Questions, Done",
    excerpt:
      "Disposable, 510 cartridge, or pod. Three questions sort the shelf. No effect claims.",
    primaryKeyword: "choosing a cannabis vape",
    supportingKeywords: ["510 cartridge", "disposable vape", "pod vape"],
    searchIntent: "Choose a cannabis vape format before visiting.",
    author: "menu",
    datePublished: updated,
    dateModified: "2026-10-26",
    image: { src: "/banners/fort_york_vapes_banner.webp", alt: "Fort York vape guide" },
    intro: [
      "Choosing a cannabis vape comes down to three questions. Answer them and the shelf sorts itself.",
    ],
    sections: [
      {
        heading: "Do you want to own hardware?",
        body: ["No means a disposable: everything is built in. Yes means keep going to a cartridge or a pod."],
      },
      {
        heading: "Universal or system-specific?",
        body: ["A 510 cartridge fits a 510 battery. A pod only fits its own device."],
      },
      {
        heading: "What's in the oil?",
        body: [
          "Distillate is refined, and flavour often comes from added terpenes. Live resin is made from fresh-frozen plants to hold onto more aroma. Rosin is pressed with heat and pressure, no solvents.",
        ],
      },
      {
        heading: "Reading the box",
        body: ["THC symbol, then total THC, net weight, oil type, and hardware type. Use the device's own cable, charge it where you can see it, and keep it away from heat."],
      },
      {
        heading: "What we won't do",
        body: ["Recommend a vape for a feeling. Labels give numbers; effects vary, and we don't make claims."],
      },
    ],
    commercialLinks: [
      { label: "Open the menu", href: "/menu" },
      { label: "How flower is graded", href: "/resources/flower-guides" },
      { label: "Visit", href: "/visit" },
    ],
    related: ["/resources/flower-guides", "/resources/menu-guide", "/resources/edibles-guides"],
  },
  {
    path: "/resources/nicotine-pouches",
    kind: "article",
    parent: "/resources/native-smokes",
    categoryLabel: "Nicotine Pouches",
    title: "Reading a Nicotine Pouch Tin",
    seoTitle: "Nicotine Pouches: Reading the Tin | Fort York Cannabis",
    metaDescription:
      "How to read a nicotine pouch tin (mg per pouch, count, flavour) and the 19+ rule at Fort York Cannabis, Toronto. In store only.",
    h1: "Reading a Nicotine Pouch Tin",
    excerpt: "Three numbers on the tin: mg per pouch, pouch count, and flavour. Adults 19+. In store only.",
    primaryKeyword: "nicotine pouches Fort York",
    supportingKeywords: ["pouch tin", "mg per pouch", "Fort York"],
    searchIntent: "Learn how to read a nicotine pouch tin before buying in store.",
    author: "menu",
    datePublished: updated,
    dateModified: "2026-10-26",
    image: { src: "/brand/category-accessories.webp", alt: "Fort York nicotine pouch guide" },
    intro: [
      "Pouches are the smokeless option on the counter. Before you grab a tin, three numbers matter.",
    ],
    sections: [
      {
        heading: "What the tin says",
        body: ["Velo, Pablo and Killa are names people ask for, but the lineup rotates. Prices are at the counter, not on this page."],
        bullets: [
          "mg per pouch: the nicotine strength.",
          "Pouch count: how many are inside.",
          "Flavour: printed on the lid.",
        ],
      },
      {
        heading: "Who and where",
        body: [
          "Adults 19+ only. ID for anyone who looks under 25. In store only at 38 Fort York Blvd, not on the delivery menu.",
        ],
      },
    ],
    commercialLinks: [
      { label: "Open the menu", href: "/menu" },
      { label: "See Exotic", href: "/exotic" },
      { label: "Visit", href: "/visit" },
    ],
    related: ["/resources/native-smokes", "/resources/native-smokes/backwoods-grabba-guide"],
  },
  {
    path: "/resources/native-smokes",
    kind: "category",
    parent: "/resources",
    categoryLabel: "Tobacco",
    title: "Tobacco at Fort York Cannabis",
    seoTitle: "Tobacco at Fort York Cannabis: What We Carry & the Rules",
    metaDescription:
      "Tobacco products at Fort York Cannabis, 38 Fort York Blvd: cigarettes, cigarillos, grabba and pouches. Adults 19+, in store only.",
    h1: "Tobacco at Fort York Cannabis: The Short Version",
    excerpt: "Cigarettes, cigarillos, grabba and pouches for adults 19+. In store only. Prices are not posted in guides.",
    primaryKeyword: "tobacco Fort York Cannabis",
    supportingKeywords: ["native cigarettes", "grabba", "nicotine pouches"],
    searchIntent: "Learn what tobacco the Fort York counter carries and the 19+ rule.",
    author: "menu",
    datePublished: updated,
    dateModified: "2026-10-26",
    image: { src: "/brand/category-accessories.webp", alt: "Fort York tobacco guide" },
    intro: [
      "Yes, there's a tobacco side to the counter. Here's what it covers and how it works.",
    ],
    sections: [
      {
        heading: "The rules",
        body: ["Prices or deals are not posted in guides. Ask staff."],
        bullets: [
          "What: native cigarettes, Backwoods and other cigarillos, grabba leaf and shakers, and nicotine pouches.",
          "Who: adults 19+, with ID checked for anyone who looks under 25.",
          "How: in store only. Tobacco isn't on the delivery menu.",
        ],
      },
    ],
    commercialLinks: [
      { label: "Backwoods vs. grabba", href: "/resources/native-smokes/backwoods-grabba-guide" },
      { label: "Reading a pouch tin", href: "/resources/nicotine-pouches" },
      { label: "Open the menu", href: "/menu" },
      { label: "See Exotic", href: "/exotic" },
      { label: "Visit", href: "/visit" },
    ],
    related: ["/resources/nicotine-pouches", "/resources/native-smokes/backwoods-grabba-guide"],
  },
  {
    path: "/resources/native-smokes/backwoods-grabba-guide",
    kind: "article",
    parent: "/resources/native-smokes",
    categoryLabel: "Backwoods and Grabba",
    title: "Wrap or Leaf? Backwoods and Grabba",
    seoTitle: "Wrap or Leaf? Backwoods and Grabba at Fort York Cannabis",
    metaDescription:
      "Wrap or leaf? The difference between Backwoods cigarillos and grabba leaf or shakers, from Fort York Cannabis. 19+, no prices posted.",
    h1: "Wrap or Leaf? Backwoods and Grabba",
    excerpt: "Backwoods is a rolled cigarillo. Grabba is loose leaf or a shaker. Adults 19+. No prices posted.",
    primaryKeyword: "Backwoods and grabba Fort York",
    supportingKeywords: ["cigarillo wrap", "grabba leaf", "grabba shaker"],
    searchIntent: "Tell Backwoods wraps from grabba leaf before buying in store.",
    author: "menu",
    datePublished: updated,
    dateModified: "2026-10-26",
    image: { src: "/brand/category-accessories.webp", alt: "Fort York Backwoods and grabba guide" },
    intro: [
      "If it's rolled already, it's a Backwoods. If it's loose leaf, it's grabba.",
    ],
    sections: [
      {
        heading: "Backwoods",
        body: ["A Backwoods is a natural-leaf cigarillo that many people unroll and use as a wrap. Flavours vary and are printed on the pack."],
      },
      {
        heading: "Grabba",
        body: ["Grabba is whole cured tobacco leaf. Buy it as a whole leaf, or as a shaker if you want it pre-crumbled. Both are tobacco: 19+ only, ID for anyone who looks under 25, and in-store only. Prices and deals are not listed here."],
      },
    ],
    commercialLinks: [
      { label: "Open the menu", href: "/menu" },
      { label: "See Exotic", href: "/exotic" },
      { label: "Visit", href: "/visit" },
    ],
    related: ["/resources/native-smokes", "/resources/nicotine-pouches"],
  },
  {
    path: "/resources/flower-guides",
    kind: "category",
    parent: "/resources",
    categoryLabel: "Flower Guides",
    title: "Flower Guides",
    seoTitle: "How Cannabis Flower Is Graded | Fort York Cannabis Tier Guide",
    metaDescription:
      "How cannabis flower is graded at Fort York Cannabis: the five tiers, the four things graders check, and a 30-second jar test you can do yourself. Open 24 hours.",
    h1: "How Cannabis Flower Is Graded (and How to Grade It Yourself)",
    excerpt:
      "Four checks decide a tier: structure, frost, nose and cure. Then you can run the same jar test at the counter.",
    primaryKeyword: "how cannabis flower is graded",
    supportingKeywords: ["Exotic flower", "AA flower", "Fort York tiers"],
    searchIntent: "Learn how Fort York grades flower before buying.",
    author: "menu",
    datePublished: updated,
    dateModified: "2026-10-26",
    image: { src: "/brand/category-flower.webp", alt: "Fort York flower guide" },
    intro: ["Ever wonder who decides a jar is Exotic? At Fort York Cannabis, it comes down to four checks anyone can learn."],
    sections: [
      {
        heading: "The four checks",
        body: [
          "Structure: dense, well-formed buds with a tidy trim. Loose, airy, leafy buds slide down the ladder.",
          "Frost: those sparkly crystals are trichomes. A heavy, even coat is a top-tier signal.",
          "Nose: a clear aroma (fuel, citrus, berry, pine, cookie dough) beats a muted, grassy smell.",
          "Cure: properly dried flower is springy. Crunchy means over-dried; spongy means under-dried.",
        ],
      },
      {
        heading: "Where each jar lands",
        body: ["Exotic, Premium and AAA+ come in a 6g pack. The in-store free-gram offer covers those three tiers only. AA is everyday flower and the only true 5g. Budget is smaller buds and more shake, useful for rolling."],
        bullets: [
          "Exotic: showpiece structure, heavy frost, loud nose.",
          "Premium: near-showpiece, consistent, aromatic.",
          "AAA+: solid all-rounder.",
          "AA: everyday flower, simpler aroma, the only true 5g.",
          "Budget: smaller buds, more shake, great for rolling.",
        ],
      },
      {
        heading: "The 30-second jar test",
        body: ["Look under the light for frost and trim. Smell the jar and ask whether the aroma is specific. Ask for the packaging date. Compare two tiers side by side."],
      },
      {
        heading: "Common myths",
        body: ["Higher THC does not, on its own, make a higher tier. Aroma, cure and structure count just as much. A strain name is genetics; the tier is this batch."],
      },
    ],
    commercialLinks: [
      { label: "See Exotic", href: "/exotic" },
      { label: "See AA", href: "/aa" },
      { label: "Open the menu", href: "/menu" },
    ],
    related: ["/resources/vape-guides", "/resources/edibles-guides", "/resources/menu-guide"],
  },
  {
    path: "/resources/edibles-guides",
    kind: "category",
    parent: "/resources",
    categoryLabel: "Edibles",
    title: "Edibles Guides",
    seoTitle: "Edibles by the Numbers: Reading mg Labels | Fort York Cannabis",
    metaDescription:
      "Edibles by the numbers: how to read mg THC per piece and per package, why onset is slow, and safe storage. A Fort York Cannabis guide for adults 19+. Open 24 hours.",
    h1: "Edibles by the Numbers",
    excerpt:
      "Read mg per piece and mg per package, then wait. Most edible horror stories start with having more too soon.",
    primaryKeyword: "edibles mg labels",
    supportingKeywords: ["mg THC per piece", "edible onset", "edible storage"],
    searchIntent: "Read an edible label before buying.",
    author: "menu",
    datePublished: updated,
    dateModified: "2026-10-26",
    image: { src: "/brand/category-edibles.webp", alt: "Fort York edibles guide" },
    intro: ["Edibles are the one category where math genuinely matters. Here is the label, line by line, plus the timing rule."],
    sections: [
      {
        heading: "The label",
        body: [
          "The THC symbol marks a legal product containing THC. Mg THC per unit is the number that matters for a single piece. Mg THC per package is the total in the whole pack. CBD is listed the same way, per unit and per package.",
        ],
      },
      {
        heading: "The timing rule",
        body: ["Edibles are digested, so onset is slower than smoking or vaping and can take a long time. Start low, go slow, wait. Never mix with alcohol, and never drive."],
      },
      {
        heading: "Storage",
        body: ["Keep the original child-resistant packaging. Store it locked or out of reach, away from kids, pets and regular snacks. Accidental ingestion by a child or pet? Call Poison Control or your vet right away."],
      },
    ],
    commercialLinks: [
      { label: "Open the menu", href: "/menu" },
      { label: "See Exotic", href: "/exotic" },
      { label: "Visit", href: "/visit" },
    ],
    related: ["/resources/menu-guide", "/resources/flower-guides", "/resources/vape-guides"],
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
    seoTitle: "Fort York Value Guides | Compare the Right Shelf",
    metaDescription:
      "Compare Fort York Cannabis value inside one shelf: flower tiers, vape formats, edibles and pre-rolls. This page does not list prices. Adults 19+. Open 24 hours.",
    h1: "Value Guides: Compare Inside the Right Shelf",
    excerpt:
      "Value only makes sense inside one shelf. Flower, vapes, edibles and pre-rolls are not the same comparison.",
    primaryKeyword: "Fort York value menu",
    supportingKeywords: ["flower tiers", "edible value", "vape formats"],
    searchIntent: "Compare value inside one Fort York shelf.",
    author: "menu",
    datePublished: updated,
    dateModified: "2026-10-26",
    image: { src: "/brand/visit-cta-banner.webp", alt: "Fort York value guide" },
    intro: ["Value copy works better when flower, vapes, edibles and pre-rolls stay separate. This page does not list prices."],
    sections: [{ heading: "Where to look", body: ["Open the menu for what is listed today, then compare two cards in the same category. Staff can walk through a label at the counter. This page does not quote a price."] }],
    commercialLinks: [
      { label: "Open the menu", href: "/menu" },
      { label: "Shop flower", href: "/items/flower" },
      { label: "See Exotic", href: "/exotic" },
      { label: "Shop edibles", href: "/items/edibles" },
    ],
    related: ["/resources/flower-guides", "/resources/menu-guide", "/resources/edibles-guides"],
  },
  {
    path: "/resources/local-guides",
    kind: "category",
    parent: "/resources",
    categoryLabel: "Local Guides",
    title: "Fort York and CityPlace Local Guides",
    seoTitle: "Visiting Fort York Cannabis at 38 Fort York Blvd | Local Guide",
    metaDescription:
      "A local guide to visiting Fort York Cannabis at 38 Fort York Blvd, Toronto: finding the door, what to bring, the flower tiers and first-visit tips. 19+. Open 24 hours.",
    h1: "Visiting Fort York Cannabis: The Local Guide",
    excerpt:
      "Put 38 Fort York Blvd in your maps app, check the hours page, and bring photo ID.",
    primaryKeyword: "weed dispensary Fort York",
    supportingKeywords: ["38 Fort York Blvd", "Fort York visit", "first visit ID"],
    searchIntent: "Plan a visit to Fort York Cannabis.",
    author: "local",
    datePublished: updated,
    dateModified: "2026-10-26",
    image: { src: "/brand/local-area-waterfront.webp", alt: "Fort York local cannabis guide" },
    intro: [
      "Downtown errands are a sport. Here is how to make a stop at Fort York Cannabis, 38 Fort York Blvd, Toronto (M5V 3Z3) quick and painless.",
    ],
    sections: [
      {
        heading: "Finding the door",
        body: ["Put 38 Fort York Blvd in your maps app and follow the pin. The visit page has the live map. Hours are on the hours page. The store is open 24 hours."],
      },
      {
        heading: "What's inside",
        body: ["Five flower tiers (Exotic, Premium, AAA+, AA, Budget), vapes, pre-rolls, edibles and accessories. Exotic, Premium and AAA+ come in a 6g pack, and the in-store free-gram offer covers those three only. AA is the only true 5g."],
      },
    ],
    commercialLinks: [
      { label: "CityPlace visit guide", href: "/resources/local-guides/fort-york-cityplace-visit-guide" },
      { label: "Visit", href: "/visit" },
      { label: "Hours", href: "/hours" },
      { label: "Menu", href: "/menu" },
      { label: "Exotic", href: "/exotic" },
    ],
    related: ["/resources/local-guides/fort-york-cityplace-visit-guide", "/resources/menu-guide"],
  },
  {
    path: "/resources/local-guides/fort-york-cityplace-visit-guide",
    kind: "article",
    parent: "/resources/local-guides",
    categoryLabel: "Visit Guide",
    title: "Fort York and CityPlace Visit Guide",
    seoTitle: "Visiting Fort York Cannabis at 38 Fort York Blvd | Local Guide",
    metaDescription:
      "A local guide to visiting Fort York Cannabis at 38 Fort York Blvd, Toronto: finding the door, what to bring, the flower tiers and first-visit tips. 19+. Open 24 hours.",
    h1: "Visiting Fort York Cannabis: The Local Guide",
    excerpt:
      "Put 38 Fort York Blvd in your maps app. Hours are on the hours page. Bring photo ID. Phone 437-783-2511.",
    primaryKeyword: "38 Fort York Blvd",
    supportingKeywords: ["Fort York Cannabis visit", "photo ID 19+", "flower tiers"],
    searchIntent: "Plan a local visit to Fort York Cannabis.",
    author: "local",
    datePublished: updated,
    dateModified: "2026-10-26",
    image: { src: "/brand/local-area-waterfront.webp", alt: "Fort York CityPlace visit guide" },
    intro: [
      "Downtown errands are a sport. Here is how to make a stop at Fort York Cannabis, 38 Fort York Blvd, Toronto (M5V 3Z3) quick and painless.",
    ],
    sections: [
      {
        heading: "Finding the door",
        body: ["Put 38 Fort York Blvd in your maps app and follow the pin. The visit page has the live map. Hours are on the hours page, so check them before you go. The store is open 24 hours."],
      },
      {
        heading: "Pack this",
        body: ["Buyers must be 19+. Staff ask for ID from anyone who looks under 25. Peek at the menu so you know what is listed today."],
      },
      {
        heading: "What's inside",
        body: ["Five flower tiers (Exotic, Premium, AAA+, AA, Budget), vapes, pre-rolls, edibles and accessories. Exotic, Premium and AAA+ come in a 6g pack, and the in-store free-gram offer covers those three only. AA is the only true 5g."],
      },
      {
        heading: "Neighbour etiquette",
        body: ["Keep products sealed until you are home, and store them away from kids and pets once you are there."],
      },
      {
        heading: "Can I call ahead?",
        body: ["Yes, 437-783-2511. We don't hold products."],
      },
    ],
    commercialLinks: [
      { label: "Visit", href: "/visit" },
      { label: "Hours", href: "/hours" },
      { label: "Menu", href: "/menu" },
      { label: "Exotic", href: "/exotic" },
    ],
    related: ["/resources/local-guides", "/resources/menu-guide", "/resources/flower-guides"],
  },
];

export const RESOURCE_PAGES = SHOW_CIGARETTES
  ? RESOURCE_PAGES_RAW
  : RESOURCE_PAGES_RAW
      .filter((page) => !isCigarettePath((page as { slug?: string; path?: string }).slug ?? (page as { path?: string }).path))
      .map((page) => cigaretteSafeContent(page));

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
    "/resources/flower-guides",
    "/resources/vape-guides",
    "/resources/edibles-guides",
    "/resources/menu-guide",
    "/resources/local-guides/fort-york-cityplace-visit-guide",
    "/resources/value-guides",
  ];
  return featured.map((path) => RESOURCE_PAGES.find((page) => page.path === path)).filter(Boolean) as ResourcePage[];
}

export function getRelatedPages(page: ResourcePage) {
  return page.related.map((path) => RESOURCE_PAGES.find((item) => item.path === path)).filter(Boolean) as ResourcePage[];
}
