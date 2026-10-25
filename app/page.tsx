import { SHOW_CIGARETTES, cigaretteSafeContent } from "./lib/siteConfig";
import Link from "next/link";
import styles from "./page.module.css";
import Navbar from "./components/Navbar";
import FleetAnnouncementBanner from "./components/FleetAnnouncementBanner";
import Footer from "./components/Footer";
import { getCigaretteSnapshot } from "./lib/cigaretteFeed";
import { getFleetContent } from "./lib/fleetContent";
import { MENU_CATALOG_CATEGORIES, MENU_CATALOG_NOTICE, MENU_SOURCE_STATE } from "./lib/menu-catalog";

const ACTIONS = [
  { label: "Address", note: "38 Fort York Blvd", href: "/contact" },
  { label: "Directions", note: "Open Google Maps", href: "https://maps.app.goo.gl/XRcfsdmCFQrE3UkT9", external: true },
  { label: "Menu", note: "Browse Menu", href: "/menu" },
  { label: "Hours", note: "Open 24 hours", href: "/contact" },
];

const LOCAL_FEATURES = [
  { label: "Five tiers", body: "Flower runs Exotic, Premium, AAA+, AA and Budget. Exotic, Premium and AAA+ come in a 6g pack. AA is the only tier with a true 5g." },
  { label: "In-store offer", body: "The in-store free-gram offer applies to Exotic, Premium and AAA+ only: Buy 2g Get 1g FREE · Buy 3g Get 3g FREE (6g)." },
  { label: "The counter", body: "Aroma, lineage, cure and format are fair questions. Effects and health claims are not. Adults 19+." },
];

const LOCAL_FAQS = cigaretteSafeContent([
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
    a: "It shows what's listed today. Jars rotate, so a listing isn't a promise.",
  },
  {
    q: "Do you have strain guides?",
    a: "Yes. Strain guides are on the guides page.",
  },
  {
    q: "Is there a free-gram offer?",
    a: "Yes, in store, on Exotic, Premium and AAA+ only. Staff confirm details at the counter.",
  },
  {
    q: "Do you deliver?",
    a: "Yes. Delivery has its own menu and prices and starts at 7g. See the delivery page.",
  },
]);

export default async function HomePage() {
  const [fleet, cigarettes] = await Promise.all([getFleetContent(), getCigaretteSnapshot()]);
  return (
    <main className={styles.main}>
      <Navbar />
      <h1 data-home-store-title="" style={{ margin: 0, padding: "126px 16px 14px", background: "#111827", color: "#ffffff", textAlign: "center", fontSize: "clamp(1.1rem, 3vw, 2rem)", fontWeight: 900, lineHeight: 1.2, position: "relative", zIndex: 60 }}>Fort York Cannabis Dispensary Weed Delivery</h1>
      <FleetAnnouncementBanner fleet={fleet} showCigs={cigarettes.web.show} />

      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.heroKicker}>Fort York / CityPlace</span>
          <p className={styles.brandSub}>Five flower tiers, vapes, pre-rolls and edibles. Adults 19+.</p>
          <p className={styles.localLine}>38 Fort York Blvd, Toronto. Open 24 hours.</p>
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

      <section className={styles.authoritySection} aria-labelledby="local-guides-heading">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.microLabel}>Fort York local guides</span>
            <h2 id="local-guides-heading" className={styles.sectionTitle}>Plan the right downtown stop</h2>
            <p className={styles.sectionSubtitle}>Open 24 hours. Use the menu, the top shelf, and the visit map.</p>
          </div>
          <div className={styles.authorityGrid}>
            {[
              ["Weed dispensary on Fort York Boulevard", "/weed-dispensary-fort-york"],
              ["Open 24 hours, seven days", "/24-hour-fort-york-dispensary"],
              ["Weed delivery information", "/delivery"],
              ...(SHOW_CIGARETTES ? [["Native cigarettes near CityPlace", "/native-cigarettes-fort-york"] as const] : []),
              ["Open the menu", "/menu"],
              ["See Exotic", "/exotic"],
              ["Map and a first visit", "/visit"],
            ].map(([label, href]) => <Link key={href} href={href} className={styles.authorityCard}>{label}<span>→</span></Link>)}
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
              A walk-in counter for adults 19+. Five flower tiers, a vape wall, pre-rolls and edibles, and staff who will tell you the difference.
            </p>
          </div>
          <div className={styles.storeGrid}>
            <div className={styles.storeCard}>
              <h3 className={styles.storeCardTitle}>Visit Us at 38 Fort York Blvd</h3>
              <p className={styles.storeCardText}>38 Fort York Blvd<br />Toronto, ON M5V 3Z3</p>
            </div>
            <div className={styles.storeCard}>
              <h3 className={styles.storeCardTitle}>Cannabis Store Near CityPlace</h3>
              <p className={styles.storeCardText}>Exotic, Premium and AAA+ come in a 6g pack. The in-store free-gram offer applies to those three tiers only. AA is the only tier with a true 5g.</p>
            </div>
            <div className={styles.storeCard}>
              <h3 className={styles.storeCardTitle}>Store Details</h3>
              <p className={styles.storeCardText}>Phone 437-783-2511. Open 24 hours at 38 Fort York Blvd.</p>
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
                Flower runs Exotic, Premium, AAA+, AA and Budget. Ask about aroma, lineage, cure and format. The menu is what is listed today.
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
                Use the map link for directions to 38 Fort York Blvd. Phone is 437-783-2511. Open 24 hours.
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
              Aroma, lineage, cure, format and how to store it: ask away. Effects and health claims are not from us. Buyers must be 19+. Staff ask for government photo ID from anyone who looks under 25. Open 24 hours.
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
