import Link from "next/link";
import styles from "./GBPLandingPage.module.css";
import { gbpLocation, isKnown, pendingLabel } from "../lib/gbp-location";

const categoryLinks: Record<string, string> = {
  Flower: "/#menu-status",
  "Pre-rolls": "/#menu-status",
  Edibles: "/#menu-status",
  "THC vapes": "/#menu-status",
  Concentrates: "/#menu-status",
  Accessories: "/#menu-status",
};

const trustItems = [
  { label: "Address", value: "38 Fort York Blvd" },
  { label: "Area", value: "Fort York / CityPlace" },
  { label: "Menu", value: "Coming soon" },
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
          <span className={styles.microLabel}>Toronto cannabis store</span>
          <h1 className={styles.h1}>{gbpLocation.storeName} - Weed Dispensary in {gbpLocation.city}</h1>
          <p className={styles.heroTagline}>Serving Fort York, CityPlace, the waterfront, and downtown Toronto</p>
        </div>
        <img src="/banners/fort_york_gbp_landing_hero.webp" alt="Fort York Cannabis local landing page" className={styles.heroImage} />
      </header>

      <div className={styles.btnRow}>
        <Link href={gbpLocation.menuUrl} className={`${styles.btn} ${styles.btnPrimary}`}>
          Menu Coming Soon
        </Link>
        <a href={gbpLocation.directionsUrl} className={`${styles.btn} ${styles.btnSecondary}`} target="_blank" rel="noopener noreferrer">
          Get Directions
        </a>
      </div>

      <section className={styles.launchPanel}>
        <div>
          <span className={styles.microLabel}>Store information</span>
          <h2 className={styles.h2}>Fort York Cannabis Store</h2>
          <p className={styles.infoText}>FORT YORK CANNABIS is planned for 38 Fort York Blvd in downtown Toronto. Phone, hours, menu, pickup, delivery, and license information are pending owner confirmation.</p>
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
        <img src="/banners/fort_york_district_map.webp" alt="Fort York CityPlace downtown Toronto local area map" className={styles.mediaImage} />
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

      <section className={styles.section}>
        <h2 className={styles.h2}>Menu Coming Soon</h2>
        <p className={styles.infoText}>
          FORT YORK CANNABIS is prepared for a full product menu structure, but exact inventory, pricing, brands, and availability are pending owner confirmation.
        </p>
        <div className={styles.productGrid}>
          {gbpLocation.products.map((p) => {
            const href = categoryLinks[p] || "/#menu-status";
            return (
              <Link key={p} href={href} className={styles.productCard}>
                {p}
              </Link>
            );
          })}
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
              <span>{pendingLabel}</span>
            </div>
            <div className={styles.napItem}>
              <span className={styles.napLabel}>Website</span>
              <span><a href={`https://${gbpLocation.domain}/`}>https://{gbpLocation.domain}/</a></span>
            </div>
            <div className={styles.napItem}>
              <span className={styles.napLabel}>Store Hours</span>
              <span style={{ fontSize: "0.95rem" }}>{pendingLabel}</span>
            </div>
            <div className={styles.napItem}>
              <span className={styles.napLabel}>Google Maps</span>
              <a href={gbpLocation.directionsUrl} target="_blank" rel="noopener noreferrer">Open map</a>
            </div>
          </div>
          <div className={styles.mapWrapper}>
            <img src="/banners/fort_york_local_banner.webp" alt="Fort York and CityPlace cannabis store local area" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>Call / Directions / Menu</h2>
        <p className={styles.infoText}>
          Directions are available now. Phone number, full menu, pickup, and delivery details will be published after owner confirmation.
        </p>
        <img src="/banners/fort_york_cta_panel.webp" alt="Fort York Cannabis customer actions" className={styles.fullImage} />
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>Frequently Asked Questions</h2>
        <div className={styles.faqList}>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>Where is {gbpLocation.storeName} located?</h3>
            <p className={styles.faqAnswer}>{gbpLocation.storeName} is planned for {gbpLocation.address}.</p>
          </div>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>Are store hours confirmed?</h3>
            <p className={styles.faqAnswer}>No. Hours are pending owner confirmation, so this page avoids live-hours and unverified extended-hours claims.</p>
          </div>
          <div className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>Is the menu live?</h3>
            <p className={styles.faqAnswer}>No. Menu, brands, pricing, inventory, delivery, and pickup details are pending owner confirmation.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
