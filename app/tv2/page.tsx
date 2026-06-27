"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./tv2.module.css";

type Item = {
  sku: string;
  name: string;
  category?: string;
  thc?: string;
  cbd?: string;
  price?: string;
  image: string;
};

type CategoryBoard = {
  label: string;
  subtitle: string;
  categories: string[];
};

const BOARDS: CategoryBoard[] = [
  { label: "Pre-Rolls", subtitle: "Ready-to-go preview picks", categories: ["PREROLLS", "ADD ONS"] },
  { label: "Vapes", subtitle: "Cartridges and disposables", categories: ["VAPES"] },
  { label: "Edibles", subtitle: "Gummies, chocolates, drinks", categories: ["EDIBLES"] },
  { label: "Concentrates", subtitle: "Diamonds, hash, resin", categories: ["CONCENTRATES"] },
  { label: "Cigarettes", subtitle: "Accessory preview shelf", categories: ["CIGARETTES"] },
  { label: "Magic + More", subtitle: "Specialty and accessories", categories: ["MAGIC", "ACCESSORIES", "ADD ONS"] },
];

function rotateList<T>(items: T[], offset: number, limit: number) {
  if (!items.length) return [];
  return Array.from({ length: Math.min(limit, items.length) }, (_, index) => items[(offset + index) % items.length]);
}

export default function FortYorkTv2Page() {
  const [items, setItems] = useState<Item[]>([]);
  const [tick, setTick] = useState(0);
  const [loadedAt, setLoadedAt] = useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      const res = await fetch("/api/tv-data?type=items");
      const data = await res.json();
      if (!active) return;
      setItems(data);
      setLoadedAt(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    }

    load();
    const refresh = window.setInterval(load, 5 * 60 * 1000);
    const rotate = window.setInterval(() => setTick((value) => value + 1), 6000);

    return () => {
      active = false;
      window.clearInterval(refresh);
      window.clearInterval(rotate);
    };
  }, []);

  const grouped = useMemo(() => {
    return BOARDS.map((board, index) => {
      const products = items.filter((item) => board.categories.includes(item.category || ""));
      return { ...board, products: rotateList(products, tick + index, 4) };
    });
  }, [items, tick]);

  return (
    <main className={styles.screen}>
      <header className={styles.header}>
        <div>
          <span>Fort York preview board</span>
          <h1>Menu categories</h1>
        </div>
        <aside>
          <strong>FORT YORK CANNABIS</strong>
          <p>38 Fort York Blvd / 437-872-8446 / 11AM-2AM</p>
        </aside>
      </header>

      <section className={styles.categoryGrid}>
        {grouped.map((board) => (
          <article className={styles.board} key={board.label}>
            <div className={styles.boardHeader}>
              <div>
                <span>{board.subtitle}</span>
                <h2>{board.label}</h2>
              </div>
              <strong>{board.products.length || 0} preview items</strong>
            </div>
            <div className={styles.itemGrid}>
              {board.products.map((item) => (
                <div className={styles.itemCard} key={item.sku}>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <span>{item.category}</span>
                    <h3>{item.name}</h3>
                    <p>{[item.thc ? `THC ${item.thc}` : "", item.cbd ? `CBD ${item.cbd}` : ""].filter(Boolean).join(" / ")}</p>
                  </div>
                  <b>{item.price || "Price pending"}</b>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>

      <footer className={styles.footer}>
        <strong>Local preview only</strong>
        <span>Final Fort York inventory, ordering, and menu integration require owner approval.</span>
        <small>Loaded {loadedAt || "--"}</small>
      </footer>
    </main>
  );
}
