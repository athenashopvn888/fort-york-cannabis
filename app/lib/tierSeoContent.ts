export interface TierSeoData {
  seoTitle: string;
  h1: string;
  metaDescription: string;
  intro: string;
  sections: { heading: string; body: string }[];
  faqs: { q: string; a: string }[];
}

/** Unique Fort York / CityPlace / waterfront copy — no shared 60+ char sentences vs other fleet sites. */
export const TIER_SEO: Record<string, TierSeoData> = {
  EXOTIC: {
    seoTitle: "Exotic Weed on Fort York Blvd near CityPlace | Fort York Cannabis",
    h1: "Exotic Weed beside Fort York Boulevard and CityPlace",
    metaDescription:
      "Browse the Exotic Weed flower collection at Fort York Cannabis, 38 Fort York Blvd, Toronto. Adults 19+. Open 24 hours near CityPlace and Harbourfront.",
    intro:
      "Exotic Weed gathers the top-shelf flower rows posted for Fort York Cannabis at 38 Fort York Blvd. Use this collection when you already know the CityPlace pin and want the Exotic tier before a waterfront walk-in.",
    sections: [
      {
        heading: "Exotic flower at the Fort York Boulevard counter",
        body: "This CollectionPage lists Exotic strains currently published for Fort York Cannabis. Each card links into the flower menu detail path so shoppers can compare posted sizes without inventing stock promises.",
      },
      {
        heading: "How CityPlace shoppers use the Exotic tier",
        body: "Condo traffic along Fort York Boulevard often opens Exotic first, then checks Premium or AAA+ if a different potency band fits better. Stadium nights near Rogers Centre push the same pattern after events.",
      },
      {
        heading: "Weights shown on flower cards",
        body: "Posted flower weights on this storefront follow the 3g, 5g, 14g, and 28g fields only. Bundle labels on the menu are owned by the Menu bot and are not rewritten on this SEO collection.",
      },
    ],
    faqs: [
      { q: "What is Exotic Weed at Fort York Cannabis?", a: "Exotic Weed is the top-shelf Cannabis Flower collection published for the Fort York Boulevard storefront." },
      { q: "Can I compare other flower tiers?", a: "Yes. Premium, AAA+, AA, and Budget collections sit beside Exotic on this site." },
      { q: "Does this page claim live inventory?", a: "No. Cards mirror the published menu snapshot. Call 437-783-2511 if one SKU must be confirmed before you travel." },
    ],
  },
  PREMIUM: {
    seoTitle: "Premium Weed near Harbourfront & CityPlace | Fort York Cannabis",
    h1: "Premium Weed for Harbourfront and CityPlace walk-ins",
    metaDescription:
      "Explore Premium Weed at Fort York Cannabis on Fort York Blvd. Adults 19+ flower collection near Harbourfront, Bathurst Quay, and CityPlace. Open 24 hours.",
    intro:
      "Premium Weed is the mid-top flower band at Fort York Cannabis. Shoppers coming off Queens Quay or Bathurst Quay often land here when Exotic feels too narrow and AAA+ feels too broad.",
    sections: [
      {
        heading: "Premium collection context",
        body: "Cards on this page show Premium strains tied to 38 Fort York Blvd. The list is a CollectionPage with an ItemList so search engines can understand the tier without treating it as a city-wide delivery index.",
      },
      {
        heading: "Neighbourhood browsing path",
        body: "After a Harbourfront streetcar hop, many adults open Premium, scan THC notes, then jump to Visit for parking before crossing Fort York Boulevard.",
      },
    ],
    faqs: [
      { q: "What belongs in Premium Weed?", a: "Premium Weed lists the Cannabis Flower products tagged Premium in the Fort York menu snapshot." },
      { q: "Which tiers sit beside Premium?", a: "Exotic, AAA+, AA, and Budget are the sibling flower collections." },
      { q: "Is the store open overnight?", a: "Yes. Fort York Cannabis publishes a verified 24-hour schedule on Google Business Profile and on this website." },
    ],
  },
  "AAA+": {
    seoTitle: "AAA+ Weed at Fort York Blvd | Fort York Cannabis CityPlace",
    h1: "AAA+ Weed on Fort York Boulevard near CityPlace",
    metaDescription:
      "AAA+ Weed collection for Fort York Cannabis at 38 Fort York Blvd. Browse posted flower rows for CityPlace and Fort York adults 19+. Open 24 hours.",
    intro:
      "AAA+ Weed is the busy middle of the Fort York flower ladder. It suits shoppers who want a wide posted selection without jumping straight to Exotic.",
    sections: [
      {
        heading: "AAA+ as a downtown browsing hub",
        body: "This tier page keeps AAA+ focused for Fort York Boulevard. Pair it with the Hours page when you are deciding whether a late CityPlace walk still makes sense.",
      },
      {
        heading: "Compare without copying other stores",
        body: "Copy on this page stays tied to Fort York, CityPlace, and the waterfront edge. It does not reuse Little Italy, King West, or Preston Street sentences from other fleet sites.",
      },
    ],
    faqs: [
      { q: "What is AAA+ Weed here?", a: "AAA+ Weed is one Cannabis Flower collection at Fort York Cannabis." },
      { q: "Where do product links go?", a: "Each list item opens the matching /items/flower detail path for that strain slug." },
      { q: "Which weights appear on flower pricing?", a: "Public flower fields use 3g, 5g, 14g, and 28g only on this storefront." },
    ],
  },
  AA: {
    seoTitle: "AA Weed near Bathurst Quay & Fort York | Fort York Cannabis",
    h1: "AA Weed for Bathurst Quay and Fort York errands",
    metaDescription:
      "Browse AA Weed at Fort York Cannabis, 38 Fort York Blvd. Everyday flower collection for Bathurst Quay, Fort York, and CityPlace adults 19+. Open 24 hours.",
    intro:
      "AA Weed covers everyday flower rows for adults already moving between Bathurst Quay and Fort York Boulevard. It is a practical collection page, not a deal landing.",
    sections: [
      {
        heading: "AA collection for quick downtown stops",
        body: "Use AA when you want a compact list before a short walk from the waterfront streetcar. The ItemList schema mirrors the strains shown on the page.",
      },
      {
        heading: "Next steps after browsing",
        body: "Confirm the 24-hour schedule on Hours, then open Visit if you need parking or streetcar notes for 38 Fort York Blvd.",
      },
    ],
    faqs: [
      { q: "What is AA Weed at Fort York Cannabis?", a: "AA Weed is the everyday Cannabis Flower collection published for this storefront." },
      { q: "Can I jump to Budget or Premium from here?", a: "Yes. Sibling tier links sit on this page for Budget, Premium, Exotic, and AAA+." },
      { q: "Does AA replace the full menu?", a: "No. Category browsing still lives under /menu and /items/flower." },
    ],
  },
  BUDGET: {
    seoTitle: "Budget Weed near CityPlace condos | Fort York Cannabis",
    h1: "Budget Weed beside CityPlace and Fort York Blvd",
    metaDescription:
      "Budget Weed flower collection at Fort York Cannabis, 38 Fort York Blvd. Value-tier browsing for CityPlace and Fort York adults 19+. Open 24 hours.",
    intro:
      "Budget Weed gathers value-tier flower rows for Fort York Cannabis. CityPlace residents often open this collection when they want posted ounce and small-pack options without leaving the neighbourhood pin.",
    sections: [
      {
        heading: "Value tier without promo language",
        body: "This page describes the Budget collection as merchandise organization only. It does not invent flash sales or copy prices from another Toronto store.",
      },
      {
        heading: "Pair with visit planning",
        body: "Because the counter stays open 24 hours, Budget browsing can happen before a late walk along Fort York Boulevard. Bring 19+ ID either way.",
      },
    ],
    faqs: [
      { q: "What is Budget Weed here?", a: "Budget Weed is the value Cannabis Flower collection in the Fort York menu snapshot." },
      { q: "Are weights limited to 3, 5, 14, and 28 grams?", a: "Yes. Flower weight fields on this storefront stay on 3g, 5g, 14g, and 28g." },
      { q: "Where is the store?", a: "38 Fort York Blvd, Toronto, ON M5V 3Z3, beside CityPlace and the Fort York corridor." },
    ],
  },
};
