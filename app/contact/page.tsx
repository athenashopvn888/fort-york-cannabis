import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact FORT YORK CANNABIS | 38 Fort York Blvd, Toronto",
  description:
    "Contact page for FORT YORK CANNABIS at 38 Fort York Blvd in Toronto. Phone and hours are pending owner confirmation.",
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
            <p>Local storefront preview for 38 Fort York Blvd in Toronto. Phone, hours, and launch details remain pending owner input.</p>
          </div>
          <img src="/banners/fort_york_contact_banner.webp" alt="Contact FORT YORK CANNABIS" className={styles.heroImage} />
        </div>
      </section>
      <section className={styles.infoSection}>
        <div className={styles.container}>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>38</div>
              <h2 className={styles.infoTitle}>Location</h2>
              <p className={styles.infoText}>38 Fort York Blvd<br />Toronto, ON M5V 3Z3<br /><span className={styles.infoMuted}>Fort York / CityPlace</span></p>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>HRS</div>
              <h2 className={styles.infoTitle}>Hours</h2>
              <p className={styles.infoText}>PENDING_OWNER_INPUT</p>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>TEL</div>
              <h2 className={styles.infoTitle}>Phone</h2>
              <p className={styles.infoText}>PENDING_OWNER_INPUT</p>
            </div>
          </div>
          <div className={styles.mapSection}>
            <div className={styles.mapCopy}>
              <span className={styles.microLabel}>Map and visit actions</span>
              <h2 className={styles.infoTitle}>Find the Store</h2>
              <p className={styles.infoText}>The provided Google Maps link is ready for owner review. No GBP edits or live-service updates have been made.</p>
              <a href="https://maps.app.goo.gl/XRcfsdmCFQrE3UkT9" target="_blank" rel="noopener noreferrer" className={styles.openBadge}>Open Google Maps</a>
            </div>
            <img src="/banners/fort_york_district_map.webp" alt="Fort York CityPlace local area concept" className={styles.mapImage} />
          </div>
          <div className={styles.storefrontPanel}>
            <img src="/banners/fort_york_storefront_preview.webp" alt="FORT YORK CANNABIS storefront visual preview" className={styles.storefrontImage} />
            <div className={styles.storefrontCopy}>
              <span className={styles.microLabel}>Storefront preview</span>
              <h2 className={styles.infoTitle}>Retail-Ready Direction</h2>
              <p className={styles.infoText}>Main sign, door 19+, window vinyl, menu QR placeholder, and hours decal concepts are prepared for visual review only. Final production art still needs approval.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
