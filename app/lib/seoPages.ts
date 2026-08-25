import itemsJson from "./items.json";

export type SeoPage = {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  heroTagline: string;
  banner?: string;
  localFeature?: {
    eyebrow: string;
    heading: string;
    body: string;
  };
  heroPreview?: {
    eyebrow: string;
    intro: string;
    products: { name: string; image: string }[];
    disclosure: string;
    primaryAction: { label: string; href: string };
    secondaryAction: { label: string; href: string };
  };
  sections: { heading: string; body: string }[];
  faqs: { q: string; a: string }[];
};

const NATIVE_CIGARETTE_PREVIEW = [
  { name: "Canadian Classics Original", image: "/products/1014-CANADIAN-CLASSSICS-ORIGINAL.webp" },
  { name: "Canadian Classics Silver", image: "/products/1015-CANADIAN-CLASSICS-SILVER.webp" },
  { name: "Canadian Full", image: "/products/1006-CANADIAN-FULL.webp" },
  { name: "Canadian Lights", image: "/products/1005-CANADIAN-LIGHTS.webp" },
  { name: "Canadian Goose Full", image: "/products/1011-CANADIAN-GOOSE.webp" },
  { name: "Canadian Menthol", image: "/products/1013-CANADIAN-MENTHOL.webp" },
] as const;

const NICOTINE_VAPE_PREVIEW = (itemsJson as Array<{ name: string; image: string; category: string }>)
  .filter((item) => item.category.toUpperCase() === "VAPE PENS" && Boolean(item.image))
  .slice(0, 5)
  .map((item) => ({ name: item.name, image: item.image }));

export const SEO_PAGES: SeoPage[] = [
  {
    slug: "fort-york-cannabis-store",
    title: "Fort York Cannabis Store | FORT YORK CANNABIS",
    metaDescription: "FORT YORK CANNABIS is a cannabis store at 38 Fort York Blvd in Toronto near Fort York, CityPlace, and the waterfront. Phone is 437-783-2511 and the store is open 24 hours.",
    h1: "Fort York Cannabis Store",
    heroTagline: "Local cannabis store information for Fort York and CityPlace",
    banner: "/brand/local-area-waterfront.webp",
    sections: [
      {
        heading: "Cannabis Store Near Fort York",
        body: "FORT YORK CANNABIS is at 38 Fort York Blvd in Toronto, close to Fort York, CityPlace, the waterfront, and downtown Toronto residential traffic.",
      },
      {
        heading: "Store Details For Visit Planning",
        body: "Use this page to confirm the store name, address, Google Maps route, phone number, hours, and Toronto local store page before visiting. Phone is 437-783-2511 and the store is open 24 hours.",
      },
    ],
    faqs: [
      { q: "Where is FORT YORK CANNABIS?", a: "38 Fort York Blvd, Toronto, ON M5V 3Z3, Canada." },
      { q: "Are the hours available?", a: "Open 24 hours, seven days a week." },
    ],
  },
  {
    slug: "cityplace-cannabis-dispensary",
    title: "CityPlace Cannabis Dispensary | FORT YORK CANNABIS",
    metaDescription: "FORT YORK CANNABIS is a cannabis store near CityPlace and Fort York in downtown Toronto. The store is open 24 hours and the menu is available for browsing.",
    h1: "CityPlace Cannabis Dispensary",
    heroTagline: "A downtown Toronto cannabis store page for CityPlace residents",
    banner: "/brand/hero-home-desktop.webp",
    sections: [
      {
        heading: "Serving CityPlace And Downtown Toronto",
        body: "FORT YORK CANNABIS is positioned for CityPlace, Fort York, waterfront Toronto, King West, and Entertainment District customers who need clear address, hours, menu, contact, and directions context.",
      },
      {
        heading: "Menu And Store Details",
        body: "Browse the Fort York menu categories on the site, then use the contact page or staff help for store-specific questions before visiting.",
      },
    ],
    faqs: [
      { q: "Is this near CityPlace?", a: "Yes. The address at 38 Fort York Blvd is positioned for Fort York and CityPlace local search." },
      { q: "How can shoppers plan a visit?", a: "Use the store page for address, hours, menu browsing, contact information, and directions before heading out." },
    ],
  },
  {
    slug: "downtown-toronto-weed-dispensary",
    title: "Downtown Toronto Weed Dispensary | FORT YORK CANNABIS",
    metaDescription: "FORT YORK CANNABIS is a downtown Toronto cannabis store at 38 Fort York Blvd. Phone is 437-783-2511, the store is open 24 hours, and the menu is available for browsing.",
    h1: "Downtown Toronto Weed Dispensary",
    heroTagline: "Fort York, CityPlace, waterfront, and King West cannabis store information",
    banner: "/brand/faq-info-banner.webp",
    sections: [
      {
        heading: "Downtown Toronto Cannabis Store",
        body: "This page supports downtown Toronto weed store, weed dispensary in Toronto, cannabis store near Fort York, and cannabis dispensary near CityPlace themes using confirmed address, hours, phone, menu, and local-area context.",
      },
      {
        heading: "Plan With Current Store Details",
        body: "Adults 19+ can use this page to confirm the Fort York Boulevard location, browse menu categories, check hours, and choose the next step before visiting.",
      },
    ],
    faqs: [
      { q: "What hours are listed?", a: "FORT YORK CANNABIS is open 24 hours, seven days a week." },
      { q: "How can shoppers browse the menu?", a: "Use the menu category links for flower, pre-rolls, Nicotine Vapes, Vape Disposables, edibles, concentrates, Cigarettes, and accessories." },
    ],
  },
  {
    slug: "fort-york-cannabis-local-visit-guide-2026",
    title: "FORT YORK CANNABIS Local Visit Guide | Toronto Adult 19+",
    metaDescription: "Plan a visit to FORT YORK CANNABIS at 38 Fort York Blvd with adult 19+ store-page checks, menu-category guides, and Fort York CityPlace directions context.",
    h1: "FORT YORK CANNABIS Local Visit Guide for Adults 19+",
    heroTagline: "A practical Fort York and CityPlace visit guide for adults 19+",
    banner: "/brand/visit-cta-banner.webp",
    sections: [
      {
        heading: "Confirm The Right Storefront",
        body: "FORT YORK CANNABIS is tied to 38 Fort York Blvd, Fort York, CityPlace, the waterfront, King West, Rogers Centre, and the Entertainment District. Use this page to confirm you are on the right store path before visiting.",
      },
      {
        heading: "Use The Menu Before Visiting",
        body: "Start with flower, pre-rolls, Nicotine Vapes, Vape Disposables, edibles, concentrates, Cigarettes, or accessories. Product names, sizes, and listed prices help adults 19+ narrow their choices before contacting staff with item-specific questions.",
      },
      {
        heading: "What To Check Before You Go",
        body: "Confirm the address, map route, store hours, phone number, menu categories, and valid adult 19+ identification before heading to the store.",
      },
      {
        heading: "Why The Local Context Matters",
        body: "Fort York searches often come from people moving around CityPlace, condo towers, stadium traffic, waterfront routes, and downtown Toronto errands. Clear local context helps shoppers recognize the correct store and choose the most useful next page.",
      },
      {
        heading: "Helpful Next Steps",
        body: "Open the Toronto store page, browse the menu, use the contact page for directions, and confirm any store-specific question before leaving.",
      },
    ],
    faqs: [
      { q: "Is this guide only for FORT YORK CANNABIS?", a: "Yes. This guide is written for FORT YORK CANNABIS at 38 Fort York Blvd in Toronto." },
      { q: "How can shoppers check current product details?", a: "Use the current menu experience or contact the store before visiting." },
      { q: "What should shoppers check first?", a: "Start with the official store page, confirm the location context, then use menu category links or staff help for product questions." },
      { q: "Why mention Fort York and CityPlace?", a: "Local shoppers often search with neighbourhood, street, condo-area, and downtown route language. Clear context helps them confirm the right store." },
    ],
  },
  {
    slug: "native-cigarettes-fort-york",
    title: "Native Cigarettes Fort York & CityPlace",
    metaDescription:
      "Compare Native cigarette cartons and selected-SKU Mix & Match details at FORT YORK CANNABIS, 38 Fort York Blvd near CityPlace. Adults 19+.",
    h1: "Native Cigarettes Near Fort York and CityPlace",
    heroTagline: "Native cigarette cartons and smoke-shelf choices for adults 19+ in downtown Toronto",
    localFeature: {
      eyebrow: "Fort York and CityPlace",
      heading: "Cigarette Shopping at 38 Fort York Blvd",
      body: "Adults 19+ near Fort York, CityPlace, and the downtown waterfront can compare Native cigarette cartons, packs, and separately priced smoke-shelf products at one 24-hour location.",
    },
    heroPreview: {
      eyebrow: "FORT YORK CANNABIS · 38 Fort York Blvd",
      intro:
        "Compare Native cigarette brands, carton pricing, and the selected-SKU Mix & Match offer before a Fort York or CityPlace visit.",
      products: [...NATIVE_CIGARETTE_PREVIEW],
      disclosure: "Brand preview only. Selection varies by store; check the current cigarette menu before visiting.",
      primaryAction: { label: "Browse Cigarettes", href: "/items/cigarettes" },
      secondaryAction: { label: "Smoke-Shelf Guides", href: "/resources/native-smokes" },
    },
    sections: [
      {
        heading: "Compare Native Cigarette Cartons and Packs",
        body: "Adults 19+ can compare Native cigarette names, carton pricing, and qualifying pack offers at Fort York. Each listing includes the product format and price needed to narrow the choice before visiting.",
      },
      {
        heading: "$25 Cartons and 2 Pack $5 Mix & Match",
        body: "Selected approved cigarette SKUs show both the $25 Carton price and the 2 Pack $5 Mix & Match offer. Qualifying products are marked individually because the Mix & Match deal does not apply to every cigarette, pouch, Backwoods, grabba, or smoke-shelf item.",
      },
      {
        heading: "Cigarettes Near CityPlace and the Waterfront",
        body: "FORT YORK CANNABIS is at 38 Fort York Blvd in downtown Toronto, close to CityPlace, Fort York, and waterfront routes. The store is open 24 hours, giving adults 19+ a local option for daytime, evening, and overnight visits.",
      },
      {
        heading: "More Smoke-Shelf Choices",
        body: "The Cigarettes collection also includes separately priced Backwoods, grabba, grabba shaker, and nicotine pouch listings. These products keep their own listed prices and are not automatically part of the selected-SKU cigarette offer.",
      },
    ],
    faqs: [
      {
        q: "Does every cigarette product qualify for 2 Pack $5 Mix & Match?",
        a: "No. The offer applies only to approved cigarette SKUs. Qualifying products show the 2 Pack $5 Mix & Match price beside the carton price.",
      },
      {
        q: "Are $25 carton prices still shown?",
        a: "Yes. Qualifying cigarette products show the $25 Carton price and the 2 Pack $5 Mix & Match offer together.",
      },
      {
        q: "Where is FORT YORK CANNABIS?",
        a: "FORT YORK CANNABIS is at 38 Fort York Blvd, Toronto, ON M5V 3Z3, near Fort York and CityPlace.",
      },
      {
        q: "Can shoppers confirm cigarette details before visiting?",
        a: "Yes. Browse the Cigarettes collection for product names and listed prices, or call 437-783-2511 with a product-specific question.",
      },
    ],
  },
  {
    slug: "nicotine-vapes-fort-york",
    title: "Nicotine Vapes Fort York & CityPlace",
    metaDescription:
      "Browse nicotine vape pens, pods, devices and e-liquid at FORT YORK CANNABIS near Fort York and CityPlace in downtown Toronto. Adults 19+.",
    h1: "Nicotine Vape Pens Near Fort York and CityPlace",
    heroTagline: "Nicotine vape pens, pods, devices, e-liquid, and disposable formats for adults 19+",
    localFeature: {
      eyebrow: "Fort York and CityPlace",
      heading: "Nicotine Vapes at 38 Fort York Blvd",
      body: "Adults 19+ near CityPlace, Fort York, and the downtown waterfront can compare current nicotine vape formats at a 24-hour location, with THC Vape Disposables kept in their own collection.",
    },
    heroPreview: {
      eyebrow: "NICOTINE VAPES · FORT YORK AND CITYPLACE",
      intro:
        "Compare nicotine vape pens, pods, devices, e-liquid, and disposable formats at 38 Fort York Blvd in downtown Toronto.",
      products: [...NICOTINE_VAPE_PREVIEW],
      disclosure: "Product preview only. Names and prices can change; check the current Nicotine Vapes menu before visiting.",
      primaryAction: { label: "Browse Nicotine Vapes", href: "/items/vapes" },
      secondaryAction: { label: "THC Vape Disposables", href: "/items/vape-disposables" },
    },
    sections: [
      {
        heading: "Nicotine Vape Pens, Pods, and Devices",
        body: "Adults 19+ can compare nicotine vape pens, pod hardware, e-liquid, rechargeable devices, and disposable formats in one focused collection. Product names, format details, and listed prices help make the choice clearer before a visit.",
      },
      {
        heading: "Nicotine Vapes and THC Vapes Stay Separate",
        body: "The Nicotine Vapes collection is dedicated to nicotine products. Cannabis products such as Gas Gang and Drizzle remain in the separate Vape Disposables collection, so shoppers do not have to sort two different product types in one list.",
      },
      {
        heading: "Vape Pens Near CityPlace and Fort York",
        body: "FORT YORK CANNABIS is at 38 Fort York Blvd near CityPlace, Fort York, and the downtown Toronto waterfront. The store is open 24 hours for adults 19+ planning a local visit.",
      },
      {
        heading: "Compare the Listed Vape Format",
        body: "Check whether a listing is a vape pen, pod, device, e-liquid, or disposable format, then compare the displayed product details and price. Call 437-783-2511 if a product-specific question remains before visiting.",
      },
    ],
    faqs: [
      {
        q: "Is the Nicotine Vapes collection the same as THC Vape Disposables?",
        a: "No. Nicotine vape pens, pods, devices, e-liquid, and nicotine disposable formats are kept separate from cannabis THC Vape Disposables.",
      },
      {
        q: "What types of nicotine vape products can shoppers compare?",
        a: "The category is organized for nicotine vape pens, disposable formats, pod hardware, devices, and e-liquid. Check the current menu for the listed products and prices.",
      },
      {
        q: "Where can adults 19+ find the Fort York vape menu?",
        a: "Use the Nicotine Vapes collection for nicotine products and the Vape Disposables collection for THC cannabis vapes.",
      },
      {
        q: "Where is the store?",
        a: "FORT YORK CANNABIS is at 38 Fort York Blvd, Toronto, ON M5V 3Z3, near CityPlace and the downtown waterfront.",
      },
    ],
  },
];

export function getSeoPageBySlug(slug: string): SeoPage | undefined {
  return SEO_PAGES.find((page) => page.slug === slug);
}
