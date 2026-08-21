export const pendingLabel = "Coming soon";
export const storePhone = "437-783-2511";
export const storePhoneIntl = "+14377832511";
export const storeHours = "24 hours";
export const schemaOpeningHours = "Mo-Su 00:00-23:59";

export const gbpLocation = {
  storeCode: "FYC01",
  storeName: "FORT YORK CANNABIS",
  domain: "fortyorkcannabis.com",
  landingPath: "/weed-dispensary-toronto/",
  slug: "weed-dispensary-toronto",
  url: "https://fortyorkcannabis.com/weed-dispensary-toronto/",
  address: "38 Fort York Blvd, Toronto, ON M5V 3Z3, Canada",
  streetAddress: "38 Fort York Blvd",
  addressLocality: "Toronto",
  addressRegion: "ON",
  postalCode: "M5V 3Z3",
  addressCountry: "CA",
  phone: storePhone,
  phoneIntl: storePhoneIntl,
  neighborhood: "Fort York / CityPlace",
  city: "Toronto",
  serviceArea: ["Fort York", "CityPlace", "Toronto waterfront", "King West", "Entertainment District"],
  hours: [schemaOpeningHours],
  displayHours: storeHours,
  priceRange: "$$",
  latitude: 43.63936,
  longitude: -79.39523,
  mapEmbedQuery: "38 Fort York Blvd Toronto ON M5V 3Z3 Canada",
  mapDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=38%20Fort%20York%20Blvd%2C%20Toronto%2C%20ON%20M5V%203Z3%2C%20Canada",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=38%20Fort%20York%20Blvd%2C%20Toronto%2C%20ON%20M5V%203Z3%2C%20Canada",
  province: "ON",
  country: "CA",
  sectionTitle: "Cannabis Store Near Fort York",
  neighborhoodDescription:
    "FORT YORK CANNABIS is positioned for Fort York, CityPlace, waterfront Toronto, King West, and downtown Toronto customers.",
  transitNote:
    " The store is close to condo, transit, stadium, and waterfront traffic around 38 Fort York Blvd.",
  nearbyAreas: ["Fort York", "CityPlace", "Waterfront", "King West", "Rogers Centre", "Entertainment District"],
  license: pendingLabel,
  openingDate: pendingLabel,
  menuStatus: "Menu active for local browsing.",
  primaryKeyword: "cannabis store near Fort York",
  secondaryKeywords: [
    "weed dispensary Fort York",
    "cannabis store CityPlace",
    "dispensary near Rogers Centre",
    "Toronto waterfront cannabis store",
  ],
  metaTitle: "Fort York Cannabis Store | FORT YORK CANNABIS Toronto",
  seoTitle: "Fort York Cannabis Store | FORT YORK CANNABIS Toronto",
  metaDescription:
    "FORT YORK CANNABIS is a cannabis store at 38 Fort York Blvd in Toronto, serving Fort York, CityPlace, the waterfront, King West, and nearby downtown Toronto customers.",
  introVariant:
    "FORT YORK CANNABIS serves adults 19+ at 38 Fort York Blvd in downtown Toronto near Fort York, CityPlace, the waterfront, King West, and the Entertainment District. Open 24 hours. Phone is 437-783-2511.",
  complianceNote:
    "Cannabis products are for adults 19+ only. Pickup and delivery details will be posted when available.",
  localProofPoints: [
    "Located at 38 Fort York Blvd in downtown Toronto.",
    "Serves Fort York, CityPlace, the waterfront, King West, Rogers Centre, and the Entertainment District.",
    "Phone is 437-783-2511 and the store is open 24 hours.",
  ],
  internalLaunchInputs: [
    "Final license details",
    "Opening date",
    "Pickup and delivery details",
    "Menu updates and product availability",
  ],
} as const;

export function isKnown(value?: string | number | null) {
  return Boolean(value !== undefined && value !== null && value !== "" && value !== pendingLabel);
}
