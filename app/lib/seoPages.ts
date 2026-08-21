export type SeoPage = {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  heroTagline: string;
  banner?: string;
  sections: { heading: string; body: string }[];
  faqs: { q: string; a: string }[];
};

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
      { q: "How can shoppers browse the menu?", a: "Use the menu category links for flower, pre-rolls, vapes, edibles, concentrates, accessories, and other available sections." },
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
        body: "Start with the Fort York menu to browse categories such as flower, pre-rolls, vapes, edibles, concentrates, accessories, cigarettes, and specialty items. For item-specific questions, use the current menu experience, contact the store, or ask staff before visiting.",
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
];

export function getSeoPageBySlug(slug: string): SeoPage | undefined {
  return SEO_PAGES.find((page) => page.slug === slug);
}
