import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  MENU_CATEGORIES,
  MENU_SOURCE_STATE,
  MENU_STATUS_NOTICE,
  STORE_INFO,
  getFeaturedMenuProducts,
  getMenuItemCount,
  getProductDisplayPrice,
  getProductImage,
  getProductMeta,
  getProductPath,
} from "../lib/products";
import styles from "./menu.module.css";

export const metadata: Metadata = {
  title: "Menu | FORT YORK CANNABIS",
  description:
    "Browse the FORT YORK CANNABIS menu for flower, pre-rolls, vape pens, disposable vapes, edibles, concentrates, cigarettes, and accessories at 38 Fort York Blvd in Toronto.",
  alternates: {
    canonical: "https://fortyorkcannabis.com/menu",
  },
};

export default function MenuPage() {
  const featured = getFeaturedMenuProducts();

  return (
    <main className={styles.main}>
      <Navbar />

      <section className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.microLabel}>Fort York Cannabis Menu</span>
          <h1 className={styles.title}>Menu</h1>
          <p className={styles.lede}>{MENU_STATUS_NOTICE}</p>
          <div className={styles.statusGrid}>
            <div className={styles.statusCard}>
              <span>Call</span>
              <strong>{STORE_INFO.phone}</strong>
            </div>
            <div className={styles.statusCard}>
              <span>Hours</span>
              <strong>{STORE_INFO.hours}</strong>
            </div>
            <div className={styles.statusCard}>
              <span>Menu items</span>
              <strong>{MENU_SOURCE_STATE.productCount}</strong>
            </div>
          </div>
          <nav className={styles.heroNav} aria-label="Menu categories">
            {MENU_CATEGORIES.map((category) => (
              <Link key={category.slug} href={`/items/${category.slug}`}>
                {category.name}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className={styles.categorySection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.microLabel}>Browse Categories</span>
            <h2 className={styles.sectionTitle}>Shop Fort York Categories</h2>
            <p className={styles.sectionCopy}>
              Choose a category to view product images, THC details, tiers, weights, bundle pricing, and prices where available.
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

      <section className={styles.featureSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.microLabel}>Featured Products</span>
            <h2 className={styles.sectionTitle}>View Details</h2>
          </div>
          <div className={styles.featureGrid}>
            {featured.map((product) => (
              <Link key={`${product.sku}-${product.slug}`} href={getProductPath(product)} className={styles.featureCard}>
                <img src={getProductImage(product)} alt={`${product.name} at Fort York Cannabis`} />
                <span>{getProductMeta(product)}</span>
                <strong>{product.name}</strong>
                <em>{getProductDisplayPrice(product)}</em>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
