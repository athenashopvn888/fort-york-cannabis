import type { Metadata } from "next";
import DeliveryContent from "./DeliveryContent";

export const metadata: Metadata = {
  title: "Delivery Status | FORT YORK CANNABIS",
  description: "FORT YORK CANNABIS delivery details are coming soon. Delivery details will be added once they are ready.",
  alternates: {
    canonical: "https://fortyorkcannabis.com/delivery",
  },
};

export default function DeliveryPage() {
  return <DeliveryContent />;
}