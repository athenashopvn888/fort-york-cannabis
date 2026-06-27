import type { Metadata } from "next";
import DeliveryContent from "./DeliveryContent";

export const metadata: Metadata = {
  title: "Delivery Status | FORT YORK CANNABIS",
  description: "FORT YORK CANNABIS delivery details are pending owner confirmation. This page does not claim delivery availability until approved.",
  alternates: {
    canonical: "https://fortyorkcannabis.com/delivery",
  },
};

export default function DeliveryPage() {
  return <DeliveryContent />;
}