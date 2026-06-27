import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./faq.module.css";

export const metadata: Metadata = {
  title: "FAQ | FORT YORK CANNABIS",
  description:
    "Frequently asked questions for FORT YORK CANNABIS in Toronto. Phone is 437-872-8446, preview hours are 11AM-2AM, and final delivery/launch details are pending.",
  alternates: {
    canonical: "https://fortyorkcannabis.com/faq",
  },
};

const FAQ_CATEGORIES = [
  {
    title: "Location",
    faqs: [
      { q: "Where is FORT YORK CANNABIS located?", a: "The confirmed address is 38 Fort York Blvd, Toronto, ON M5V 3Z3, Canada." },
      { q: "Which area does the store serve?", a: "The local focus is Fort York, CityPlace, Downtown Toronto, the waterfront, King West, and nearby entertainment-district traffic." },
      { q: "Is there a Google Maps link?", a: "Yes. Use the map link on the contact page for directions." },
    ],
  },
  {
    title: "Store Details",
    faqs: [
      { q: "What are the store hours?", a: "Preview hours are 11AM-2AM. Open-now wording still requires live launch verification." },
      { q: "What is the phone number?", a: "Phone is 437-872-8446." },
      { q: "Is delivery or pickup available?", a: "Pickup and delivery details are coming soon." },
      { q: "Is license information available?", a: "License information is coming soon and will be added once ready." },
    ],
  },
  {
    title: "Menu",
    faqs: [
      { q: "Is the menu live?", a: "No. Inventory, pricing, brands, and categories will be added once details are ready." },
      { q: "Which categories will the menu include?", a: "Preview stock is loaded for flower, pre-rolls, edibles, vapes, concentrates, and accessories while final Fort York inventory is prepared." },
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
        <section className={styles.bannerSection}>
          <img src="/brand/faq-info-banner.webp" alt="FORT YORK CANNABIS FAQ" className={styles.bannerImage} />
        </section>
        <div className={styles.content}>
          <div className={styles.introPanel}>
            <span className={styles.microLabel}>Customer questions</span>
            <h1 className={styles.pageTitle}>Frequently Asked Questions</h1>
            <p className={styles.pageSubtitle}>Fort York Cannabis store details are listed below. Phone is 437-872-8446 and preview hours are 11AM-2AM. Delivery, pickup, and license details still need approval.</p>
          </div>
          <div className={styles.visualPanel}>
            <img src="/brand/local-area-waterfront.webp" alt="Fort York CityPlace downtown Toronto local area" className={styles.visualImage} />
            <div>
              <span className={styles.microLabel}>Store information</span>
              <h2 className={styles.categoryTitle}>Fort York / CityPlace / Downtown Toronto</h2>
              <p className={styles.pageSubtitle}>FORT YORK CANNABIS is at 38 Fort York Blvd in Toronto, with customer details updated as details are ready.</p>
            </div>
          </div>
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
