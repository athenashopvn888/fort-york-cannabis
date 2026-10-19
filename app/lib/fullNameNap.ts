/**
 * FYC01 exact full name + NAP. Name = the store's full name as used on its Google Business Profile.
 * Public GBP primary phone only. Map link = this store's own Google place ID.
 */
export const FULL_NAME_NAP = {
  "code": "FYC01",
  "fullName": "Fort York Cannabis Dispensary Weed Delivery",
  "street": "38 Fort York Blvd",
  "city": "Toronto",
  "region": "ON",
  "postal": "M5V 3Z3",
  "phoneDisplay": "(437) 783-2511",
  "phoneTel": "tel:+14377832511",
  "hours": "Open 24 hours, 7 days a week",
  "mapsUrl": "https://www.google.com/maps/place/?q=place_id:ChIJn0703tU1K4gRGyZCoQpRlDs",
  "placeId": "ChIJn0703tU1K4gRGyZCoQpRlDs",
  "neighbourhood": "Fort York / CityPlace",
  "intersection": "Fort York Blvd near Bathurst Street",
  "transit": "",
  "visitPath": "/visit"
} as const;

export const FULL_NAME_NAP_ADDRESS = `${FULL_NAME_NAP.street}, ${FULL_NAME_NAP.city}, ${FULL_NAME_NAP.region} ${FULL_NAME_NAP.postal}`;
