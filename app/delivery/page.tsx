import type { Metadata } from "next";
import DeliveryContent from "./DeliveryContent";
import menu from "./delivery-menu.json";
import NearMeFaq from "../components/NearMeFaq";
import nearMeFaq from "../lib/nearMeFaq.json";

export const metadata: Metadata = {
  title: { absolute: "Weed Delivery from Fort York Cannabis | Toronto" },
  description: "Weed delivery from Fort York Cannabis in Toronto: separate delivery menu, flower from 7g, minimum order, and a $10 delivery fee. Adults 19+, ID checked at the door.",
  alternates: {
    canonical: "https://fortyorkcannabis.com/delivery",
  },
};

export default function DeliveryPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Fort York Cannabis Weed Delivery Menu",
      url: "https://fortyorkcannabis.com/delivery",
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: menu.products.length,
        itemListElement: menu.products.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: product.name,
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Fort York Cannabis Weed Delivery",
      serviceType: "Weed delivery",
      url: "https://fortyorkcannabis.com/delivery",
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "10:00",
        closes: "22:00",
      },
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <DeliveryContent />
      <NearMeFaq id="delivery-near-me" q={nearMeFaq.delivery!.q} a={nearMeFaq.delivery!.a} />
    </>
  );
}
