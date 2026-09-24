import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { STORE_NAP, VISIT_FAQS, faqPageJsonLd } from "../lib/storeNap";
import { VISIT_COPY } from "../lib/sccCopy";
import styles from "./visit.module.css";

export const metadata: Metadata = {
  title: { absolute: VISIT_COPY.title },
  description: VISIT_COPY.description,
  alternates: { canonical: `${STORE_NAP.origin}/visit` },
  openGraph: {
    title: VISIT_COPY.title,
    description: VISIT_COPY.description,
    url: `${STORE_NAP.origin}/visit`,
  },
  robots: { index: true, follow: true },
};

export default function VisitPage() {
  const nap = STORE_NAP;
  return (
    <main className={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(VISIT_FAQS)) }}
      />
      <Navbar />
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            {nap.neighborhood} · {nap.ageLine} · Walk-in · {nap.hoursShort}
          </p>
          <h1 className={styles.heroTitle}>{VISIT_COPY.h1}</h1>
          <p className={styles.heroLead}>{VISIT_COPY.intro}</p>
          <div className={styles.napCard}>
            <strong>Address, phone, hours</strong>
            <p>
              {nap.brand}
              <br />
              {nap.streetAddress}
              <br />
              {nap.addressLocality}, {nap.addressRegion} {nap.postalCode}
            </p>
            <p>
              Phone: <a href={nap.telHref}>{nap.phoneDisplay}</a>
            </p>
            <p>{nap.hoursLabel}</p>
            <p>
              Nearest intersection: {nap.intersection}. {nap.ageLine}.
            </p>
          </div>
          <div className={styles.actions}>
            <a className={styles.btn} href={nap.mapsUrl} target="_blank" rel="noopener noreferrer">
              Google Maps
            </a>
            <Link className={styles.btnSecondary} href="/hours">
              Hours page
            </Link>
            <Link className={styles.btnSecondary} href="/exotic">
              Exotic Weed
            </Link>
          </div>
        </div>
      </section>
      <div className={styles.content}>
        <div className={styles.mapWrap}>
          <iframe
            title="Map of Fort York Cannabis at 38 Fort York Blvd"
            src={nap.mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className={styles.mapFrame}
          />
        </div>
        {VISIT_COPY.sections.map((section) => (
          <section key={section.heading} className={styles.section}>
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </section>
        ))}
        <section className={styles.faq}>
          <h2>Visit FAQ</h2>
          {VISIT_FAQS.map((faq) => (
            <details key={faq.q}>
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </section>
        <aside className={styles.related}>
          <h2>Continue</h2>
          <nav>
            <Link href="/hours">Hours</Link>
            <Link href="/info/native-cigarettes-fort-york">Native cigarettes</Link>
            <Link href="/info/nicotine-vapes-fort-york">Nicotine vapes</Link>
            <Link href="/menu">Menu</Link>
          </nav>
        </aside>
      </div>
      <Footer />
    </main>
  );
}
