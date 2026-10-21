import { SHOW_CIGARETTES, isCigaretteGuide, isPreservedSmokeItem, stripGrabbaMentions } from "./siteConfig";
import deliveryGuideCopy from "./deliveryGuideCopy.json";

export type DeliveryGuideFaq = { question: string; answer: string };
export type DeliveryGuideEntry = {
  slug: string;
  lane: "native_cig" | "nic_vape";
  name: string;
  title: string;
  description: string;
  h1: string;
  body_md: string;
  faq_items: DeliveryGuideFaq[];
  main_button: string;
  second_button: string;
  category_path: string;
  action_path: string;
};

export const DELIVERY_GUIDE_STORE = { domain: "fortyorkcannabis.com" } as const;
const DELIVERY_GUIDE_REGISTRY_RAW = deliveryGuideCopy as DeliveryGuideEntry[];

const presentDeliveryGuide = (guide: DeliveryGuideEntry): DeliveryGuideEntry => {
  if (SHOW_CIGARETTES || !isPreservedSmokeItem({ name: guide.name, slug: guide.slug })) return guide;
  return {
    ...guide,
    description: stripGrabbaMentions(guide.description),
    body_md: stripGrabbaMentions(guide.body_md).replace(/\/items\/cigarettes/g, "/items/accessories"),
    faq_items: guide.faq_items.filter((faq) => !/grabba/i.test(`${faq.question} ${faq.answer}`)),
    category_path: guide.category_path === "/items/cigarettes" ? "/items/accessories" : guide.category_path,
  };
};

export const DELIVERY_GUIDE_REGISTRY = (SHOW_CIGARETTES
  ? DELIVERY_GUIDE_REGISTRY_RAW
  : DELIVERY_GUIDE_REGISTRY_RAW.filter((guide) => !isCigaretteGuide({
      lane: guide.lane,
      slug: guide.slug,
      preferredCategoryPath: guide.category_path,
    }))
).map(presentDeliveryGuide);
export const getDeliveryGuide = (slug: string) => DELIVERY_GUIDE_REGISTRY.find((guide) => guide.slug === slug);
