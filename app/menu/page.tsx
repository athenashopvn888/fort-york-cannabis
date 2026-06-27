import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  MENU_CATEGORIES,
  MENU_SOURCE_STATE,
  MENU_STATUS_NOTICE,
  getMenuItemCount,
} from "../lib/products";
import styles from "./menu.module.css";

export const metadata: Metadata = {
  title: "Preview Menu | FORT YORK CANNABIS",
  description:
    "FORT YORK CANNABIS menu categories are prepared for the network menu source. Final products, prices, and ordering details are pending owner/backend confirmation.",
  alternates: {
    canonical: "https://fortyorkcannabis.com/menu",
  },
};

export default function MenuPage() {
  return (
    <main className={styles.main}>
      <Navbar />

      <section className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.microLabel}>Menu architecture ready</span>
          <h1 className={styles.title}>Fort York Menu</h1>
          <p className={styles.lede}>{MENU_STATUS_NOTICE}</p>
          <div className={styles.statusGrid}>
            <div className={styles.statusCard}>
              <span>Status</span>
              <strong>{MENU_SOURCE_STATE.label}</strong>
            </div>
            <div className={styles.statusCard}>
              <span>Store code</span>
              <strong>{MENU_SOURCE_STATE.storeCode}</strong>
            </div>
            <div className={styles.statusCard}>
              <span>Confirmed items</span>
              <strong>{MENU_SOURCE_STATE.productCount}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.categorySection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.microLabel}>Browse categories</span>
            <h2 className={styles.sectionTitle}>Prepared Category Routes</h2>
            <p className={styles.sectionCopy}>
              These category pages use the same local generated-data pattern as the existing network stores, but Fort York does not display final product claims until the real source is connected.
            </p>
          </div>

          <div className={styles.categoryGrid}>
            {MENU_CATEGORIES.map((category) => {
              const count = getMenuItemCount(category);
              return (
                <Link key={category.slug} href={`/items/${category.slug}`} className={styles.categoryCard}>
                  <img src={category.banner} alt={`${category.name} category for Fort York Cannabis`} className={styles.categoryImage} />
                  <div className={styles.categoryCopy}>
                    <strong>{category.name}</strong>
                    <span>{category.detail}</span>
                    <em>{count > 0 ? `${count} preview products` : "Preview stock pending"}</em>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.requirementsSection}>
        <div className={styles.container}>
          <div className={styles.requirementsPanel}>
            <div>
              <span className={styles.microLabel}>Before launch menu</span>
              <h2 className={styles.sectionTitle}>Needed To Turn On Real Menu</h2>
            </div>
            <ul className={styles.requirementsList}>
              {MENU_SOURCE_STATE.requiredInputs.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
