import Link from "next/link";
import styles from "./page.module.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const MENU_CATEGORIES = [
  { name: "Flower", detail: "Menu pending owner input", banner: "/banners/fort_york_flower_banner.webp" },
  { name: "Pre-Rolls", detail: "Selection pending owner input", banner: "/banners/fort_york_prerolls_banner.webp" },
  { name: "Edibles", detail: "Details pending owner input", banner: "/banners/fort_york_edibles_banner.webp" },
  { name: "Vapes", detail: "Availability pending owner input", banner: "/banners/fort_york_vapes_banner.webp" },
  { name: "Concentrates", detail: "Catalog pending owner input", banner: "/banners/fort_york_concentrates_banner.webp" },
  { name: "Accessories", detail: "Store setup pending owner input", banner: "/banners/fort_york_accessories_banner.webp" },
];

const LOCAL_FAQS = [
  {
    q: "Where is FORT YORK CANNABIS located?",
    a: "FORT YORK CANNABIS is planned for 38 Fort York Blvd, Toronto, ON M5V 3Z3, Canada.",
  },
  {
    q: "What are the store hours?",
    a: "Store hours are PENDING_OWNER_INPUT. The site does not claim live-hours, late-night, or unverified extended-hours service until hours are verified.",
  },
  {
    q: "What phone number should customers call?",
    a: "The public phone number is PENDING_OWNER_INPUT. No phone number is published until the owner confirms it.",
  },
  {
    q: "What neighbourhoods does the site focus on?",
    a: "The local SEO focus is Fort York, CityPlace, Downtown Toronto, the waterfront, King West, and the Entertainment District.",
  },
];

export default function HomePage() {
  return (
    <main className={styles.main}>
      <Navbar />

      <section className={styles.welcomeBannerSection}>
        <div className={styles.welcomeBannerContainer}>
          <img
            src="/banners/fort_york_welcome_banner.webp"
            alt="FORT YORK CANNABIS local storefront banner"
            className={styles.welcomeBannerImg}
          />
        </div>
      </section>

      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroStars} />
        <div className={styles.heroContent}>
          <div className={styles.brandBlock}>
            <span className={styles.brandIcon}>FYC</span>
            <h1 className={styles.brandTitle}>FORT YORK CANNABIS</h1>
            <p className={styles.brandSub}>Cannabis store near Fort York, CityPlace, and downtown Toronto</p>
            <div className={styles.brandBadge}>38 Fort York Blvd</div>
          </div>

          <div className={styles.bentoGrid} id="menu-status">
            {MENU_CATEGORIES.map((cat, index) => (
              <Link
                key={cat.name}
                href="/weed-dispensary-toronto/"
                className={`${styles.bentoTile} ${index === 0 ? styles.bentoExotic : index === 1 ? styles.bentoPremium : ""}`}
              >
                <div
                  className={styles.bentoTileBg}
                  style={{ backgroundImage: `url('${cat.banner}')` }}
                />
                <div className={styles.bentoTileOverlay} />
                <div className={styles.bentoTileContent}>
                  <span className={styles.bentoLabel}>{cat.name}</span>
                  <span className={styles.bentoPrice}>{cat.detail}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.categoriesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Downtown Toronto Launch Direction</h2>
            <p className={styles.sectionSubtitle}>
              A polished Fort York / CityPlace cannabis storefront with heritage-fort geometry, waterfront tones, and clean downtown energy.
            </p>
          </div>
          <div className={styles.storeGrid}>
            <div className={styles.storeCard}>
              <h3 className={styles.storeCardTitle}>Confirmed Address</h3>
              <p className={styles.storeCardText}>38 Fort York Blvd<br />Toronto, ON M5V 3Z3</p>
            </div>
            <div className={styles.storeCard}>
              <h3 className={styles.storeCardTitle}>Local Focus</h3>
              <p className={styles.storeCardText}>Fort York, CityPlace, waterfront Toronto, King West, and downtown residents.</p>
            </div>
            <div className={styles.storeCard}>
              <h3 className={styles.storeCardTitle}>Pending Facts</h3>
              <p className={styles.storeCardText}>Phone, hours, license language, delivery status, and menu are PENDING_OWNER_INPUT.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.seoSection}>
        <div className={styles.container}>
          <div className={styles.seoPanel}>
            <h2 className={styles.seoPanelTitle}>Cannabis Store Near Fort York and CityPlace</h2>
            <p className={styles.seoPanelText}>
              FORT YORK CANNABIS is being prepared as a local cannabis store for adults 19+ at 38 Fort York Blvd in Toronto. The site is structured around safe local search themes including weed dispensary in Toronto, cannabis store near Fort York, cannabis dispensary near CityPlace, downtown Toronto weed store, and Fort York cannabis store.
            </p>
            <p className={styles.seoPanelText}>
              The launch content is intentionally careful: it does not publish phone, hours, live-hours language, unverified extended-hours claims, reviews, ratings, delivery claims, or license wording until those facts are confirmed by the owner.
            </p>
            <p className={styles.seoPanelText}>
              The first-pass creative direction uses Fort York heritage-wall shapes, CityPlace high-rise energy, and a waterfront night palette so the site feels local to downtown Toronto without copying the FORT YORK brand.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.faqContainer}>
          <h2 className={styles.sectionTitle} style={{ textAlign: "center", marginBottom: "32px" }}>
            Fort York Cannabis FAQ
          </h2>
          {LOCAL_FAQS.map((faq) => (
            <details key={faq.q} className={styles.faqItem}>
              <summary className={styles.faqQuestion}>{faq.q}</summary>
              <p className={styles.faqAnswer}>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={styles.storeSection} id="contact">
        <div className={styles.container}>
          <div className={styles.storeGrid}>
            <div className={styles.storeCard}>
              <span className={styles.storeIcon}>38</span>
              <h3 className={styles.storeCardTitle}>Location</h3>
              <p className={styles.storeCardText}>38 Fort York Blvd<br />Toronto, ON M5V 3Z3</p>
            </div>
            <div className={styles.storeCard}>
              <span className={styles.storeIcon}>HRS</span>
              <h3 className={styles.storeCardTitle}>Hours</h3>
              <p className={styles.storeCardText}>PENDING_OWNER_INPUT</p>
            </div>
            <div className={styles.storeCard}>
              <span className={styles.storeIcon}>MAP</span>
              <h3 className={styles.storeCardTitle}>Directions</h3>
              <p className={styles.storeCardText}>
                <a href="https://maps.app.goo.gl/XRcfsdmCFQrE3UkT9" target="_blank" rel="noopener noreferrer">Open Google Maps</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
