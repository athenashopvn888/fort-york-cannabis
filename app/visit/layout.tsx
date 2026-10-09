import type { ReactNode } from "react";

// Additive BreadcrumbList for /visit (fleet SEO audit 2026-10-09). No visual change.
const ORIGIN = "https://fortyorkcannabis.com";
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: ORIGIN },
    { "@type": "ListItem", position: 2, name: "Visit", item: `${ORIGIN}/visit` },
  ],
};

export default function VisitLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {children}
    </>
  );
}
