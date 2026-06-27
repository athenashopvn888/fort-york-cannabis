import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./delivery.module.css";

export default function DeliveryContent() {
  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.content}>
        <h1 className={styles.pageTitle}>Pickup / Delivery <span className={styles.highlight}>Pending Confirmation</span></h1>
        <p className={styles.pageSubtitle}>
          Pickup, delivery, ordering, menu availability, and service-area details are pending owner confirmation for FORT YORK CANNABIS.
        </p>
        <div className={styles.formSection}>
          <h2 className={styles.formTitle}>Ordering Details Coming Soon</h2>
          <p className={styles.formDesc}>
            This page does not claim pickup or delivery is available yet. Confirmed ordering information will be published after owner approval.
          </p>
        </div>
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <span className={styles.infoIcon}>1</span>
            <h3 className={styles.infoTitle}>Pickup Status</h3>
            <p className={styles.infoDesc}>Pickup rules, payment options, and timing are pending owner confirmation.</p>
          </div>
          <div className={styles.infoCard}>
            <span className={styles.infoIcon}>2</span>
            <h3 className={styles.infoTitle}>Delivery Status</h3>
            <p className={styles.infoDesc}>Delivery availability and service area are pending owner confirmation.</p>
          </div>
          <div className={styles.infoCard}>
            <span className={styles.infoIcon}>3</span>
            <h3 className={styles.infoTitle}>Menu Status</h3>
            <p className={styles.infoDesc}>Menu, brands, inventory, and pricing will be published after confirmation.</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
