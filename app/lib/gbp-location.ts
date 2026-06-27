export const PENDING_OWNER_INPUT = "PENDING_OWNER_INPUT";

export const gbpLocation = {
  storeCode: "FYC01",
  storeName: "FORT YORK CANNABIS",
  domain: "fortyorkcannabis.com",
  city: "Toronto",
  province: "ON",
  country: "CA",
  slug: "weed-dispensary-toronto",
  address: "38 Fort York Blvd, Toronto, ON M5V 3Z3, Canada",
  streetAddress: "38 Fort York Blvd",
  postalCode: "M5V 3Z3",
  phone: PENDING_OWNER_INPUT,
  phoneIntl: PENDING_OWNER_INPUT,
  neighborhood: "Fort York / CityPlace / Downtown Toronto",
  nearbyAreas: [
    "Fort York",
    "CityPlace",
    "Downtown Toronto",
    "Waterfront Toronto",
    "Harbourfront",
    "King West",
    "Entertainment District",
    "Spadina Avenue"
  ],
  products: [
    "Flower",
    "Pre-rolls",
    "Edibles",
    "THC vapes",
    "Concentrates",
    "Accessories"
  ],
  menuUrl: "/#menu-status",
  directionsUrl: "https://maps.app.goo.gl/XRcfsdmCFQrE3UkT9",
  mapEmbedUrl: "",
  latitude: "",
  longitude: "",
  hours: [PENDING_OWNER_INPUT],
  seoTitle: "FORT YORK CANNABIS | Weed Dispensary in Toronto",
  metaDescription: "FORT YORK CANNABIS is a cannabis store in Toronto near Fort York, CityPlace, the waterfront, and downtown Toronto. Store hours and phone are pending owner confirmation.",
  localLandmarks: ["Fort York", "CityPlace", "Canoe Landing", "Toronto waterfront"],
  introVariant: "FORT YORK CANNABIS is a planned local cannabis store at 38 Fort York Blvd in downtown Toronto, serving adults 19+ near Fort York, CityPlace, the waterfront, King West, and the Entertainment District. Phone, hours, menu, and launch details are pending owner confirmation.",
  neighborhoodDescription: "Fort York and CityPlace combine dense downtown condo living, waterfront access, historic Fort York context, and quick movement toward King West, Harbourfront, Rogers Centre, and the Entertainment District.",
  parkingNote: "Parking and pickup details are PENDING_OWNER_INPUT",
  transitNote: "The area is served by downtown Toronto transit corridors around Fort York Boulevard, Bathurst Street, Spadina Avenue, Lake Shore Boulevard, and nearby waterfront routes.",
  sectionTitle: "Serving Fort York, CityPlace, and Downtown Toronto"
};

export function isKnown(value?: string) {
  return Boolean(value && value !== PENDING_OWNER_INPUT);
}
