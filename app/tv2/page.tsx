"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./tv2.module.css";

type Item = {
  sku: string;
  name: string;
  category?: string;
  type?: string;
  thc?: string;
  cbd?: string;
  mg?: string;
  price?: string;
  image: string;
};

type CategoryBoard = {
  label: string;
  subtitle: string;
  categories: string[];
};

const BOARDS: CategoryBoard[] = [
  { label: "Pre-Rolls", subtitle: "Ready-to-go rolls", categories: ["PREROLLS"] },
  { label: "Vapes", subtitle: "Pens and disposables", categories: ["VAPE PENS", "VAPE DISPOSABLE", "THC VAPE", "VAPES"] },
  { label: "Edibles", subtitle: "Gummies, chocolates, drinks", categories: ["EDIBLES"] },
  { label: "Concentrates", subtitle: "Hash, resin, diamonds", categories: ["CONCENTRATES"] },
  { label: "Accessories", subtitle: "Add-ons and essentials", categories: ["ADD ONS", "ACCESSORIES"] },
  { label: "More", subtitle: "Cigarettes and specialty", categories: ["CIGARETTES", "MAGIC", "MAGIC & OTHERS"] },
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
      const keys = new Set(board.categories.map((category) => category.toUpperCase()));
      const products = items.filter((item) => keys.has((item.category || "").toUpperCase()));
      return { ...board, products: rotateList(products, tick + index, 5), count: products.length };
    });
  }, [items, tick]);

  return (
    <main className={styles.screen}>
      <header className={styles.header}>
        <div>
          <span>Secondary Menu Board</span>
          <h1>Fort York Menu</h1>
        </div>
        <aside>
          <strong>FORT YORK CANNABIS</strong>
          <p>38 FORT YORK BLVD / 437-872-8446 / OPEN 11AM-2AM</p>
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
              <strong>{board.count} items</strong>
            </div>
            <div className={styles.itemGrid}>
              {board.products.map((item) => (
                <div className={styles.itemCard} key={item.sku}>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <span>{item.category}</span>
                    <h3>{item.name}</h3>
                    <p>{[item.thc ? `THC ${item.thc}` : "", item.mg].filter(Boolean).join(" / ")}</p>
                  </div>
                  <b>{item.price || "PRICE IN STORE"}</b>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>

      <footer className={styles.footer}>
        <strong>Browse Menu</strong>
        <span>Flower on TV1 / Pre-rolls / Vapes / Edibles / Concentrates / Accessories</span>
        <small>Updated {loadedAt || "--"}</small>
      </footer>
    </main>
  );
}
