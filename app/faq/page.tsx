import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./faq.module.css";

export const metadata: Metadata = {
  title: "FAQ | FORT YORK CANNABIS",
  description:
    "Frequently asked questions for FORT YORK CANNABIS in Toronto. Phone, hours, menu, delivery, and launch details are pending owner confirmation.",
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
    title: "Store Details Pending Confirmation",
    faqs: [
      { q: "What are the store hours?", a: "Hours are pending owner confirmation. This site does not claim live-hours, late-night, or unverified extended-hours service." },
      { q: "What is the phone number?", a: "Phone is pending owner confirmation. No public phone number is published until confirmed." },
      { q: "Is delivery or pickup available?", a: "Pickup and delivery details are pending owner confirmation." },
      { q: "Is license information available?", a: "License information is pending owner confirmation and must be verified before publication." },
    ],
  },
  {
    title: "Menu",
    faqs: [
      { q: "Is the menu live?", a: "No. Inventory, pricing, brands, and categories will be published after owner confirmation." },
      { q: "What product categories are planned?", a: "The site is prepared for flower, pre-rolls, edibles, vapes, concentrates, and accessories, but exact availability is pending owner confirmation." },
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
          <img src="/banners/fort_york_faq_banner.webp" alt="FORT YORK CANNABIS FAQ" className={styles.bannerImage} />
        </section>
        <div className={styles.content}>
          <div className={styles.introPanel}>
            <span className={styles.microLabel}>Customer questions</span>
            <h1 className={styles.pageTitle}>Frequently Asked Questions</h1>
            <p className={styles.pageSubtitle}>Known Fort York Cannabis store details are listed below. Phone, hours, menu, delivery, pickup, and license information remain pending owner confirmation.</p>
          </div>
          <div className={styles.visualPanel}>
            <img src="/banners/fort_york_district_map.webp" alt="Fort York CityPlace downtown Toronto local area" className={styles.visualImage} />
            <div>
              <span className={styles.microLabel}>Store information</span>
              <h2 className={styles.categoryTitle}>Fort York / CityPlace / Downtown Toronto</h2>
              <p className={styles.pageSubtitle}>FORT YORK CANNABIS is planned for adults 19+ at 38 Fort York Blvd in Toronto, with customer details published only after confirmation.</p>
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
