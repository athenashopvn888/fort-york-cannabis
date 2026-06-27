export const pendingLabel = "Coming soon";

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
  phone: pendingLabel,
  phoneIntl: pendingLabel,
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
  menuUrl: "/#menu-preview",
  directionsUrl: "https://maps.app.goo.gl/XRcfsdmCFQrE3UkT9",
  mapEmbedUrl: "",
  latitude: "",
  longitude: "",
  hours: [pendingLabel],
  seoTitle: "FORT YORK CANNABIS | Weed Dispensary in Toronto",
  metaDescription: "FORT YORK CANNABIS is a cannabis store in Toronto near Fort York, CityPlace, the waterfront, and downtown Toronto. Store hours and phone are coming soon.",
  localLandmarks: ["Fort York", "CityPlace", "Canoe Landing", "Toronto waterfront"],
  introVariant: "FORT YORK CANNABIS is at 38 Fort York Blvd in downtown Toronto, serving adults 19+ near Fort York, CityPlace, the waterfront, King West, and the Entertainment District. Phone, hours, menu, and opening details are coming soon.",
  neighborhoodDescription: "Fort York and CityPlace combine dense downtown condo living, waterfront access, historic Fort York context, and quick movement toward King West, Harbourfront, Rogers Centre, and the Entertainment District.",
  parkingNote: "Parking, pickup, and delivery details are coming soon.",
  transitNote: "The area is served by downtown Toronto transit corridors around Fort York Boulevard, Bathurst Street, Spadina Avenue, Lake Shore Boulevard, and nearby waterfront routes.",
  sectionTitle: "Serving Fort York, CityPlace, and Downtown Toronto"
};

export function isKnown(value?: string) {
  return Boolean(value && value !== pendingLabel);
}
