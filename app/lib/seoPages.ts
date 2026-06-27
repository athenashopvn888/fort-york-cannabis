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
    metaDescription: "FORT YORK CANNABIS is a planned cannabis store at 38 Fort York Blvd in Toronto near Fort York, CityPlace, and the waterfront. Hours and phone are pending owner input.",
    h1: "Fort York Cannabis Store",
    heroTagline: "Local cannabis storefront planning for Fort York and CityPlace",
    banner: "/banners/fort_york_local_banner.webp",
    sections: [
      {
        heading: "Cannabis Store Near Fort York",
        body: "FORT YORK CANNABIS is being prepared for 38 Fort York Blvd in Toronto, close to Fort York, CityPlace, the waterfront, and downtown Toronto residential traffic. This page uses only confirmed address and local-area facts.",
      },
      {
        heading: "Confirmed And Pending Facts",
        body: "The confirmed facts are the store name, domain, address, Google Maps link, Toronto city label, and local landing route. Phone, hours, menu, launch date, delivery, and license wording are PENDING_OWNER_INPUT.",
      },
    ],
    faqs: [
      { q: "Where is FORT YORK CANNABIS?", a: "38 Fort York Blvd, Toronto, ON M5V 3Z3, Canada." },
      { q: "Are the hours confirmed?", a: "No. Hours are PENDING_OWNER_INPUT." },
    ],
  },
  {
    slug: "cityplace-cannabis-dispensary",
    title: "CityPlace Cannabis Dispensary | FORT YORK CANNABIS",
    metaDescription: "FORT YORK CANNABIS is a planned cannabis storefront near CityPlace and Fort York in downtown Toronto. Menu and hours are pending owner confirmation.",
    h1: "CityPlace Cannabis Dispensary",
    heroTagline: "A downtown Toronto cannabis storefront direction for CityPlace residents",
    banner: "/banners/fort_york_hero_banner.webp",
    sections: [
      {
        heading: "Serving CityPlace And Downtown Toronto",
        body: "The local content direction speaks to CityPlace, Fort York, waterfront Toronto, King West, and Entertainment District customers without claiming delivery, hours, ratings, or inventory that have not been confirmed.",
      },
      {
        heading: "Menu And Service Details Pending",
        body: "The site structure supports a polished menu experience later, but inventory, pricing, brands, delivery, pickup, phone, and hours remain PENDING_OWNER_INPUT.",
      },
    ],
    faqs: [
      { q: "Is this near CityPlace?", a: "Yes. The address at 38 Fort York Blvd is positioned for Fort York and CityPlace local search." },
      { q: "Is delivery available?", a: "Delivery status is PENDING_OWNER_INPUT." },
    ],
  },
  {
    slug: "downtown-toronto-weed-dispensary",
    title: "Downtown Toronto Weed Dispensary | FORT YORK CANNABIS",
    metaDescription: "FORT YORK CANNABIS is a downtown Toronto cannabis storefront scaffold for 38 Fort York Blvd. Phone, hours, and menu are pending owner confirmation.",
    h1: "Downtown Toronto Weed Dispensary",
    heroTagline: "Fort York, CityPlace, waterfront, and King West local SEO setup",
    banner: "/banners/fort_york_welcome_banner.webp",
    sections: [
      {
        heading: "Downtown Toronto Local SEO Setup",
        body: "This page safely targets downtown Toronto weed store, weed dispensary in Toronto, cannabis store near Fort York, and cannabis dispensary near CityPlace themes using confirmed address facts and clear pending placeholders.",
      },
      {
        heading: "No Unsupported Claims",
        body: "This page does not claim live-hours wording, unverified hours claims, best/top ranked, customer reviews, ratings, delivery, staff history, license status, or menu availability until the owner confirms those details.",
      },
    ],
    faqs: [
      { q: "Can this page use live-hours wording?", a: "No. Live-hours wording requires verified hours." },
      { q: "Can this page list products?", a: "Only broad categories are shown. Exact inventory is PENDING_OWNER_INPUT." },
    ],
  },
];
