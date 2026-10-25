import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CODED_NAP, CODED_PAGES } from "../lib/fleet/coded";
import { getFleetContent } from "../lib/fleetContent";
import styles from "./contact.module.css";

const CONTACT_METADATA: Metadata = {
  title: "Contact FORT YORK CANNABIS | 38 Fort York Blvd, Toronto",
  description:
    "Contact page for FORT YORK CANNABIS at 38 Fort York Blvd in Toronto. Phone is 437-783-2511. The store is open 24 hours.",
  alternates: {
    canonical: "https://fortyorkcannabis.com/contact",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const fleet = await getFleetContent();
  if (!fleet.active) return CONTACT_METADATA;
  const page = fleet.pages.Contact;
  const description = page?.metaDescription || "";
  const title = page?.metaTitle || "";
  if ((!description || description === CODED_PAGES.Contact.metaDescription) && (!title || title === CODED_PAGES.Contact.metaTitle)) {
    return CONTACT_METADATA;
  }
  return {
    ...CONTACT_METADATA,
    ...(description && description !== CODED_PAGES.Contact.metaDescription ? { description } : {}),
    ...(title && title !== CODED_PAGES.Contact.metaTitle ? { title: { absolute: title } } : {}),
  };
}

function contactMatchesCoded(nap: typeof CODED_NAP) {
  return nap.street === CODED_NAP.street
    && nap.cityLine === CODED_NAP.cityLine
    && nap.area === CODED_NAP.area
    && nap.hours === CODED_NAP.hours
    && nap.phoneDisplay === CODED_NAP.phoneDisplay
    && nap.mapsSearchUrl === CODED_NAP.mapsSearchUrl;
}

export default async function ContactPage() {
  const fleet = await getFleetContent();
  if (!fleet.active || contactMatchesCoded(fleet.nap)) return <CodedContactPage />;
  const street = fleet.nap.street;
  const cityLine = fleet.nap.cityLine;
  const area = fleet.nap.area;
  const hoursLine = fleet.nap.hours;
  const phone = fleet.nap.phoneDisplay;
  const maps = fleet.nap.mapsSearchUrl;
  return <ContactBody street={street} cityLine={cityLine} area={area} hoursLine={hoursLine} phone={phone} maps={maps} />;
}

function CodedContactPage() {
  return (
    <main className={styles.main}>
      <Navbar />
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <span className={styles.microLabel}>Contact and location</span>
            <h1>FORT YORK CANNABIS</h1>
            <p>Visit us at 38 Fort York Blvd in Toronto. Phone is 437-783-2511. Open 24 hours.</p>
          </div>
          <img src="/banners/fort_york_hero_banner.webp" alt="FORT YORK CANNABIS storefront banner" className={styles.heroImage} />
        </div>
      </section>
      <section className={styles.infoSection}>
        <div className={styles.container}>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>38</div>
              <h2 className={styles.infoTitle}>Visit Us at 38 Fort York Blvd</h2>
              <p className={styles.infoText}>38 Fort York Blvd<br />Toronto, ON M5V 3Z3<br /><span className={styles.infoMuted}>Fort York / CityPlace</span></p>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>HRS</div>
              <h2 className={styles.infoTitle}>Store Hours</h2>
              <p className={styles.infoText}>Open 24 hours, seven days a week.</p>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>TEL</div>
              <h2 className={styles.infoTitle}>Phone</h2>
              <p className={styles.infoText}>437-783-2511.</p>
            </div>
          </div>
          <div className={styles.mapSection}>
            <div className={styles.mapCopy}>
              <span className={styles.microLabel}>Downtown Toronto location</span>
              <h2 className={styles.infoTitle}>Find the Store</h2>
              <p className={styles.infoText}>FORT YORK CANNABIS is located for Fort York, CityPlace, waterfront Toronto, and nearby downtown routes.</p>
              <a href="https://maps.app.goo.gl/XRcfsdmCFQrE3UkT9" target="_blank" rel="noopener noreferrer" className={styles.openBadge}>Open Google Maps</a>
            </div>
            <img src="/brand/local-area-waterfront.webp" alt="Fort York CityPlace local area" className={styles.mapImage} />
          </div>
          <div className={styles.customerPanel}>
            <img src="/brand/visit-cta-banner.webp" alt="FORT YORK CANNABIS customer actions" className={styles.customerImage} />
            <div className={styles.customerCopy}>
              <span className={styles.microLabel}>Store information</span>
              <h2 className={styles.infoTitle}>Call / Directions / Menu</h2>
              <p className={styles.infoText}>Directions, phone, hours, menu browsing, and same-day delivery ordering are ready now. License-specific details are not published.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function ContactBody({ street, cityLine, area, hoursLine, phone, maps }: { street: string; cityLine: string; area: string; hoursLine: string; phone: string; maps: string }) {
  return (
    <main className={styles.main}>
      <Navbar />
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <span className={styles.microLabel}>Contact and location</span>
            <h1>FORT YORK CANNABIS</h1>
            <p>Visit us at {street} in Toronto. Phone is {phone}. Open 24 hours.</p>
          </div>
          <img src="/banners/fort_york_hero_banner.webp" alt="FORT YORK CANNABIS storefront banner" className={styles.heroImage} />
        </div>
      </section>
      <section className={styles.infoSection}>
        <div className={styles.container}>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>38</div>
              <h2 className={styles.infoTitle}>Visit Us at 38 Fort York Blvd</h2>
              <p className={styles.infoText}>{street}<br />{cityLine}<br /><span className={styles.infoMuted}>{area}</span></p>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>HRS</div>
              <h2 className={styles.infoTitle}>Store Hours</h2>
              <p className={styles.infoText}>{hoursLine}</p>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>TEL</div>
              <h2 className={styles.infoTitle}>Phone</h2>
              <p className={styles.infoText}>{phone}.</p>
            </div>
          </div>
          <div className={styles.mapSection}>
            <div className={styles.mapCopy}>
              <span className={styles.microLabel}>Downtown Toronto location</span>
              <h2 className={styles.infoTitle}>Find the Store</h2>
              <p className={styles.infoText}>FORT YORK CANNABIS is located for Fort York, CityPlace, waterfront Toronto, and nearby downtown routes.</p>
              <a href={maps} target="_blank" rel="noopener noreferrer" className={styles.openBadge}>Open Google Maps</a>
            </div>
            <img src="/brand/local-area-waterfront.webp" alt="Fort York CityPlace local area" className={styles.mapImage} />
          </div>
          <div className={styles.customerPanel}>
            <img src="/brand/visit-cta-banner.webp" alt="FORT YORK CANNABIS customer actions" className={styles.customerImage} />
            <div className={styles.customerCopy}>
              <span className={styles.microLabel}>Store information</span>
              <h2 className={styles.infoTitle}>Call / Directions / Menu</h2>
              <p className={styles.infoText}>Directions, phone, hours, menu browsing, and same-day delivery ordering are ready now. License-specific details are not published.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
