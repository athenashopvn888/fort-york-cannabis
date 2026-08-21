import Link from "next/link";
import styles from "./page.module.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { MENU_CATALOG_CATEGORIES, MENU_CATALOG_NOTICE, MENU_SOURCE_STATE } from "./lib/menu-catalog";

const ACTIONS = [
  { label: "Address", note: "38 Fort York Blvd", href: "/contact" },
  { label: "Directions", note: "Open Google Maps", href: "https://maps.app.goo.gl/XRcfsdmCFQrE3UkT9", external: true },
  { label: "Menu", note: "Browse Menu", href: "/menu" },
  { label: "Hours", note: "Open 24 hours", href: "/contact" },
];

const LOCAL_FEATURES = [
  { label: "Fort York", body: "A local cannabis store page centered on Fort York Boulevard and nearby downtown routes." },
  { label: "CityPlace", body: "Helpful store information for adults 19+ around CityPlace, the waterfront, and condo-area foot traffic." },
  { label: "Downtown Toronto", body: "Simple directions, clean local context, and quick access to the Fort York menu." },
];

const LOCAL_FAQS = [
  {
    q: "Where is FORT YORK CANNABIS located?",
    a: "FORT YORK CANNABIS is at 38 Fort York Blvd, Toronto, ON M5V 3Z3, Canada.",
  },
  {
    q: "What are the store hours?",
    a: "Open 24 hours, seven days a week.",
  },
  {
    q: "Is the menu live?",
    a: "Yes. Browse flower, pre-rolls, vapes, edibles, concentrates, and accessories from the menu.",
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
            <Link href="/menu" className={styles.heroActionSecondary}>Browse Menu</Link>
          </div>
        </div>
      </section>

      <section className={styles.hiringCallout} aria-label="Hiring at FORT YORK CANNABIS">
        <div className={styles.hiringCalloutInner}>
          <div>
            <span className={styles.hiringEyebrow}>Budtenders / Managers Wanted</span>
            <h2>Join Fort York</h2>
            <p>Fort York Cannabis is taking online applications for budtender and manager roles. We are looking for motivated, reliable people who can handle downtown customer flow. Online applications only. Please do not call the store about hiring.</p>
          </div>
          <Link href="/careers/budtender" className={styles.hiringButton}>Apply Online</Link>
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

      <section className={styles.menuSection} id="menu" aria-labelledby="menu-title">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.microLabel}>Menu</span>
            <h2 id="menu-title" className={styles.sectionTitle}>Explore Categories</h2>
            <p className={styles.sectionSubtitle}>{MENU_CATALOG_NOTICE}</p>
            <p className={styles.menuSourcePill}>Open 24 hours - {MENU_SOURCE_STATE.productCount} menu items</p>
          </div>
          <nav className={styles.menuToolbar} aria-label="Menu categories">
            {MENU_CATALOG_CATEGORIES.map((category) => (
              <Link key={category.name} href={category.href}>{category.name}</Link>
            ))}
          </nav>
          <div className={styles.menuCategoryGrid}>
            {MENU_CATALOG_CATEGORIES.map((category) => (
              <Link key={category.name} href={category.href} className={styles.menuCategoryCard}>
                <img src={category.banner} alt={`${category.name} category at Fort York Cannabis`} className={styles.menuCategoryImage} />
                <div className={styles.menuCategoryCopy}>
                  <strong>{category.name}</strong>
                  <span>{category.detail}</span>
                  <em>{category.count} items</em>
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
              <h3 className={styles.storeCardTitle}>Store Details</h3>
              <p className={styles.storeCardText}>Phone 437-783-2511. Open 24 hours at 38 Fort York Blvd. Pickup and delivery details will be posted when available.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.localSection}>
        <div className={styles.container}>
          <div className={styles.localGrid}>
            <img src="/brand/local-area-waterfront.webp" alt="Fort York CityPlace downtown Toronto local area" className={styles.localImage} />
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
              <h2 className={styles.sectionTitle}>Directions Ready. Menu Ready.</h2>
              <p className={styles.sectionSubtitle}>
                Use the map link for directions to 38 Fort York Blvd. Phone is 437-783-2511. Open 24 hours. Pickup and delivery details will be posted when available.
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
