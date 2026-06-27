import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.col}>
            <div className={styles.brand}>FORT YORK CANNABIS</div>
            <p className={styles.desc}>
              Cannabis store at 38 Fort York Blvd in Toronto. Phone is 437-872-8446. Open 11AM-2AM. Pickup and delivery details will be posted when available.
            </p>
            <div className={styles.buttons}>
              <a href="https://maps.app.goo.gl/XRcfsdmCFQrE3UkT9" target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
                Open Map
              </a>
            </div>
          </div>

          <div className={styles.col}>
            <h3 className={styles.colTitle}>Store Details</h3>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Address:</span>
              <span>38 Fort York Blvd</span>
              <span>Toronto, ON M5V 3Z3</span>
              <span>Canada</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Phone:</span>
              <span>437-872-8446</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Hours:</span>
              <span className={styles.highlight}>11AM-2AM</span>
            </div>
          </div>

          <div className={styles.col}>
            <h3 className={styles.colTitle}>Quick Links</h3>
            <nav className={styles.links}>
              <Link href="/">Home</Link>
              <Link href="/weed-dispensary-toronto/">Toronto Store Page</Link>
              <Link href="/#menu">Menu</Link>
              <Link href="/info/fort-york-cannabis-store">Fort York Cannabis Store</Link>
              <Link href="/info/cityplace-cannabis-dispensary">CityPlace Cannabis Dispensary</Link>
              <Link href="/info/downtown-toronto-weed-dispensary">Downtown Toronto Weed Store</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/delivery">Pickup / Delivery Status</Link>
            </nav>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            (c) {new Date().getFullYear()} FORT YORK CANNABIS. Adults 19+ only. Please consume responsibly. Store details are updated as they are ready.
          </p>
        </div>
      </div>
    </footer>
  );
}
