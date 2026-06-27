import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./delivery.module.css";

export default function DeliveryContent() {
  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.content}>
        <h1 className={styles.pageTitle}>Delivery <span className={styles.highlight}>PENDING_OWNER_INPUT</span></h1>
        <p className={styles.pageSubtitle}>
          Delivery, pickup, ordering, menu availability, and service-area details have not been approved yet for FORT YORK CANNABIS.
        </p>
        <div className={styles.formSection}>
          <h2 className={styles.formTitle}>No Delivery Claim Published Yet</h2>
          <p className={styles.formDesc}>
            This page is intentionally informational only. It does not collect emails, submit forms, call Apps Script, or claim delivery is available.
          </p>
        </div>
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <span className={styles.infoIcon}>1</span>
            <h3 className={styles.infoTitle}>Owner Input Needed</h3>
            <p className={styles.infoDesc}>Delivery status, pickup rules, payment options, and service area are PENDING_OWNER_INPUT.</p>
          </div>
          <div className={styles.infoCard}>
            <span className={styles.infoIcon}>2</span>
            <h3 className={styles.infoTitle}>No Live Form</h3>
            <p className={styles.infoDesc}>The copied Google Sheets / Apps Script signup flow was removed from this local scaffold.</p>
          </div>
          <div className={styles.infoCard}>
            <span className={styles.infoIcon}>3</span>
            <h3 className={styles.infoTitle}>Safe Launch Copy</h3>
            <p className={styles.infoDesc}>No delivery, same-day, live-hours, or unverified extended-hours claim appears until approved.</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}