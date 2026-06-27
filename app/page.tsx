import Link from "next/link";
import styles from "./page.module.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const MENU_CATEGORIES = [
  { name: "Flower", detail: "Menu coming soon", banner: "/banners/fort_york_flower_banner.webp" },
  { name: "Pre-Rolls", detail: "Selection coming soon", banner: "/banners/fort_york_prerolls_banner.webp" },
  { name: "Edibles", detail: "Details coming soon", banner: "/banners/fort_york_edibles_banner.webp" },
  { name: "Vapes", detail: "Availability coming soon", banner: "/banners/fort_york_vapes_banner.webp" },
  { name: "Concentrates", detail: "Catalog coming soon", banner: "/banners/fort_york_concentrates_banner.webp" },
  { name: "Accessories", detail: "Store setup coming soon", banner: "/banners/fort_york_accessories_banner.webp" },
];

const ACTIONS = [
  { label: "Directions", note: "38 Fort York Blvd", href: "https://maps.app.goo.gl/XRcfsdmCFQrE3UkT9", external: true },
  { label: "Menu", note: "Coming soon", href: "#menu-status" },
  { label: "Phone", note: "Pending confirmation", href: "/contact" },
  { label: "Visit", note: "Downtown Toronto", href: "/weed-dispensary-toronto" },
];

const LOCAL_FEATURES = [
  { label: "Fort York Cannabis Store", body: "Located at 38 Fort York Blvd with local relevance for Fort York residents and nearby visitors." },
  { label: "Cannabis Store Near CityPlace", body: "Built for CityPlace, waterfront Toronto, King West, and downtown condo-area shoppers." },
  { label: "Downtown Toronto Location", body: "Clear directions, simple store information, and future menu browsing without unsupported claims." },
];

const LOCAL_FAQS = [
  {
    q: "Where is FORT YORK CANNABIS located?",
    a: "FORT YORK CANNABIS is planned for 38 Fort York Blvd, Toronto, ON M5V 3Z3, Canada.",
  },
  {
    q: "What are the store hours?",
    a: "Hours are pending owner confirmation. The site does not claim live-hours, late-night, or unverified extended-hours service.",
  },
  {
    q: "What phone number should customers call?",
    a: "Phone is pending owner confirmation. No public phone number is published until confirmed.",
  },
  {
    q: "What neighbourhoods does the site focus on?",
    a: "The local focus is Fort York, CityPlace, Downtown Toronto, the waterfront, King West, and the Entertainment District.",
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
            alt="FORT YORK CANNABIS local store banner"
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
            <div className={styles.heroActions}>
              <a href="https://maps.app.goo.gl/XRcfsdmCFQrE3UkT9" target="_blank" rel="noopener noreferrer" className={styles.heroActionPrimary}>Get Directions</a>
              <Link href="/weed-dispensary-toronto" className={styles.heroActionSecondary}>Toronto Store Page</Link>
            </div>
          </div>

          <div className={styles.bentoGrid} id="menu-status">
            {MENU_CATEGORIES.map((cat, index) => (
              <Link
                key={cat.name}
                href="/weed-dispensary-toronto"
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

      <section className={styles.actionStripSection} aria-label="Customer actions">
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

      <section className={styles.categoriesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.microLabel}>Local cannabis store</span>
            <h2 className={styles.sectionTitle}>Fort York Cannabis Store</h2>
            <p className={styles.sectionSubtitle}>
              A modern downtown Toronto cannabis store for Fort York, CityPlace, the waterfront, King West, and nearby residents.
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
              <h3 className={styles.storeCardTitle}>Menu Coming Soon</h3>
              <p className={styles.storeCardText}>Menu, phone, hours, license information, pickup, and delivery are pending owner confirmation.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.visualSection}>
        <div className={styles.container}>
          <div className={styles.visualGrid}>
            <div className={styles.visualImageCard}>
              <img src="/banners/fort_york_district_map.webp" alt="Fort York CityPlace downtown Toronto local area" className={styles.visualImage} />
            </div>
            <div className={styles.visualCopy}>
              <span className={styles.microLabel}>Downtown Toronto location</span>
              <h2 className={styles.sectionTitle}>Built Around Fort York, CityPlace, and the Waterfront</h2>
              <p className={styles.sectionSubtitle}>
                FORT YORK CANNABIS is positioned for adults 19+ around Fort York Boulevard, CityPlace, waterfront Toronto, King West, and nearby downtown routes.
              </p>
              <div className={styles.visualList}>
                {LOCAL_FEATURES.map((feature) => (
                  <div key={feature.label} className={styles.visualListItem}>
                    <strong>{feature.label}</strong>
                    <span>{feature.body}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaPreviewSection}>
        <div className={styles.container}>
          <div className={styles.ctaPreview}>
            <img src="/banners/fort_york_cta_panel.webp" alt="Fort York Cannabis call directions menu visit actions" className={styles.ctaImage} />
            <div className={styles.ctaContent}>
              <span className={styles.microLabel}>Plan your visit</span>
              <h2 className={styles.sectionTitle}>Call / Directions / Menu</h2>
              <p className={styles.sectionSubtitle}>
                Directions are ready now. Phone, menu, hours, pickup, delivery, and license information will be published after owner confirmation.
              </p>
              <div className={styles.ctaActions}>
                <Link href="/contact" className={styles.ctaButton}>Contact and Location</Link>
                <Link href="/weed-dispensary-toronto" className={styles.ctaMuted}>Toronto Store Page</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.seoSection}>
        <div className={styles.container}>
          <div className={styles.seoPanel}>
            <h2 className={styles.seoPanelTitle}>Cannabis Store Near Fort York and CityPlace</h2>
            <p className={styles.seoPanelText}>
              FORT YORK CANNABIS is being prepared as a local cannabis store for adults 19+ at 38 Fort York Blvd in Toronto. The site is structured around local search themes including weed dispensary in Toronto, cannabis store near Fort York, cannabis dispensary near CityPlace, downtown Toronto weed store, and Fort York cannabis store.
            </p>
            <p className={styles.seoPanelText}>
              Customer details stay clear and honest: phone, hours, live-hours language, extended-hours claims, reviews, ratings, delivery claims, and license wording are not published until confirmed.
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
              <h3 className={styles.storeCardTitle}>Hours Pending Confirmation</h3>
              <p className={styles.storeCardText}>Hours will be published after owner confirmation.</p>
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
