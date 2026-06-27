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
  title: "Menu | FORT YORK CANNABIS",
  description:
    "Browse the FORT YORK CANNABIS menu for flower, pre-rolls, vapes, edibles, concentrates, and accessories at 38 Fort York Blvd in Toronto.",
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
          <span className={styles.microLabel}>Fort York Cannabis Menu</span>
          <h1 className={styles.title}>Browse Menu</h1>
          <p className={styles.lede}>{MENU_STATUS_NOTICE}</p>
          <div className={styles.statusGrid}>
            <div className={styles.statusCard}>
              <span>Status</span>
              <strong>{MENU_SOURCE_STATE.label}</strong>
            </div>
            <div className={styles.statusCard}>
              <span>Hours</span>
              <strong>11AM-2AM</strong>
            </div>
            <div className={styles.statusCard}>
              <span>Menu items</span>
              <strong>{MENU_SOURCE_STATE.productCount}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.categorySection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.microLabel}>Explore Categories</span>
            <h2 className={styles.sectionTitle}>Shop By Category</h2>
            <p className={styles.sectionCopy}>
              Choose a category to view products, images, THC details, tiers, and prices where available.
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
                    <em>{count} items</em>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
