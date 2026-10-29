import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import styles from "./article.module.css";

const TITLE = "Clones vs Seeds: Where Cannabis Plants Actually Come From";
const CANONICAL = "https://fortyorkcannabis.com/resources/clones-vs-seeds-cannabis";
const DESCRIPTION =
  "Every bud on a shelf started somewhere, either from a seed or from a snipped branch of another plant.";

const BODY = `# Clones vs Seeds: Where Cannabis Plants Actually Come From

Last checked: October 27, 2026

Every bud on a shelf started somewhere. Either it grew from a seed, or it grew from a snipped branch of another plant. That one fork, clones vs seeds, explains a lot of the words cannabis people throw around: mother plant, cutting, pheno, genetics. Fort York Cannabis keeps it desk-style for adults 19+. Short notes. Clear terms. No grow lecture.

## Clones vs seeds: the one-line version

- **Seed:** a new plant from sexual reproduction. Two parents, new genetic mix.
- **Clone:** a cutting taken from an existing plant and rooted. One parent, same genetics.

That's the core. Everything else builds on it.

## Seeds, explained

A cannabis seed forms when pollen from a male plant reaches a female flower. The seed carries genetics from both parents. Plant a handful of seeds from the same pack and you'll often see differences between them: height, shape, smell, colour. Each seedling is its own genetic individual.

Cannabis people call those visible differences **phenotypes**, or "phenos." Growers sometimes grow out many seeds and pick the one plant they like most. That search is what "pheno hunting" means.

## Clones, explained

A clone is a cutting: a small branch snipped from a healthy plant and encouraged to grow its own roots. Once rooted, it becomes a new plant with the same genetics as the plant it came from.

The plant that supplies the cuttings is called the **mother plant**, or just "the mom." Growers keep a mother plant in leafy growth so it keeps producing new branches to cut.

Cloning is how one standout plant can become many matching plants.

## Clones vs seeds at a glance

| | Seeds | Clones |
|---|---|---|
| Origin | Pollinated female flower | Cutting from a mother plant |
| Parents | Two | One |
| Genetics | New mix each time | Copy of the source plant |
| Plant-to-plant variation | Common | Minimal |
| Starts with | A taproot from the seed | Roots grown from the cut stem |
| Slang | "Beans," "phenos" | "Cuts," "the mom" |

## Why producers often use clones

Notes from the planning desk:

- **Consistency.** Same genetics, plant after plant, makes a crop more predictable.
- **Keeping a keeper.** Once a grower finds a plant worth repeating, cloning preserves it.
- **Skipping the lottery.** Seeds can vary. Clones are already a known quantity.

## Why breeders still need seeds

- **New genetics.** Every new cultivar starts with crossing two parents and growing out seeds.
- **Diversity.** A seed population carries variation a single clone line doesn't.
- **Starting fresh.** A clone line can only copy what already exists.

Both tools, different jobs.

## Terms you'll hear

- **Cut / cutting:** a clone before or after rooting.
- **Mother / mom:** the plant clones are taken from.
- **Pheno:** one plant's visible traits, out of a seed batch.
- **Keeper:** the plant a grower decides to clone.
- **Beans:** slang for seeds.
- **Genetics:** shorthand for a plant's lineage.

## What clones vs seeds does NOT tell you

Quick corrections before you hit the counter:

- **Not on the label.** Whether flower came from a clone or a seed isn't one of the standard lines on a Canadian cannabis label.
- **Not a THC signal.** Only Total THC and Total CBD on a legal label give you those numbers.
- **Not a quality grade.** Great and poor crops can come from either.
- **Not visible in the jar.** A dried bud doesn't show whether its plant was a cutting or a seedling.

## Questions people ask at the desk

**Is a clone an exact copy?** Genetically, it matches its mother plant. How it grows still depends on its environment, so two clones can look a little different.

**Do seeds show up in flower?** In well-grown flower, they shouldn't. Female plants kept away from pollen don't set seed.

**Why do some products mention "genetics" so much?** It's shorthand for lineage. Producers use it in their own descriptions; it's not a regulated label term.

**Which is better, clones or seeds?** No ranking from us. They solve different problems for growers.

## Before you go

The label is your checklist: product class, Total THC, Total CBD, net weight, packaging date. Clones vs seeds is the backstory, not something you need to sort out at the counter.

## The bottom line

Clones vs seeds boils down to copying vs mixing. Seeds bring new genetic combinations from two parents; clones copy one proven plant through a cutting. Producers use clones for consistency and seeds for new genetics. Either way, the label tells you what you need.

Trip planning is on the [Fort York Cannabis visit page](/visit), and the [Fort York pre-roll guides](/resources/pre-roll-guides) cover more format basics. Fort York Cannabis is for adults 19 and over. Staff ask for ID from anyone who looks under 25.`;

const ALLOWED_LINKS = new Set(["/visit", "/resources/pre-roll-guides"]);

function assertArticleCopy() {
  const blob = `${TITLE}\n${DESCRIPTION}\n${BODY}`;
  if (DESCRIPTION.length > 155) throw new Error("Meta description is longer than 155 characters.");
  if (blob.includes("3.5")) throw new Error("Article copy includes a forbidden string.");
  const links = [...BODY.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)];
  if (links.length !== 2) throw new Error("Article body must keep its two internal links.");
  for (const match of links) {
    if (!ALLOWED_LINKS.has(match[2])) throw new Error("Article body includes an unexpected link.");
  }
  if (!BODY.includes("Last checked: October 27, 2026")) throw new Error("Last checked line is missing.");
  if (!BODY.startsWith(`# ${TITLE}`)) throw new Error("Article H1 does not match the title.");
}

assertArticleCopy();

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  authors: [{ name: "Fort York Cannabis" }],
  openGraph: {
    type: "article",
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    siteName: "Fort York Cannabis",
    publishedTime: "2026-10-29",
    modifiedTime: "2026-10-29",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  mainEntityOfPage: CANONICAL,
  url: CANONICAL,
  datePublished: "2026-10-29",
  dateModified: "2026-10-29",
  author: { "@type": "Organization", name: "Fort York Cannabis" },
  publisher: { "@type": "Organization", name: "Fort York Cannabis" },
};

function inline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\((\/[^)\s]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let index = 0;
  for (const match of text.matchAll(pattern)) {
    const start = match.index ?? 0;
    if (start > last) nodes.push(text.slice(last, start));
    if (match[1] && match[2] && ALLOWED_LINKS.has(match[2])) {
      nodes.push(
        <Link key={`${keyPrefix}-link-${index}`} href={match[2]}>
          {match[1]}
        </Link>,
      );
    } else if (match[3]) {
      nodes.push(<strong key={`${keyPrefix}-strong-${index}`}>{match[3]}</strong>);
    }
    last = start + match[0].length;
    index += 1;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function splitRow(line: string) {
  return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());
}

function isSeparator(line: string) {
  const cells = splitRow(line);
  return cells.length > 0 && cells.every((cell) => /^:?-{3,}:?$/.test(cell));
}

function renderBody(markdown: string) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) {
      index += 1;
      continue;
    }

    const heading = /^(#{1,4})\s+(.+)$/.exec(line);
    if (heading) {
      const level = heading[1].length;
      const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4";
      blocks.push(<Tag key={`h-${index}`}>{inline(heading[2], `h-${index}`)}</Tag>);
      index += 1;
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      const start = index;
      while (index < lines.length && /^[-*]\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^[-*]\s+/, ""));
        index += 1;
      }
      blocks.push(
        <ul key={`ul-${start}`}>
          {items.map((item, itemIndex) => (
            <li key={`li-${start}-${itemIndex}`}>{inline(item, `li-${start}-${itemIndex}`)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    if (line.trim().startsWith("|")) {
      const rows: string[][] = [];
      const start = index;
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        if (!isSeparator(lines[index])) rows.push(splitRow(lines[index]));
        index += 1;
      }
      const [head, ...body] = rows;
      if (head) {
        blocks.push(
          <div key={`table-${start}`} className={styles.tableWrap}>
            <table>
              <thead>
                <tr>
                  {head.map((cell, cellIndex) => (
                    <th key={`th-${start}-${cellIndex}`}>{inline(cell, `th-${start}-${cellIndex}`)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {body.map((row, rowIndex) => (
                  <tr key={`tr-${start}-${rowIndex}`}>
                    {row.map((cell, cellIndex) => (
                      <td key={`td-${start}-${rowIndex}-${cellIndex}`}>{inline(cell, `td-${start}-${rowIndex}-${cellIndex}`)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>,
        );
      }
      continue;
    }

    blocks.push(<p key={`p-${index}`}>{inline(line, `p-${index}`)}</p>);
    index += 1;
  }

  return blocks;
}

export default function ClonesVsSeedsPage() {
  return (
    <main className={styles.main}>
      <Navbar />
      <article className={styles.article}>{renderBody(BODY)}</article>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    </main>
  );
}
