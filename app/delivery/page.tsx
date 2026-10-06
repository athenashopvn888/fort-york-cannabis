import type { Metadata } from "next";
import DeliveryContent from "./DeliveryContent";
import menu from "./delivery-menu.json";

export const metadata: Metadata = {
  title: { absolute: "Weed Delivery Toronto | Fort York Cannabis" },
  description: "Browse the Fort York Cannabis live delivery menu and use LIVE ORDER to connect with the dispatcher. $60 product minimum and $10 delivery fee.",
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
    </>
  );
}
