import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact FORT YORK CANNABIS | 38 Fort York Blvd, Toronto",
  description:
    "Contact page for FORT YORK CANNABIS at 38 Fort York Blvd in Toronto. Phone is 437-872-8446. Hours are 11AM-2AM.",
  alternates: {
    canonical: "https://fortyorkcannabis.com/contact",
  },
};

export default function ContactPage() {
  return (
    <main className={styles.main}>
      <Navbar />
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <span className={styles.microLabel}>Contact and location</span>
            <h1>FORT YORK CANNABIS</h1>
            <p>Visit us at 38 Fort York Blvd in Toronto. Phone is 437-872-8446. Open 11AM-2AM. Pickup and delivery details will be posted when available.</p>
          </div>
          <img src="/banners/fort_york_hero_banner.webp" alt="FORT YORK CANNABIS storefront banner" className={styles.heroImage} />
        </div>
      </section>
      <section className={styles.infoSection}>
        <div className={styles.container}>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>38</div>
              <h2 className={styles.infoTitle}>Visit Us at 38 Fort York Blvd</h2>
              <p className={styles.infoText}>38 Fort York Blvd<br />Toronto, ON M5V 3Z3<br /><span className={styles.infoMuted}>Fort York / CityPlace</span></p>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>HRS</div>
              <h2 className={styles.infoTitle}>Store Hours</h2>
              <p className={styles.infoText}>Open 11AM-2AM.</p>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>TEL</div>
              <h2 className={styles.infoTitle}>Phone</h2>
              <p className={styles.infoText}>437-872-8446.</p>
            </div>
          </div>
          <div className={styles.mapSection}>
            <div className={styles.mapCopy}>
              <span className={styles.microLabel}>Downtown Toronto location</span>
              <h2 className={styles.infoTitle}>Find the Store</h2>
              <p className={styles.infoText}>FORT YORK CANNABIS is located for Fort York, CityPlace, waterfront Toronto, and nearby downtown routes.</p>
              <a href="https://maps.app.goo.gl/XRcfsdmCFQrE3UkT9" target="_blank" rel="noopener noreferrer" className={styles.openBadge}>Open Google Maps</a>
            </div>
            <img src="/brand/local-area-waterfront.webp" alt="Fort York CityPlace local area" className={styles.mapImage} />
          </div>
          <div className={styles.customerPanel}>
            <img src="/brand/visit-cta-banner.webp" alt="FORT YORK CANNABIS customer actions" className={styles.customerImage} />
            <div className={styles.customerCopy}>
              <span className={styles.microLabel}>Store information</span>
              <h2 className={styles.infoTitle}>Call / Directions / Menu</h2>
              <p className={styles.infoText}>Directions, phone, hours, and menu browsing are ready now. Pickup, delivery, and license-specific details will be added once ready.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
