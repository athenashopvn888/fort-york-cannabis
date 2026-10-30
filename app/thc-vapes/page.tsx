import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CategoryLanding from "../components/CategoryLanding";
import { CATEGORY_LANDINGS } from "../lib/publicCatalog";
import { STORE_NAP } from "../lib/storeNap";

const landing = CATEGORY_LANDINGS["thc-vapes"];

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: landing.title },
  description: landing.description,
  alternates: { canonical: `${STORE_NAP.origin}${landing.path}` },
  robots: { index: true, follow: true },
};

export default function ThcVapesPage() {
  return (
    <>
      <Navbar />
      <CategoryLanding slug="thc-vapes" />
      <Footer />
    </>
  );
}
