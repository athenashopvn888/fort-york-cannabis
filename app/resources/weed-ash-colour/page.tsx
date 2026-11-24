import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import styles from "./article.module.css";

const TITLE = "Weed Ash Colour: What White, Grey and Black Ash Actually Tell You";
const CANONICAL = "https://fortyorkcannabis.com/resources/weed-ash-colour";
const DESCRIPTION =
  "Here's the thing about weed ash colour: it's one of the most argued-about signs in cannabis, and it's mostly just what burned paper and plant look like.";

const BODY = `# Weed Ash Colour: What White, Grey and Black Ash Actually Tell You

Last checked: November 17, 2026

Fort York Desk note. Somebody taps a joint over the tray, looks down and makes a confident call: "White ash. Good sign." Somebody else sees grey and frowns. Here's the thing about **weed ash colour**: it's one of the most argued-about signs in cannabis, and it's mostly just what burned paper and plant look like. Let's read the tray honestly. For adults 19+.

## What does ash colour mean?

Ash colour means what's left after the paper and flower burned, and how evenly they burned. That's the honest read. It's something you notice in the tray, not a test result.

Directions ready, tray ready. Here's the short version:

| What you see | What people usually notice alongside it |
|---|---|
| Light grey to whitish | An even, steady burn |
| Mid grey, mixed | Normal variation; plenty of ash lands here |
| Dark grey to black flecks | Parts that didn't fully burn, often around a run or a relight |

None of those rows is a pass or a fail.

## What does white ash mean?

White ash means the paper and flower burned down to a light-coloured ash in that spot. That's all it reliably tells you. You'll hear claims that **white ash weed** proves something about how the flower was grown or finished. We're not repeating those, because we haven't found an official source that backs them up, and neither Health Canada's label guide nor any required label line says a word about ash.

## Why is my ash black?

Your ash is black, or has black bits, because some of what was in the paper didn't burn all the way. People tend to notice it with a joint that ran down one side, a roll that went out and got relit, or a bowl that was lit unevenly. That's an observation about the burn, not a verdict on the jar.

If uneven burning is the problem, how you light matters. Our guide to [what a hemp wick is](/resources/what-is-a-hemp-wick) covers a slower, steadier way to light that lots of people like for exactly this reason.

## What changes the colour you see?

A few things people notice, with no chemistry claims attached:

- **The paper.** Different papers leave different-looking ash. Some look whiter, some darker, before the flower even matters.
- **How dry the flower is.** Very dry and fairly moist flower burn differently, and that shows up in the tray.
- **How evenly it's lit.** A clean, even light burns differently from a lopsided one.
- **How tightly it's rolled.** Packed too tight or too loose, the burn changes.
- **Relights.** Every relight is a chance for a dark patch.

Change one of those and the ash can change, even with the same flower.

## Weed ash colour myths: a desk-note checklist

Things you'll hear, and how to treat them:

1. **"White ash means better weed."** Not something we can source. Skip it.
2. **"Black ash means bad weed."** Same problem. It mostly means part didn't burn fully.
3. **"You can judge a jar by one joint's ash."** One roll, one paper, one lighter, one breeze. Too many variables.
4. **"Ash colour is on the label."** It isn't. Health Canada's required label items cover the class, Total THC and Total CBD, net weight, storage conditions, the lot number and packaging date. Nothing about ash.

## So what should you look at instead?

The label. It carries the measured information, the lot number and the packaging date. If something seems genuinely off about a product, Health Canada's label guide says to contact the producer using the details on the label, with the lot number and packaging date handy.

Ash colour is fine to notice. It's just not a report card.

## Quick recap

- **Weed ash colour** shows how the paper and flower burned. That's it.
- **What does white ash mean?** A light-coloured burn in that spot.
- **Why is my ash black?** Something didn't burn fully: often a run, a relight or an uneven light.
- **Better info:** the label.

## Plan the stop

Still curious about weed ash colour, papers or lighting? Fort York Cannabis is happy to talk it through at the counter. Check the [visit page](/visit) for directions before you head out.

Staff ask for ID from anyone who looks under 25.`;

const ALLOWED_LINKS = new Set([
  "/resources/what-is-a-hemp-wick",
  "/visit",
]);

function assertArticleCopy() {
  const blob = `${TITLE}\n${DESCRIPTION}\n${BODY}`;
  if (DESCRIPTION.length > 155) throw new Error("Meta description is longer than 155 characters.");
  if (blob.includes("3.5")) throw new Error("Article copy includes a forbidden string.");
  const links = [...BODY.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)];
  if (links.length !== 2) throw new Error("Article body must keep its two internal links.");
  for (const match of links) {
    if (!ALLOWED_LINKS.has(match[2])) throw new Error("Article body includes an unexpected link.");
  }
  if (!BODY.includes("Last checked: November 17, 2026")) throw new Error("Last checked line is missing.");
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
    publishedTime: "2026-11-24",
    modifiedTime: "2026-11-24",
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
  datePublished: "2026-11-24",
  dateModified: "2026-11-24",
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

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      const start = index;
      while (index < lines.length && /^\d+\.\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\d+\.\s+/, ""));
        index += 1;
      }
      blocks.push(
        <ol key={`ol-${start}`}>
          {items.map((item, itemIndex) => (
            <li key={`oli-${start}-${itemIndex}`}>{inline(item, `oli-${start}-${itemIndex}`)}</li>
          ))}
        </ol>,
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

export default function WeedAshColourPage() {
  return (
    <main className={styles.main}>
      <Navbar />
      <article className={styles.article}>{renderBody(BODY)}</article>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    </main>
  );
}
