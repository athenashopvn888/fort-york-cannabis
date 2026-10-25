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
    eyebrow: "Fort York · Walk-in · Adults 19+",
    title: "Weed Dispensary in Fort York",
    summary: "Looking for a weed dispensary in Fort York? Fort York Cannabis at 38 Fort York Blvd has five flower tiers, vapes, pre-rolls and edibles for adults 19+. Open 24 hours.",
    body: "Five tiers run from Exotic to Budget, graded on look, nose and cure. The vape wall covers disposables, carts and pods. Staff explain labels, sizes and formats. The top three tiers (Exotic, Premium, AAA+) come in a 6g pack, and the in-store free-gram offer applies to those three only. AA is the only true 5g. The menu shows what's listed today. Going big? Start at Exotic. Buyers must be 19+; ID checked for anyone who looks under 25. The counter is open 24 hours.",
    menuHref: "/exotic",
    menuLabel: "See Exotic",
    faqs: [
      { q: "Where is Fort York Cannabis?", a: "At 38 Fort York Blvd, Toronto. The visit page map shows the door. Open 24 hours." },
      { q: "Is it walkable from nearby condos?", a: "The visit page map will tell you exactly how far." },
      { q: "Can I ask for a strain by name?", a: "Yes. If it is not listed today, staff will suggest something similar by aroma." },
      { q: "Do you deliver?", a: "Yes. Delivery has its own menu and prices, and flower starts at 7g. The minimum order is shown on the delivery page." },
    ],
  },
  hours: {
    path: "/24-hour-fort-york-dispensary",
    eyebrow: "Open 24 hours · Seven days a week",
    title: "The 24-Hour Dispensary in Fort York",
    summary: "Fort York Cannabis is a 24-hour dispensary at 38 Fort York Blvd, Toronto. Flower, vapes, pre-rolls and edibles, any hour. Adults 19+.",
    body: "Fort York Cannabis at 38 Fort York Blvd is a 24-hour dispensary: open around the clock, seven days a week. Hospital shifts, bar shifts, red-eye landings, a deadline that ate the evening. Whatever kept you up, the counter is open. Check the menu first so you know what is listed right now. Five flower tiers run from Exotic to Budget. The top three come in a 6g pack, and the in-store free-gram offer covers those three only. AA is the only true 5g. Vapes, pre-rolls, edibles and accessories are on the shelf. Top shelf at any hour is Exotic. Buyers must be 19+, and staff ask for ID from anyone who looks under 25, at any hour. Keep purchases sealed on the way home.",
    menuHref: "/menu",
    menuLabel: "Check the menu",
    faqs: [
      { q: "Really 24 hours?", a: "Yes, every day. Holiday changes show on the hours page." },
      { q: "Where is the store?", a: "38 Fort York Blvd, Toronto. The map is on the visit page." },
      { q: "Do you deliver?", a: "Yes. Delivery has its own menu and prices, and flower starts at 7g. The minimum order is shown on the delivery page." },
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
