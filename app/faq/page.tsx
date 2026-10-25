import { cigaretteSafeContent } from "../lib/siteConfig";
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

const FAQ_CATEGORIES_RAW = [
  {
    title: "Location",
    faqs: [
      { q: "Where is FORT YORK CANNABIS located?", a: "The confirmed address is 38 Fort York Blvd, Toronto, ON M5V 3Z3, Canada." },
      { q: "Which area does the store serve?", a: "See the visit page for the map. The store is open 24 hours." },
      { q: "Is there a Google Maps link?", a: "Yes. Use the map link on the contact page for directions." },
    ],
  },
  {
    title: "Store Details",
    faqs: [
      { q: "What are the store hours?", a: "Open 24 hours, seven days a week." },
      { q: "What is the phone number?", a: "Phone is 437-783-2511." },
      { q: "Is license information available?", a: "License information is not published." },
    ],
  },
  {
    title: "Menu",
    faqs: [
      { q: "Can shoppers browse the menu?", a: "Yes. Browse menu categories for flower, pre-rolls, edibles, vapes, concentrates, accessories, cigarettes, and specialty items." },
      { q: "How should shoppers check product details?", a: "The menu shows what's listed today. Things sell through, so we never promise a specific strain." },
    ],
  },
  {
    title: "Flower and the counter",
    faqs: [
      { q: "How old do I need to be?", a: "19+. Staff ask for government photo ID from anyone who looks under 25." },
      { q: "What flower tiers do you carry?", a: "Exotic, Premium, AAA+, AA and Budget. See today's listings on the menu." },
      { q: "What sizes?", a: "Exotic, Premium and AAA+ come in a 6g pack. AA is the only tier with a true 5g." },
      { q: "Is there a free-gram offer?", a: "Yes, in store, on the top three tiers only: Exotic, Premium and AAA+. Staff confirm details at the counter." },
      { q: "Will a strain I saw online be there?", a: "The menu shows what's listed today. Things sell through, so we never promise a specific strain." },
      { q: "Can staff tell me what a strain does?", a: "They'll talk aroma, lineage and format. No effect or health claims." },
      { q: "Where do I start if I want the good stuff?", a: "Exotic is the top shelf." },
    ],
  },
];

const FAQ_CATEGORIES = cigaretteSafeContent(FAQ_CATEGORIES_RAW);

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
