/** FYC01 NAP + hours from Tech GBP Business Information read (2026-09-24). Do not invent hours. */
export const STORE_NAP = {
  name: "Fort York Cannabis",
  brand: "FORT YORK CANNABIS",
  domain: "fortyorkcannabis.com",
  origin: "https://fortyorkcannabis.com",
  streetAddress: "38 Fort York Blvd",
  addressLocality: "Toronto",
  addressRegion: "ON",
  postalCode: "M5V 3Z3",
  addressCountry: "CA",
  addressLine: "38 Fort York Blvd, Toronto, ON M5V 3Z3",
  phoneDisplay: "437-783-2511",
  phoneIntl: "+14377832511",
  telHref: "tel:+14377832511",
  hoursLabel: "Open 24 hours",
  hoursShort: "24 hours",
  is24h: true,
  hoursOpens: "00:00",
  hoursCloses: "23:59",
  latitude: 43.6403021,
  longitude: -79.3952522,
  neighborhood: "Fort York / CityPlace",
  corridor: "Fort York Boulevard, CityPlace, and the downtown waterfront",
  intersection: "Fort York Blvd near Bathurst Street and the Gardiner edge",
  ageLine: "Adults 19+",
  mapsUrl: "https://maps.app.goo.gl/XRcfsdmCFQrE3UkT9",
  mapEmbedUrl:
    "https://www.google.com/maps?q=38+Fort+York+Blvd,+Toronto,+ON+M5V+3Z3&output=embed",
  image: "https://fortyorkcannabis.com/brand/og-fort-york-cannabis.webp",
  gbpLocation: "locations/2340516687807323434",
} as const;

export const HOME_FAQS = [
  {
    q: "Where is Fort York Cannabis?",
    a: "Fort York Cannabis is at 38 Fort York Blvd, Toronto, ON M5V 3Z3, beside CityPlace condo traffic and the Fort York heritage grounds.",
  },
  {
    q: "Is Fort York Cannabis open 24 hours?",
    a: "Yes. Google Business Profile regular hours list the storefront open 24 hours every day. Call 437-783-2511 if you need a same-day confirmation before you leave.",
  },
  {
    q: "Which neighbourhoods does this counter serve?",
    a: "Shoppers usually arrive from CityPlace, Fort York Boulevard, Harbourfront / Queens Quay, Bathurst Quay, Rogers Centre event traffic, and short hops from Spadina Waterfront.",
  },
  {
    q: "Where should first-time visitors start?",
    a: "Use the Visit page for street-level notes, the Hours page for the 24-hour schedule, then browse flower tiers or the Native cigarettes and nicotine vape info pages.",
  },
] as const;

export const VISIT_FAQS = [
  {
    q: "What is the exact address for Fort York Cannabis?",
    a: "38 Fort York Blvd, Toronto, ON M5V 3Z3. Look for the Fort York Boulevard storefront facing CityPlace and the heritage fort corridor.",
  },
  {
    q: "Which streetcar or transit approaches work best?",
    a: "The 509 Harbourfront and 511 Bathurst streetcars serve the waterfront / Bathurst Quay edge. From those stops, continue north toward Fort York Boulevard rather than drifting east into the Financial District. Always check current TTC service before you travel.",
  },
  {
    q: "Where can visitors park near 38 Fort York Blvd?",
    a: "Paid curb space along Fort York Boulevard fills quickly around condo towers and stadium nights. When the boulevard is crowded, use CityPlace garage options and walk the short block instead of circling the same curb.",
  },
  {
    q: "What should adults bring?",
    a: "Government-issued photo ID proving you are 19 or older. Call 437-783-2511 if one specific product is the only reason for the trip.",
  },
] as const;

export const HOURS_FAQS = [
  {
    q: "Is Fort York Cannabis really open 24 hours?",
    a: "Yes. The live Google Business Profile regular hours show open midnight-to-midnight for every day of the week. This website mirrors that verified 24-hour schedule.",
  },
  {
    q: "Do holidays change the schedule?",
    a: "Special-hour overrides can appear on Google for specific dates. When in doubt, call 437-783-2511 before a long trip across downtown.",
  },
  {
    q: "Where else can I confirm timing?",
    a: "Use the Visit page for the pin and map, then rely on the phone line for same-day confirmation.",
  },
] as const;

export function storeJsonLd() {
  const nap = STORE_NAP;
  return {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": `${nap.origin}/#store`,
    name: nap.brand,
    description:
      "Cannabis store at 38 Fort York Blvd in Toronto, ON. Phone is 437-783-2511 and the store is open 24 hours.",
    url: nap.origin,
    telephone: nap.phoneDisplay,
    image: nap.image,
    openingHours: "Mo-Su 00:00-23:59",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: nap.hoursOpens,
        closes: nap.hoursCloses,
      },
    ],
    hasMap: nap.mapsUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: nap.streetAddress,
      addressLocality: nap.addressLocality,
      addressRegion: nap.addressRegion,
      postalCode: nap.postalCode,
      addressCountry: nap.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: nap.latitude,
      longitude: nap.longitude,
    },
    areaServed: [
      { "@type": "Place", name: "Fort York" },
      { "@type": "Place", name: "CityPlace" },
      { "@type": "Place", name: "Harbourfront" },
      { "@type": "City", name: "Toronto" },
    ],
  };
}

export function faqPageJsonLd(
  faqs: readonly { q: string; a: string }[] | readonly { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => {
      const name = "q" in faq ? faq.q : faq.question;
      const text = "a" in faq ? faq.a : faq.answer;
      return {
        "@type": "Question",
        name,
        acceptedAnswer: { "@type": "Answer", text },
      };
    }),
  };
}
