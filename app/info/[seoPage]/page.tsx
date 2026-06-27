import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { SEO_PAGES, getSeoPageBySlug } from "../../lib/seoPages";
import styles from "./seo.module.css";

const MENU_CATEGORIES = [
  "Flower",
  "Pre-rolls",
  "Edibles",
  "THC vapes",
  "Concentrates",
  "Accessories",
];

export function generateStaticParams() {
  return SEO_PAGES.map((p) => ({ seoPage: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ seoPage: string }>;
}): Promise<Metadata> {
  const { seoPage: slug } = await params;
  const page = getSeoPageBySlug(slug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.metaDescription,
    alternates: {
      canonical: `https://fortyorkcannabis.com/info/${slug}`,
    },
  };
}

export default async function SeoLandingPage({
  params,
}: {
  params: Promise<{ seoPage: string }>;
}) {
  const { seoPage: slug } = await params;
  const page = getSeoPageBySlug(slug);
  if (!page) notFound();

  return (
    <main className={styles.main}>
      <Navbar />

      {page.banner && (
        <section className={styles.bannerSection}>
          <img
            src={page.banner}
            alt={page.h1}
            className={styles.bannerImg}
          />
        </section>
      )}

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroIcon}>FYC</span>
          <h1 className={styles.heroH1}>{page.h1}</h1>
          <p className={styles.heroTagline}>{page.heroTagline}</p>
        </div>
      </section>

      <section className={styles.previewSection}>
        <div className={styles.previewGrid}>
          <img src="/banners/fort_york_district_map.webp" alt="Fort York CityPlace downtown Toronto local area" className={styles.previewImage} />
          <div className={styles.previewCopy}>
            <span className={styles.microLabel}>Downtown Toronto local guide</span>
            <h2 className={styles.sectionTitle}>Fort York and CityPlace Context</h2>
            <p className={styles.sectionBody}>FORT YORK CANNABIS keeps Fort York, CityPlace, waterfront, and downtown Toronto information clear while avoiding unverified phone, hours, menu, delivery, pickup, license, or review claims.</p>
          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          {page.sections.map((s, i) => (
            <div key={i} className={styles.section}>
              <h2 className={styles.sectionTitle}>{s.heading}</h2>
              <p className={styles.sectionBody}>{s.body}</p>
            </div>
          ))}

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Menu Categories Coming Soon</h2>
            <p className={styles.sectionBody}>
              Menu categories are ready for review. Exact inventory, pricing, brands, pickup, delivery, and availability are coming soon.
            </p>
            <div className={styles.categoryGrid}>
              {MENU_CATEGORIES.map((category) => (
                <Link key={category} href="/#menu-preview" className={styles.categoryCard}>
                  <span className={styles.categoryLabel}>{category}</span>
                  <span className={styles.categoryStatus}>Coming soon</span>
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Find Us</h2>
            <p className={styles.sectionBody}>
              FORT YORK CANNABIS is at 38 Fort York Blvd, Toronto, ON M5V 3Z3, Canada. Use the contact page for the provided Google Maps link.
            </p>
            <div className={styles.visitBtns}>
              <Link href="/contact" className={styles.visitBtn}>Contact Page</Link>
              <Link href="/weed-dispensary-toronto/" className={styles.visitBtn}>Toronto Landing Page</Link>
            </div>
          </div>

          {page.faqs.length > 0 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
              {page.faqs.map((faq, i) => (
                <details key={i} className={styles.faqItem}>
                  <summary className={styles.faqQ}>{faq.q}</summary>
                  <p className={styles.faqA}>{faq.a}</p>
                </details>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
