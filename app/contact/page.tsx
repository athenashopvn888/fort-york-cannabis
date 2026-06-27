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
      <section className={styles.hero} style={{ paddingTop: "92px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <img src="/banners/fort_york_contact_banner.webp" alt="Contact FORT YORK CANNABIS" style={{ width: "100%", height: "auto", display: "block", borderRadius: "8px" }} />
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
            <a href="https://maps.app.goo.gl/XRcfsdmCFQrE3UkT9" target="_blank" rel="noopener noreferrer" className={styles.openBadge}>Open Google Maps</a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
