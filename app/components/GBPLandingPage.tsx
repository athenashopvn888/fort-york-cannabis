import Link from "next/link";
import styles from "./GBPLandingPage.module.css";
import { gbpLocation, isKnown } from "../lib/gbp-location";
import { MENU_CATALOG_CATEGORIES, MENU_CATALOG_NOTICE, MENU_SOURCE_STATE } from "../lib/menu-catalog";

const trustItems = [
  { label: "Address", value: "38 Fort York Blvd" },
  { label: "Area", value: "Fort York / CityPlace" },
  { label: "Menu", value: "Browse Menu" },
];

export function GBPLandingPage() {
  type StoreSchema = {
    "@context": "https://schema.org";
    "@type": "Store";
    name: string;
    url: string;
    hasMap: string;
    address: {
      "@type": "PostalAddress";
      streetAddress: string;
      addressLocality: string;
      addressRegion: string;
      postalCode: string;
      addressCountry: string;
    };
    telephone?: string;
    openingHours?: string[];
    geo?: {
      "@type": "GeoCoordinates";
      latitude: number;
      longitude: number;
    };
  };

  const schemaMarkup: StoreSchema = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: gbpLocation.storeName,
    url: `https://${gbpLocation.domain}/${gbpLocation.slug}/`,
    hasMap: gbpLocation.directionsUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: gbpLocation.streetAddress,
      addressLocality: gbpLocation.city,
      addressRegion: gbpLocation.province,
      postalCode: gbpLocation.postalCode,
      addressCountry: gbpLocation.country,
    },
  };

  if (isKnown(gbpLocation.phoneIntl)) {
    schemaMarkup.telephone = gbpLocation.phoneIntl;
  }

  if (gbpLocation.hours.some(isKnown)) {
    schemaMarkup.openingHours = gbpLocation.hours.filter(isKnown);
  }

  if (isKnown(gbpLocation.latitude) && isKnown(gbpLocation.longitude)) {
    schemaMarkup.geo = {
      "@type": "GeoCoordinates",
      latitude: Number(gbpLocation.latitude),
      longitude: Number(gbpLocation.longitude),
    };
  }

  return (
    <div className={styles.container}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <header className={styles.hero}>
        <div className={styles.heroText}>
          <span className={styles.microLabel}>Fort York / CityPlace</span>
          <h1 className={styles.h1}>{gbpLocation.storeName}</h1>
          <p className={styles.heroTagline}>Cannabis Store Near Fort York & CityPlace</p>
          <p className={styles.addressLine}>38 Fort York Blvd, Toronto</p>
          <div className={styles.heroActions}>
            <a href={gbpLocation.directionsUrl} className={`${styles.btn} ${styles.btnPrimary}`} target="_blank" rel="noopener noreferrer">
              Get Directions
            </a>
            <Link href="/menu" className={`${styles.btn} ${styles.btnSecondary}`}>
              Browse Menu
            </Link>
          </div>
        </div>
        <div className={styles.heroMedia}>
          <picture className={styles.heroPicture}>
            <source media="(max-width: 760px)" srcSet="/brand/hero-gbp-landing-mobile.webp" />
            <img src="/brand/hero-gbp-landing-desktop.webp" alt="Fort York Cannabis near CityPlace and downtown Toronto" className={styles.heroImage} />
          </picture>
        </div>
      </header>

      <section className={styles.launchPanel}>
        <div>
          <span className={styles.microLabel}>Store information</span>
          <h2 className={styles.h2}>Fort York Cannabis Store</h2>
          <p className={styles.infoText}>Find FORT YORK CANNABIS at 38 Fort York Blvd in downtown Toronto. Phone 437-783-2511. Open 11AM-2AM at 38 Fort York Blvd. Pickup and delivery details will be posted when available.</p>
        </div>
        <div className={styles.trustGrid}>
          {trustItems.map((item) => (
            <div key={item.label} className={styles.trustCard}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>Cannabis Store Near Fort York</h2>
        <p className={styles.introText}>{gbpLocation.introVariant}</p>
      </section>

      <section className={styles.mediaSection}>
        <img src="/brand/local-area-waterfront.webp" alt="Fort York CityPlace downtown Toronto local area map" className={styles.mediaImage} />
        <div className={styles.mediaCopy}>
          <span className={styles.microLabel}>Local area</span>
          <h2 className={styles.h2}>{gbpLocation.sectionTitle}</h2>
          <p className={styles.infoText}>{gbpLocation.neighborhoodDescription} {gbpLocation.transitNote}</p>
          <div className={styles.areaList}>
            {gbpLocation.nearbyAreas.map((area) => (
              <span key={area} className={styles.areaTag}>{area}</span>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} id="menu">
        <h2 className={styles.h2}>Menu</h2>
        <p className={styles.infoText}>{MENU_CATALOG_NOTICE}</p>
        <p className={styles.menuStatusLine}>Open 11AM-2AM - {MENU_SOURCE_STATE.productCount} menu items</p>
        <nav className={styles.menuRail} aria-label="Menu categories">
          {MENU_CATALOG_CATEGORIES.map((category) => (
            <Link key={category.name} href={category.href}>{category.name}</Link>
          ))}
        </nav>
        <div className={styles.productGrid}>
          {MENU_CATALOG_CATEGORIES.map((category) => (
            <Link key={category.name} href={category.href} className={styles.productCard}>
              <img src={category.banner} alt={`${category.name} category at Fort York Cannabis`} className={styles.productImage} />
              <div className={styles.productCopy}>
                <strong>{category.name}</strong>
                <span>{category.detail}</span>
                <em>{category.count} items</em>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>Visit {gbpLocation.storeName} in {gbpLocation.city}</h2>
        <div className={styles.napGrid}>
          <div className={styles.napDetails}>
            <div className={styles.napItem}>
              <span className={styles.napLabel}>Store Name</span>
              <strong>{gbpLocation.storeName}</strong>
            </div>
            <div className={styles.napItem}>
              <span className={styles.napLabel}>Address</span>
              <span>{gbpLocation.address}</span>
            </div>
            <div className={styles.napItem}>
              <span className={styles.napLabel}>Phone</span>
              <span>437-783-2511</span>
            </div>
            <div className={styles.napItem}>
              <span className={styles.napLabel}>Store Hours</span>
              <span>11AM-2AM</span>
            </div>
            <div className={styles.napItem}>
              <span className={styles.napLabel}>Google Maps</span>
              <a href={gbpLocation.directionsUrl} target="_blank" rel="noopener noreferrer">Open map</a>
            </div>
          </div>
          <div className={styles.mapWrapper}>
            <img src="/brand/local-area-waterfront.webp" alt="Fort York and CityPlace cannabis store local area" className={styles.mapImage} />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>Frequently Asked Questions</h2>
        <div className={styles.faqList}>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>Where is {gbpLocation.storeName} located?</h3>
            <p className={styles.faqAnswer}>{gbpLocation.storeName} is at {gbpLocation.address}.</p>
          </div>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>Are store hours available?</h3>
            <p className={styles.faqAnswer}>Open 11AM-2AM daily.</p>
          </div>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>Can I browse the menu?</h3>
            <p className={styles.faqAnswer}>Yes. Browse flower, pre-rolls, vapes, edibles, concentrates, and accessories from the menu.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
