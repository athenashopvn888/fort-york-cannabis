"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import menu from "./delivery-menu.json";
import ProductDetailsDrawer from "./ProductDetailsDrawer";

type Option = { key: string; label: string; price: number };
type Offer = { kind: "prime_time" | "multi_ounce"; title?: string; quantity?: number; price?: number; weight?: string; bonus?: string; perUnitPrice?: number; totalPrice?: number; label: string };
type Tier = "SHREDS" | "Budget" | "BC Premium" | "CRAFTS" | "Exotics";
type Product = { publicProductId: string; name: string; tier: Tier; category: string; strain: string; thc: string; effects: string[]; description: string | null; images: string[]; priceOptions: Option[]; offers?: Offer[] };
type TierFilter = "ALL" | Tier;
const bundledProducts = menu.products as Product[];
const tierFilters: TierFilter[] = ["ALL", "Exotics", "CRAFTS", "BC Premium", "Budget", "SHREDS"];
const tierDisplayOrder: Tier[] = ["Exotics", "CRAFTS", "BC Premium", "Budget", "SHREDS"];

function strain(product: Product) {
  const value = product.category.toUpperCase();
  if (value.includes("INDICA") && !value.includes("HYBRID")) return "INDICA";
  if (value.includes("SATIVA") && !value.includes("HYBRID")) return "SATIVA";
  return "HYBRID";
}

function tier(product: Product): Tier { return product.tier; }

function normalEntryPrice(product: Product) {
  const prices = product.priceOptions.map((option) => option.price);
  return prices.length ? Math.min(...prices) : Number.POSITIVE_INFINITY;
}

function formatCurrency(value: number) {
  if (!Number.isFinite(value)) return "$0";
  const rounded = Math.round((value + Number.EPSILON) * 100) / 100;
  return `$${rounded.toFixed(2).replace(/\.00$/, "").replace(/(\.\d)0$/, "$1")}`;
}

function get28gBundleEachDisplayPrice(quantity: number, total: number, perUnitPrice?: number) {
  if (quantity === 3 && total === 95) return 33;
  const supplied = Number(perUnitPrice);
  return Number.isFinite(supplied) && supplied > 0 ? supplied : total / quantity;
}

function compareProducts(a: Product, b: Product) {
  const tierA = tier(a);
  const tierB = tier(b);
  const tierDifference = (tierA ? tierDisplayOrder.indexOf(tierA) : tierDisplayOrder.length) - (tierB ? tierDisplayOrder.indexOf(tierB) : tierDisplayOrder.length);
  if (tierDifference !== 0) return tierDifference;
  const priceA = normalEntryPrice(a);
  const priceB = normalEntryPrice(b);
  if (priceA !== priceB) return priceA - priceB;
  return a.name.localeCompare(b.name, "en", { sensitivity: "base" });
}

function ProductPricing({ product }: { product: Product }) {
  const regular28 = product.priceOptions.find((option) => option.label === "28g");
  const compact = product.priceOptions.filter((option) => option.label !== "28g");
  const member = product.offers?.find((offer) => offer.kind === "prime_time");
  const eligible = ["Exotics", "CRAFTS", "BC Premium"].includes(tier(product) || "");
  const explicitLoyalty = Number(member?.price);
  const loyaltyPrice = Number.isFinite(explicitLoyalty) && explicitLoyalty > 0
    ? explicitLoyalty
    : eligible && regular28 ? regular28.price - 30 : null;
  const bundles = eligible && loyaltyPrice
    ? [
      { kind: "multi_ounce" as const, quantity: 2, perUnitPrice: loyaltyPrice, totalPrice: loyaltyPrice * 2, label: `2 × 28g at $${loyaltyPrice} each — $${loyaltyPrice * 2} total` },
      ...(product.offers?.filter((offer) => offer.kind === "multi_ounce" && Number(offer.quantity) !== 2) || [])
    ]
    : product.offers?.filter((offer) => offer.kind === "multi_ounce") || [];
  return (
    <div className="product-pricing">
      {compact.length > 0 && <div className="compact-price-section"><div className="compact-price-grid">{compact.map((option) => <div key={option.key} className="compact-price"><span>{option.label}</span><strong>{formatCurrency(option.price)}</strong></div>)}</div></div>}
      {(regular28 || member || bundles.length > 0) && <div className="decision-prices">
        {loyaltyPrice !== null && <div className="decision-tile member-28"><span>MEMBER LOYALTY 28g</span><strong>{formatCurrency(loyaltyPrice)}</strong><small>Member price</small><p>{member?.bonus ? `${member.bonus} applies on a later order when eligible.` : "Coupon or add-on eligibility is confirmed separately."}</p></div>}
        {bundles.map((offer, index) => {
          const quantity = Number(offer.quantity);
          const total = Number(offer.totalPrice);
          const each = get28gBundleEachDisplayPrice(quantity, total, offer.perUnitPrice);
          return <div className="decision-tile bundle-decision" key={`${offer.kind}-${quantity}-${index}`}><span>{quantity} × 28g DEAL</span><div className="bundle-numbers"><strong>{formatCurrency(each)} <small>each</small></strong><b>{formatCurrency(total)} <small>total</small></b></div></div>;
        })}
        {regular28 && <div className="decision-tile standard-28"><span>STANDARD 28g</span><strong>{formatCurrency(regular28.price)}</strong><small>Regular price</small></div>}
      </div>}
    </div>
  );
}

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>(bundledProducts);
  const [activeTier, setActiveTier] = useState<TierFilter>("ALL");
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const closeDetails = useCallback(() => setSelectedProduct(null), []);
  useEffect(() => {
    const controller = new AbortController();
    fetch("https://milestone-1-demo.vercel.app/api/catalog?store=FYC", { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((payload) => {
        if (Array.isArray(payload.products) && payload.products.length >= 50
          && payload.products.every((product: Product) => product.publicProductId && product.tier && Array.isArray(product.images))) {
          setProducts(payload.products);
        }
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  const filtered = useMemo(() => products.filter((product) => {
    if (activeTier !== "ALL" && tier(product) !== activeTier) return false;
    const needle = search.trim().toLowerCase();
    return !needle || `${product.name} ${product.category} ${product.strain}`.toLowerCase().includes(needle);
  }).sort(compareProducts), [activeTier, search, products]);

  return (
    <div className="fyc-original-shell">
      <header className="store-header fyc-store-header">
        <div className="header-main">
          <Link className="brand-lockup" href="/" aria-label="Fort York Cannabis homepage"><span className="brand-mark">FYC</span><span><strong>Fort York Cannabis</strong><small>Delivery menu</small></span></Link>
          <nav className="desktop-nav"><a href="#menu">Shop</a><a href="#how-to-order">How to order</a></nav>
          <div className="header-actions"><a className="header-guide" href="#menu">Search</a></div>
        </div>
        <div className="category-strip fyc-category-strip" aria-label="Flower tier filters">
          {tierFilters.map((item) => <button className={activeTier === item ? "active" : ""} key={item} onClick={() => setActiveTier(item)} type="button">{item === "ALL" ? "ALL" : `${item.toUpperCase()} WEED`}</button>)}
        </div>
      </header>

      <section className="fyc-terms-ribbon" aria-labelledby="fyc-terms"><div><p>FORT YORK CANNABIS DELIVERY DETAILS</p><h2 id="fyc-terms"><span>$60 PRODUCT MINIMUM</span><span>$10 DELIVERY FEE</span><span>DELIVERY HOURS 10:00 a.m.–10:00 p.m.</span></h2></div><a href="#how-to-order">Read the ordering steps</a></section>

      <main className="delivery-page" id="top">
        <section className="delivery-seo-intro" aria-labelledby="delivery-seo-title">
          <p className="eyebrow">FORT YORK CANNABIS</p>
          <h1 id="delivery-seo-title">Weed Delivery in Toronto</h1>
          <p>Browse Fort York Cannabis weed delivery in Toronto, review the live delivery menu, and use LIVE ORDER to connect with the dispatcher. Same-day delivery is usually completed within one to two hours. The dispatcher confirms availability, delivery details, and next steps.</p>
          <Link href="/guides">Explore Fort York delivery guides</Link>
          {" · "}
          <Link href="/weed-dispensary-fort-york">Weed dispensary Fort York</Link>
          {" · "}
          <Link href="/weed-dispensary-toronto">Explore Fort York Cannabis in Toronto</Link>
        </section>
        <section className="store-hero fyc-editorial-hero">
          <Image src="/brand/delivery-ordering-banner.webp" alt="Fort York Cannabis delivery ordering banner" width={1600} height={900} priority sizes="(max-width: 1500px) 100vw, 1444px" />
        </section>

        <section className="member-loyalty" aria-labelledby="member-loyalty-title">
          <div className="member-loyalty-heading">
            <p className="eyebrow">SAVE ON A LATER ORDER</p>
            <h2 id="member-loyalty-title">Member Loyalty Savings</h2>
            <p>Qualify with an eligible regular-price 28g purchase in BC Premium, Crafts, or Exotics, or with a selected 2 × 28g tier offer. Rewards and coupons apply to a later order—not the qualifying purchase.</p>
          </div>
          <ol className="member-loyalty-steps">
            <li><span>1</span><div><strong>Qualify</strong><p>Purchase an eligible regular-price ounce or selected two-ounce tier offer.</p></div></li>
            <li><span>2</span><div><strong>Return</strong><p>On your next visit, receive $30 off an eligible regular-price 28g item in the selected tier.</p></div></li>
            <li><span>3</span><div><strong>Use your coupon later</strong><p>A 3g Craft coupon requires a qualifying spend of $120 or more and is redeemed on your next order.</p></div></li>
            <li><span>4</span><div><strong>Keep access active</strong><p>Make a purchase of $50 or more within 14 days, or requalify with a full-price purchase.</p></div></li>
          </ol>
          <div className="member-loyalty-conditions">
            <strong>Important conditions</strong>
            <p>Complimentary items apply only to regular-price Craft or Exotic ounces—not BC Premium. Loyalty prices are firm and cannot be reduced with points. Loyalty-price orders do not include extra complimentary items. Dispatcher confirms current eligibility and any included item before checkout.</p>
          </div>
        </section>

        <section className="menu-layout fyc-three-column-layout" id="menu">
          <aside className="filter-rail fyc-filter-rail">
            <div className="filter-block"><div className="filter-head"><h2>Flower menu</h2><button type="button" onClick={() => { setActiveTier("ALL"); setSearch(""); }}>Reset</button></div><p className="filter-note">Use the tier bar above to browse from Exotics down to SHREDS.</p></div>
            <div className="filter-block"><h3>Current tier</h3><p className="filter-note"><strong>{activeTier === "ALL" ? "ALL FLOWER" : activeTier.toUpperCase()}</strong><br />{filtered.length} products in this view</p></div>
          </aside>

          <section className="menu-main fyc-menu-main">
            <div className="menu-tools"><div><p className="eyebrow">FORT YORK FLOWER MENU</p><h2>Flowers</h2></div><label className="menu-search"><span>Search</span><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Product or category" /></label></div>
            <p className="result-summary">Showing {filtered.length} of {products.length} flower products.</p>
            <div className="product-grid fyc-list-grid">
              {filtered.map((product) => {
                const productTier = tier(product);
                return <article className="product-card fyc-horizontal-card" key={product.publicProductId}>
                  <button className="product-image-button" type="button" onClick={() => setSelectedProduct(product)} aria-label={`View details for ${product.name}`}>{product.images[0] ? <Image src={product.images[0]} alt={`${product.name} on the Fort York Cannabis delivery menu`} fill sizes="(max-width: 640px) 50vw, 104px" unoptimized /> : <span>No image</span>}</button>
                  <div className="product-body"><div className="product-badges">{productTier && <span className="badge">{productTier}</span>}<span className="badge secondary">{strain(product)}</span></div><h2 className="product-title"><button type="button" onClick={() => setSelectedProduct(product)}>{product.name}</button></h2><p className="product-meta">{product.category}</p><ProductPricing product={product} /><button className="view-details-button" type="button" onClick={() => setSelectedProduct(product)}>View details</button></div>
                </article>;
              })}
            </div>
          </section>

        </section>
        <section className="fyc-order-steps" id="how-to-order" tabIndex={-1} aria-labelledby="how-to-order-title">
          <p className="eyebrow">HOW TO ORDER</p>
          <h2 id="how-to-order-title">LIVE ORDER connects you with the Fort York Cannabis dispatcher.</h2>
          <ol>
            <li>Browse the delivery menu and note the product names and weights.</li>
            <li>Select LIVE ORDER at the bottom-right and send the dispatcher your choices.</li>
            <li>New customers complete private selfie-with-ID verification in Web Chat.</li>
            <li>The dispatcher confirms availability, delivery details, and next steps.</li>
          </ol>
        </section>
      </main>
      <ProductDetailsDrawer product={selectedProduct} storeName="Fort York Cannabis" onClose={closeDetails} pricing={selectedProduct ? <ProductPricing product={selectedProduct} /> : null} />
    </div>
  );
}
