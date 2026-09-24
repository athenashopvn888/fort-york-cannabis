import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { STORE_NAP, HOURS_FAQS, faqPageJsonLd } from "../lib/storeNap";
import { HOURS_COPY } from "../lib/sccCopy";
import styles from "./hours.module.css";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;

export const metadata: Metadata = {
  title: { absolute: HOURS_COPY.title },
  description: HOURS_COPY.description,
  alternates: { canonical: `${STORE_NAP.origin}/hours` },
  openGraph: {
    title: HOURS_COPY.title,
    description: HOURS_COPY.description,
    url: `${STORE_NAP.origin}/hours`,
  },
  robots: { index: true, follow: true },
};

export default function HoursPage() {
  const nap = STORE_NAP;
  return (
    <main className={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(HOURS_FAQS)) }}
      />
      <Navbar />
      <section className={styles.hero}>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>HOURS HONESTY · GBP VERIFIED</p>
          <h1 className={styles.title}>{HOURS_COPY.h1}</h1>
          <p className={styles.lead}>{HOURS_COPY.intro}</p>
          <p className={styles.badge}>{nap.hoursLabel} · every day</p>
        </div>
      </section>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {DAYS.map((day) => (
            <div key={day} className={styles.row}>
              <span>{day}</span>
              <strong>Open 24 hours</strong>
            </div>
          ))}
        </div>
        {HOURS_COPY.sections.map((section) => (
          <article key={section.heading} className={styles.section}>
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </article>
        ))}
        <div className={styles.actions}>
          <a className={styles.btn} href={nap.telHref}>
            Call {nap.phoneDisplay}
          </a>
          <Link className={styles.btnSecondary} href="/visit">
            Visit directions
          </Link>
        </div>
        <section className={styles.faq}>
          <h2>Hours FAQ</h2>
          {HOURS_FAQS.map((faq) => (
            <details key={faq.q}>
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </section>
      </div>
      <Footer />
    </main>
  );
}
