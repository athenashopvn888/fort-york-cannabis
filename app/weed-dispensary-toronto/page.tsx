import { Metadata } from "next";
import { GBPLandingPage } from "@/app/components/GBPLandingPage";
import { gbpLocation } from "@/app/lib/gbp-location";

export const metadata: Metadata = {
  title: gbpLocation.seoTitle,
  description: gbpLocation.metaDescription,
  alternates: {
    canonical: `https://${gbpLocation.domain}/${gbpLocation.slug}/`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: gbpLocation.seoTitle,
    description: gbpLocation.metaDescription,
    url: `https://${gbpLocation.domain}/${gbpLocation.slug}/`,
    images: [
      {
        url: `https://${gbpLocation.domain}/brand/og-fort-york-cannabis.webp`,
        width: 1200,
        height: 630,
        alt: "FORT YORK CANNABIS local landing page",
      },
    ],
  },
};

export default function Page() {
  return <GBPLandingPage />;
}
