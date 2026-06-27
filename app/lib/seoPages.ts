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
    metaDescription: "FORT YORK CANNABIS is a cannabis store at 38 Fort York Blvd in Toronto near Fort York, CityPlace, and the waterfront. Phone is 437-872-8446 and preview hours are 11AM-2AM.",
    h1: "Fort York Cannabis Store",
    heroTagline: "Local cannabis store information for Fort York and CityPlace",
    banner: "/brand/local-area-waterfront.webp",
    sections: [
      {
        heading: "Cannabis Store Near Fort York",
        body: "FORT YORK CANNABIS is at 38 Fort York Blvd in Toronto, close to Fort York, CityPlace, the waterfront, and downtown Toronto residential traffic.",
      },
      {
        heading: "Store Details Coming Soon",
        body: "Store name, domain, address, Google Maps link, Toronto city label, and local landing route are ready. Phone 437-872-8446 and preview hours 11AM-2AM are ready for owner review. Final menu, launch date, delivery, pickup, and license wording still need approval.",
      },
    ],
    faqs: [
      { q: "Where is FORT YORK CANNABIS?", a: "38 Fort York Blvd, Toronto, ON M5V 3Z3, Canada." },
      { q: "Are the hours available?", a: "11AM-2AM." },
    ],
  },
  {
    slug: "cityplace-cannabis-dispensary",
    title: "CityPlace Cannabis Dispensary | FORT YORK CANNABIS",
    metaDescription: "FORT YORK CANNABIS is a cannabis store near CityPlace and Fort York in downtown Toronto. Preview menu and hours 11AM-2AM are ready for owner review.",
    h1: "CityPlace Cannabis Dispensary",
    heroTagline: "A downtown Toronto cannabis store page for CityPlace residents",
    banner: "/brand/hero-home-desktop.webp",
    sections: [
      {
        heading: "Serving CityPlace And Downtown Toronto",
        body: "FORT YORK CANNABIS is positioned for CityPlace, Fort York, waterfront Toronto, King West, and Entertainment District customers without claiming delivery, hours, ratings, or inventory that have not been confirmed.",
      },
      {
        heading: "Menu And Service Details Coming Soon",
        body: "The site supports a polished menu experience, and temporary preview stock is loaded. Final Fort York inventory, pricing, brands, delivery, and pickup still need approval.",
      },
    ],
    faqs: [
      { q: "Is this near CityPlace?", a: "Yes. The address at 38 Fort York Blvd is positioned for Fort York and CityPlace local search." },
      { q: "Is delivery available?", a: "Delivery details are coming soon." },
    ],
  },
  {
    slug: "downtown-toronto-weed-dispensary",
    title: "Downtown Toronto Weed Dispensary | FORT YORK CANNABIS",
    metaDescription: "FORT YORK CANNABIS is a downtown Toronto cannabis store for 38 Fort York Blvd. Phone is 437-872-8446, preview hours are 11AM-2AM, and final menu approval is pending.",
    h1: "Downtown Toronto Weed Dispensary",
    heroTagline: "Fort York, CityPlace, waterfront, and King West cannabis store information",
    banner: "/brand/faq-info-banner.webp",
    sections: [
      {
        heading: "Downtown Toronto Cannabis Store",
        body: "This page supports downtown Toronto weed store, weed dispensary in Toronto, cannabis store near Fort York, and cannabis dispensary near CityPlace themes using confirmed address facts and customer-friendly coming-soon language.",
      },
      {
        heading: "No Unsupported Claims",
        body: "This page does not claim open-now wording, extended hours, best/top ranked status, customer reviews, ratings, delivery, staff history, license status, or live menu availability until those details are approved.",
      },
    ],
    faqs: [
      { q: "Can this page use live-hours wording?", a: "No. Live-hours wording requires verified hours." },
      { q: "Can this page list products?", a: "Only broad categories are shown. Preview stock is loaded while exact Fort York inventory is pending." },
    ],
  },
];

export function getSeoPageBySlug(slug: string): SeoPage | undefined {
  return SEO_PAGES.find((page) => page.slug === slug);
}
