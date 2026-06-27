import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./faq.module.css";

export const metadata: Metadata = {
  title: "FAQ | FORT YORK CANNABIS",
  description:
    "Frequently asked questions for FORT YORK CANNABIS in Toronto. Unknown phone, hours, menu, delivery, and launch details are marked pending owner input.",
  alternates: {
    canonical: "https://fortyorkcannabis.com/faq",
  },
};

const FAQ_CATEGORIES = [
  {
    title: "Location",
    faqs: [
      { q: "Where is FORT YORK CANNABIS located?", a: "The confirmed address is 38 Fort York Blvd, Toronto, ON M5V 3Z3, Canada." },
      { q: "Which area does the site focus on?", a: "The local focus is Fort York, CityPlace, Downtown Toronto, the waterfront, King West, and nearby entertainment-district traffic." },
      { q: "Is there a Google Maps link?", a: "Yes. The provided Google Maps link is https://maps.app.goo.gl/XRcfsdmCFQrE3UkT9." },
    ],
  },
  {
    title: "Pending Store Facts",
    faqs: [
      { q: "What are the store hours?", a: "PENDING_OWNER_INPUT. This site does not claim live-hours, late-night, or unverified extended-hours service." },
      { q: "What is the phone number?", a: "PENDING_OWNER_INPUT. No phone number is published until confirmed." },
      { q: "Is delivery available?", a: "PENDING_OWNER_INPUT. This site does not claim delivery or pickup until approved." },
      { q: "Is the store licensed?", a: "License or authorization wording is PENDING_OWNER_INPUT and must be verified before publication." },
    ],
  },
  {
    title: "Menu",
    faqs: [
      { q: "Is the menu live?", a: "No. Inventory, pricing, brands, and categories are prepared as a design structure only until the owner provides confirmed menu data." },
      { q: "What product categories are planned?", a: "The local scaffold supports flower, pre-rolls, edibles, vapes, concentrates, and accessories, but exact availability is PENDING_OWNER_INPUT." },
    ],
  },
];

export default function FAQPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_CATEGORIES.flatMap((cat) =>
      cat.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      }))
    ),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className={styles.main}>
        <Navbar />
        <section style={{ width: "100%", overflow: "hidden", marginTop: "92px" }}>
          <img src="/banners/fort_york_faq_banner.webp" alt="FORT YORK CANNABIS FAQ" style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }} />
        </section>
        <div className={styles.content}>
          <h1 className={styles.pageTitle}>Frequently Asked Questions</h1>
          <p className={styles.pageSubtitle}>Known Fort York Cannabis launch facts only. Unknowns stay marked as PENDING_OWNER_INPUT.</p>
          {FAQ_CATEGORIES.map((cat) => (
            <div key={cat.title} className={styles.category}>
              <h2 className={styles.categoryTitle}>{cat.title}</h2>
              {cat.faqs.map((faq) => (
                <details key={faq.q} className={styles.faqItem}>
                  <summary className={styles.faqQuestion}>{faq.q}</summary>
                  <p className={styles.faqAnswer}>{faq.a}</p>
                </details>
              ))}
            </div>
          ))}
        </div>
        <Footer />
      </main>
    </>
  );
}