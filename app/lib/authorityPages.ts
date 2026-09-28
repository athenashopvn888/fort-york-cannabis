export type AuthorityPage = {
  path: string;
  eyebrow: string;
  title: string;
  summary: string;
  body: string;
  menuHref: string;
  menuLabel: string;
  faqs: { q: string; a: string }[];
};

export const AUTHORITY_PAGES: Record<string, AuthorityPage> = {
  geo: {
    path: "/weed-dispensary-fort-york",
    eyebrow: "Fort York Boulevard · CityPlace · Downtown Toronto",
    title: "Weed Dispensary on Fort York Boulevard near CityPlace",
    summary: "A practical guide to Fort York Cannabis, its five flower tiers, and the walk-in counter at 38 Fort York Blvd.",
    body: "Fort York Cannabis is a walk-in store at 38 Fort York Blvd, between the CityPlace condo towers and the Bathurst Quay edge of the waterfront. The counter carries five flower tiers, pre-rolls, edibles, concentrates and vapes. Most people arrive on foot from the surrounding towers, or come up from the 509 Harbourfront and 511 Bathurst streetcar stops. Check the live menu first, then bring government photo ID.",
    menuHref: "/exotic",
    menuLabel: "Browse flower tiers",
    faqs: [
      { q: "Where is Fort York Cannabis?", a: "At 38 Fort York Blvd in Toronto, near CityPlace and the downtown waterfront." },
      { q: "Can I compare flower tiers before visiting?", a: "Yes. The site has dedicated Exotic, Premium, AAA+, AA and Budget Weed collection pages." },
    ],
  },
  hours: {
    path: "/24-hour-fort-york-dispensary",
    eyebrow: "Open 24 hours · Seven days a week",
    title: "24-Hour Dispensary on Fort York Boulevard near CityPlace",
    summary: "Verified round-the-clock walk-in hours at Fort York Cannabis in downtown Toronto.",
    body: "The Fort York Boulevard counter is open 24 hours, seven days a week. That fits CityPlace residents coming home late, a stop after an event near the lake, or an early start before the Gardiner fills up. The menu and the ID check are the same at any hour.",
    menuHref: "/visit",
    menuLabel: "Plan a late-night visit",
    faqs: [
      { q: "Is Fort York Cannabis open 24 hours?", a: "Yes. Google lists the Fort York Boulevard store open 24 hours a day, seven days a week." },
      { q: "Do overnight visitors need ID?", a: "Yes. Adults 19+ need government-issued photo ID at any hour." },
    ],
  },
  cigarettes: {
    path: "/native-cigarettes-fort-york",
    eyebrow: "Adult cigarette shelf · Fort York and CityPlace",
    title: "Native Cigarettes on Fort York Boulevard near CityPlace",
    summary: "Check the current cigarette category before visiting the Fort York Boulevard counter.",
    body: "Fort York Cannabis sells cigarettes at the same counter as the cannabis menu, which saves CityPlace residents a second stop. The shelf has carried BB full and BB lights cartons and Backwoods, along with other packs that change week to week. Open the cigarette page to see what is in today before you walk over from the towers. Adults 19+ with photo ID only.",
    menuHref: "/items/cigarettes",
    menuLabel: "Check cigarette category",
    faqs: [
      { q: "Where can I check the current cigarette selection?", a: "Use the cigarette category before visiting because listings can change." },
      { q: "What ID is required?", a: "Adults 19+ need government-issued photo ID at the counter." },
    ],
  },
  vape: {
    path: "/nicotine-vape-fort-york",
    eyebrow: "Adult nicotine products · Fort York and CityPlace",
    title: "Nicotine Vapes on Fort York Boulevard near CityPlace",
    summary: "Browse nicotine disposables, pods and pouches separately from the THC vape shelf.",
    body: "For nicotine, the Fort York Boulevard counter keeps disposables, pods and nicotine pouches next to the THC vape shelf, but sold separately. The mix of brands and flavours changes with each delivery, so the vape-disposables page is the best check before you head down from Spadina or Bathurst. Nicotine products are sold to adults 19+ only.",
    menuHref: "/items/vape-disposables",
    menuLabel: "Check nicotine vape category",
    faqs: [
      { q: "Are nicotine and THC vapes the same category?", a: "No. Nicotine products and THC vape products are listed separately." },
      { q: "Does this page guarantee a flavour is available?", a: "No. Brands and flavours change, so check the current category and ask staff." },
    ],
  },
};
