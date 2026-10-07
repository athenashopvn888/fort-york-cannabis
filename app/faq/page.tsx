import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./faq.module.css";

export const metadata: Metadata = {
  title: "FAQ | FORT YORK CANNABIS",
  description:
    "Frequently asked questions for FORT YORK CANNABIS in Toronto. Phone is 437-783-2511, the store is open 24 hours, and menu and store details are available online.",
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
      { q: "What are the store hours?", a: "Open 24 hours, seven days a week." },
      { q: "What is the phone number?", a: "Phone is 437-783-2511." },
      { q: "Can I order online?", a: "Yes. Browse the delivery menu and use LIVE ORDER to start your order with the dispatcher." },
      { q: "Do you offer delivery?", a: "Yes. Delivery ordering is available daily from 10:00 a.m. to 10:00 p.m. through the delivery menu. The dispatcher confirms order details and eligibility." },
      { q: "Is there a minimum purchase?", a: "The delivery menu has a $60 product minimum and a $10 delivery fee." },
      { q: "Is license information available?", a: "License information is not published." },
    ],
  },
  {
    title: "Menu",
    faqs: [
      { q: "Can shoppers browse the menu?", a: "Yes. Browse menu categories for flower, pre-rolls, edibles, vapes, concentrates, accessories, cigarettes, and specialty items." },
      { q: "How should shoppers check product details?", a: "Use the current menu experience or contact the store before visiting if a specific item question matters." },
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
            <p className={styles.pageSubtitle}>Fort York Cannabis store details are listed below. Phone is 437-783-2511, the store is open 24 hours, and menu categories are available for browsing.</p>
          </div>
          <div className={styles.visualPanel}>
            <img src="/brand/local-area-waterfront.webp" alt="Fort York CityPlace downtown Toronto local area" className={styles.visualImage} />
            <div>
              <span className={styles.microLabel}>Store information</span>
              <h2 className={styles.categoryTitle}>Fort York / CityPlace / Downtown Toronto</h2>
              <p className={styles.pageSubtitle}>FORT YORK CANNABIS is at 38 Fort York Blvd in Toronto, with address, hours, phone, menu, and local-area details available for visit planning.</p>
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
