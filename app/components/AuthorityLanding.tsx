import Link from "next/link";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { STORE_NAP } from "../lib/storeNap";
import type { AuthorityPage } from "../lib/authorityPages";
import styles from "./AuthorityLanding.module.css";

export default function AuthorityLanding({ page }: { page: AuthorityPage }) {
  const url = `${STORE_NAP.origin}${page.path}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": `${url}#webpage`, url, name: page.title, description: page.summary, isPartOf: { "@id": `${STORE_NAP.origin}/#website` }, about: { "@id": `${STORE_NAP.origin}/#store` } },
      { "@type": "FAQPage", "@id": `${url}#faq`, mainEntity: page.faqs.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })) },
    ],
  };

  return (
    <main className={styles.main}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <Navbar />
      <section className={styles.hero}>
        <div className={styles.wrap}>
          <span>{page.eyebrow}</span>
          <h1>{page.title}</h1>
          <p>{page.summary}</p>
          <div className={styles.actions}>
            <Link href={page.menuHref}>{page.menuLabel}</Link>
            <a href={STORE_NAP.mapsUrl} target="_blank" rel="noopener noreferrer">Open Google Maps</a>
          </div>
        </div>
      </section>
      <section className={styles.content}>
        <div className={styles.wrap}>
          <article>
            <h2>At the Fort York Boulevard counter</h2>
            <p>{page.body}</p>
          </article>
          <aside>
            <h2>Plan your visit</h2>
            <p><strong>{STORE_NAP.brand}</strong><br />{STORE_NAP.addressLine}<br /><a href={STORE_NAP.telHref}>{STORE_NAP.phoneDisplay}</a><br />Open 24 hours, seven days a week</p>
            <p>Adults 19+ with government-issued photo ID.</p>
            <Link href="/visit">Transit, parking and arrival details</Link>
          </aside>
          <section className={styles.faq}>
            <h2>Frequently asked questions</h2>
            {page.faqs.map((faq) => <details key={faq.q}><summary>{faq.q}</summary><p>{faq.a}</p></details>)}
          </section>
        </div>
      </section>
      <Footer />
    </main>
  );
}
