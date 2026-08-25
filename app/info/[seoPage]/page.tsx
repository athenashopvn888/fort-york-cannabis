import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { SEO_PAGES, getSeoPageBySlug } from "../../lib/seoPages";
import { MENU_CATEGORIES } from "../../lib/products";
import styles from "./seo.module.css";

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
  const heroPreview = page.heroPreview;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <main className={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
      />
      <Navbar />

      {page.banner && !heroPreview && (
        <section className={styles.bannerSection}>
          <Image
            src={page.banner}
            alt={page.h1}
            className={styles.bannerImg}
            width={1600}
            height={720}
            sizes="100vw"
            priority
          />
        </section>
      )}

      {heroPreview ? (
        <section className={styles.productHero}>
          <div className={styles.productHeroInner}>
            <div className={styles.productHeroCopy}>
              <span className={styles.productHeroKicker}>{heroPreview.eyebrow}</span>
              <h1>{page.h1}</h1>
              <p>{heroPreview.intro}</p>
              <div className={styles.productHeroActions}>
                <Link href={heroPreview.primaryAction.href} className={styles.productHeroPrimary}>
                  {heroPreview.primaryAction.label}
                </Link>
                <Link href={heroPreview.secondaryAction.href} className={styles.productHeroSecondary}>
                  {heroPreview.secondaryAction.label}
                </Link>
              </div>
            </div>
            <div className={styles.productPreviewStage} aria-label={`${page.h1} product preview`}>
              {heroPreview.products.map((product, index) => (
                <Link
                  key={product.name}
                  href={heroPreview.primaryAction.href}
                  className={styles.productPreviewCard}
                >
                  <Image
                    src={product.image}
                    alt={`${product.name} product preview`}
                    width={800}
                    height={800}
                    priority={index === 0}
                    sizes="(max-width: 720px) 44vw, (max-width: 980px) 46vw, 220px"
                  />
                  <span>{product.name}</span>
                </Link>
              ))}
              <p className={styles.productHeroDisclosure}>{heroPreview.disclosure}</p>
            </div>
          </div>
        </section>
      ) : (
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <span className={styles.heroIcon}>FYC</span>
            <h1 className={styles.heroH1}>{page.h1}</h1>
            <p className={styles.heroTagline}>{page.heroTagline}</p>
          </div>
        </section>
      )}

      <section className={styles.localFeatureSection}>
        <div className={styles.localFeatureGrid}>
            <Image
              src="/brand/local-area-waterfront.webp"
              alt="Fort York CityPlace downtown Toronto local area"
              className={styles.localFeatureImage}
              width={1200}
              height={800}
              sizes="(max-width: 760px) 100vw, 48vw"
            />
            <div className={styles.localFeatureCopy}>
              <span className={styles.microLabel}>Downtown Toronto local guide</span>
              <h2 className={styles.sectionTitle}>Fort York and CityPlace Context</h2>
            <p className={styles.sectionBody}>FORT YORK CANNABIS keeps Fort York, CityPlace, waterfront, and downtown Toronto information clear with address, hours, menu, contact, and directions context for adults 19+.</p>
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
            <h2 className={styles.sectionTitle}>Menu Categories</h2>
            <p className={styles.sectionBody}>
              Browse flower, pre-rolls, Nicotine Vapes, Vape Disposables, edibles, concentrates, Cigarettes, and accessories. The Cigarettes category includes $25 cartons plus 2 Pack $5 Mix &amp; Match on selected SKUs.
            </p>
            <div className={styles.categoryGrid}>
              {MENU_CATEGORIES.map((category) => (
                <Link key={category.slug} href={`/items/${category.slug}`} className={styles.categoryCard}>
                  <span className={styles.categoryLabel}>{category.name}</span>
                  <span className={styles.categoryStatus}>View menu</span>
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
