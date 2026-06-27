import Link from "next/link";
import styles from "./page.module.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { MENU_PREVIEW_CATEGORIES, MENU_PREVIEW_NOTICE } from "./lib/menu-preview";

const ACTIONS = [
  { label: "Address", note: "38 Fort York Blvd", href: "/contact" },
  { label: "Directions", note: "Open Google Maps", href: "https://maps.app.goo.gl/XRcfsdmCFQrE3UkT9", external: true },
  { label: "Menu", note: "Coming soon", href: "#menu-preview" },
  { label: "Hours", note: "Coming soon", href: "/contact" },
];

const LOCAL_FEATURES = [
  { label: "Fort York", body: "A local cannabis store page centered on Fort York Boulevard and nearby downtown routes." },
  { label: "CityPlace", body: "Helpful store information for adults 19+ around CityPlace, the waterfront, and condo-area foot traffic." },
  { label: "Downtown Toronto", body: "Simple directions, clean local context, and a menu area ready for confirmed inventory." },
];

const LOCAL_FAQS = [
  {
    q: "Where is FORT YORK CANNABIS located?",
    a: "FORT YORK CANNABIS is at 38 Fort York Blvd, Toronto, ON M5V 3Z3, Canada.",
  },
  {
    q: "What are the store hours?",
    a: "Hours coming soon. This site does not use open-now, late-night, or 24-hour wording until hours are confirmed.",
  },
  {
    q: "Is the menu live?",
    a: "Menu coming soon. Product categories are shown as a preview while final inventory is prepared.",
  },
  {
    q: "Which neighbourhoods does the store serve?",
    a: "The local focus is Fort York, CityPlace, Downtown Toronto, the waterfront, King West, and the Entertainment District.",
  },
];

export default function HomePage() {
  return (
    <main className={styles.main}>
      <Navbar />

      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.heroKicker}>Fort York / CityPlace</span>
          <h1 className={styles.brandTitle}>FORT YORK CANNABIS</h1>
          <p className={styles.brandSub}>Cannabis Store Near Fort York & CityPlace</p>
          <p className={styles.localLine}>38 Fort York Blvd, Toronto</p>
          <div className={styles.heroActions}>
            <a href="https://maps.app.goo.gl/XRcfsdmCFQrE3UkT9" target="_blank" rel="noopener noreferrer" className={styles.heroActionPrimary}>Get Directions</a>
            <Link href="#menu-preview" className={styles.heroActionSecondary}>Menu Coming Soon</Link>
          </div>
        </div>
      </section>

      <section className={styles.actionStripSection} aria-label="Store quick links">
        <div className={styles.container}>
          <div className={styles.actionStrip}>
            {ACTIONS.map((action) => {
              const content = (
                <>
                  <span className={styles.actionLabel}>{action.label}</span>
                  <span className={styles.actionNote}>{action.note}</span>
                </>
              );
              return action.external ? (
                <a key={action.label} href={action.href} target="_blank" rel="noopener noreferrer" className={styles.actionCard}>{content}</a>
              ) : (
                <Link key={action.label} href={action.href} className={styles.actionCard}>{content}</Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.menuPreviewSection} id="menu-preview" aria-labelledby="menu-preview-title">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.microLabel}>Menu coming soon</span>
            <h2 id="menu-preview-title" className={styles.sectionTitle}>Preview Categories</h2>
            <p className={styles.sectionSubtitle}>{MENU_PREVIEW_NOTICE}</p>
          </div>
          <div className={styles.menuCategoryGrid}>
            {MENU_PREVIEW_CATEGORIES.map((category) => (
              <Link key={category.name} href="/weed-dispensary-toronto" className={styles.menuCategoryCard}>
                <img src={category.banner} alt={`${category.name} category at Fort York Cannabis`} className={styles.menuCategoryImage} />
                <div className={styles.menuCategoryCopy}>
                  <strong>{category.name}</strong>
                  <span>{category.detail}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.storeInfoSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.microLabel}>Downtown Toronto cannabis store</span>
            <h2 className={styles.sectionTitle}>Fort York Cannabis Store</h2>
            <p className={styles.sectionSubtitle}>
              A premium local cannabis store experience for Fort York, CityPlace, the waterfront, King West, and nearby downtown Toronto residents.
            </p>
          </div>
          <div className={styles.storeGrid}>
            <div className={styles.storeCard}>
              <h3 className={styles.storeCardTitle}>Visit Us at 38 Fort York Blvd</h3>
              <p className={styles.storeCardText}>38 Fort York Blvd<br />Toronto, ON M5V 3Z3</p>
            </div>
            <div className={styles.storeCard}>
              <h3 className={styles.storeCardTitle}>Cannabis Store Near CityPlace</h3>
              <p className={styles.storeCardText}>Serving Fort York, CityPlace, waterfront Toronto, King West, and downtown Toronto.</p>
            </div>
            <div className={styles.storeCard}>
              <h3 className={styles.storeCardTitle}>Opening Details Coming Soon</h3>
              <p className={styles.storeCardText}>Phone, hours, license details, pickup, delivery, and the final menu will be added after approval.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.localSection}>
        <div className={styles.container}>
          <div className={styles.localGrid}>
            <img src="/banners/fort_york_district_map.webp" alt="Fort York CityPlace downtown Toronto local area" className={styles.localImage} />
            <div className={styles.localCopy}>
              <span className={styles.microLabel}>Fort York / CityPlace / Waterfront</span>
              <h2 className={styles.sectionTitle}>Built Around Downtown Toronto Movement</h2>
              <p className={styles.sectionSubtitle}>
                Fort York Boulevard connects CityPlace residents, waterfront routes, King West traffic, and downtown Toronto visitors. The site keeps that local context front and center.
              </p>
              <div className={styles.localList}>
                {LOCAL_FEATURES.map((feature) => (
                  <div key={feature.label} className={styles.localListItem}>
                    <strong>{feature.label}</strong>
                    <span>{feature.body}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.visitSection}>
        <div className={styles.container}>
          <div className={styles.visitPanel}>
            <div>
              <span className={styles.microLabel}>Plan your visit</span>
              <h2 className={styles.sectionTitle}>Directions Ready. Menu Coming Soon.</h2>
              <p className={styles.sectionSubtitle}>
                Use the map link for directions to 38 Fort York Blvd. Phone, hours, pickup, delivery, and final menu details are coming soon.
              </p>
            </div>
            <div className={styles.visitActions}>
              <a href="https://maps.app.goo.gl/XRcfsdmCFQrE3UkT9" target="_blank" rel="noopener noreferrer" className={styles.ctaButton}>Get Directions</a>
              <Link href="/contact" className={styles.ctaMuted}>Contact & Location</Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.seoSection}>
        <div className={styles.container}>
          <div className={styles.seoPanel}>
            <span className={styles.microLabel}>Local search focus</span>
            <h2 className={styles.seoPanelTitle}>Cannabis Store Near Fort York and CityPlace</h2>
            <p className={styles.seoPanelText}>
              FORT YORK CANNABIS supports local search themes including weed dispensary in Toronto, cannabis store near Fort York, cannabis dispensary near CityPlace, downtown Toronto weed store, and Fort York cannabis store.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.faqContainer}>
          <h2 className={styles.sectionTitle}>Fort York Cannabis FAQ</h2>
          {LOCAL_FAQS.map((faq) => (
            <details key={faq.q} className={styles.faqItem}>
              <summary className={styles.faqQuestion}>{faq.q}</summary>
              <p className={styles.faqAnswer}>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
