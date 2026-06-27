import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./delivery.module.css";

export default function DeliveryContent() {
  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.content}>
        <img src="/brand/delivery-ordering-banner.webp" alt="Fort York Cannabis ordering details coming soon" className={styles.heroImage} />
        <h1 className={styles.pageTitle}>Pickup / Delivery <span className={styles.highlight}>Coming Soon</span></h1>
        <p className={styles.pageSubtitle}>
          Pickup, delivery, ordering, menu availability, and service-area details are coming soon for FORT YORK CANNABIS.
        </p>
        <div className={styles.formSection}>
          <h2 className={styles.formTitle}>Ordering Details Coming Soon</h2>
          <p className={styles.formDesc}>
            Pickup and delivery details will be added once they are ready. Confirmed ordering information will be published after owner approval.
          </p>
        </div>
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <span className={styles.infoIcon}>1</span>
            <h3 className={styles.infoTitle}>Pickup Status</h3>
            <p className={styles.infoDesc}>Pickup rules, payment options, and timing are coming soon.</p>
          </div>
          <div className={styles.infoCard}>
            <span className={styles.infoIcon}>2</span>
            <h3 className={styles.infoTitle}>Delivery Status</h3>
            <p className={styles.infoDesc}>Delivery availability and service area are coming soon.</p>
          </div>
          <div className={styles.infoCard}>
            <span className={styles.infoIcon}>3</span>
            <h3 className={styles.infoTitle}>Menu Status</h3>
            <p className={styles.infoDesc}>Menu, brands, inventory, and pricing will be added once details are ready.</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
