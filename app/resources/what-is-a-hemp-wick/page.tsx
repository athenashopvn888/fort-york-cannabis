import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import styles from "./article.module.css";

const TITLE = "What Is a Hemp Wick? The Fort York Desk Breaks Down the String That Lights Your Bowl";
const CANONICAL = "https://fortyorkcannabis.com/resources/what-is-a-hemp-wick";
const DESCRIPTION =
  "Here's the short version of what is a hemp wick, how people use it, and what to watch out for.";

const BODY = `# What Is a Hemp Wick? The Fort York Desk Breaks Down the String That Lights Your Bowl

Last checked: October 30, 2026

**Desk note:** you've seen it coiled on a lighter, wound like twine, burning with a small steady flame. Here's the short version of **what is a hemp wick**, how people use it, and what to watch out for. For adults 19+. No product picks. No claims about flower.

## What is a hemp wick?

A hemp wick is a length of hemp string coated in wax, usually beeswax. You light one end with a lighter or match, then use that small flame to light a bowl, a joint or a cone. The lighter does the first spark; the wick does the rest.

That's it. String, wax, flame.

## Why people use one

- **A smaller, steadier flame.** A wick's flame is modest, which makes it easier to aim at one corner of a bowl.
- **No thumb on the lighter wheel for ages.** You light the wick once and use it for the session.
- **Less lighter in your face.** The flame sits at the end of the string, not right under your nose.
- **Taste preference.** Some people simply prefer it to lighting straight from a butane lighter. That's a matter of taste, not a fact we can measure for you.

## How to use a hemp wick, step by step

1. **Unwind a short length.** A few centimetres is enough. Leave the rest coiled.
2. **Light the tip.** Use your lighter or a match on the free end.
3. **Let it catch.** Give it a second to burn steadily.
4. **Bring the flame to the bowl.** Touch it to one edge of the flower and pull gently.
5. **Put it out.** Pinch carefully with damp fingers, blow it out, or dip it in a glass of water. Then trim the burnt end.

**Desk tip:** wrap the wick around the lighter body. It keeps it tidy and always in reach.

## Hemp wick for joints and cones

Lighting a joint or cone with a hemp wick follows the same idea: rotate the tip slowly in the wick's flame so the end catches evenly. A slow, even light helps the joint burn straight. If you've ever had one run down one side, start there. Our [pre-roll guides](/resources/pre-roll-guides) cover formats if you're comparing joints and cones.

## Safety: before you light, during, after

**Before:** clear the area of paper, curtains and anything that catches easily. Have a glass of water or an ashtray ready.

**During:** don't let the burning end drop. Keep the length short so it can't swing into fabric.

**After:** make sure the end is fully out before you put it down. Wax drips can stay hot.

Hemp wick is flammable string. Treat it like a candle, not a toy, and store it away from children.

## What a hemp wick isn't

- **Not cannabis.** Hemp string comes from the hemp plant, but it's twine, not a product to smoke.
- **Not a lighter replacement.** You still need a flame to start it.
- **Not windproof.** A balcony breeze will put it out quickly.

## Hemp wick vs lighter vs matches

| | Flame size | Upkeep | Notes |
|---|---|---|---|
| Lighter alone | Larger | Refill or replace | Fast, simple |
| Hemp wick | Small, steady | Trim the end | Still needs a lighter or match to start |
| Matches | Small, brief | Carry a box | Short burn time |

## Common mistakes

- **Unwinding too much.** Long lengths flop and drip.
- **Leaving it burning.** It keeps going if you walk away.
- **Using it near drafts.** It struggles outdoors.
- **Skipping the trim.** A charred, frayed end burns unevenly next time.

## Quick answers

**What is a hemp wick made of?** Hemp twine coated in wax, commonly beeswax.

**Can I make my own?** Some people coat hemp twine in melted beeswax at home. Take care with hot wax and open flame.

**Does it work with a bong?** Yes, the same way it works with a pipe.

## Plan the stop

Fort York Cannabis has a quick [CityPlace visit guide](/resources/local-guides/fort-york-cityplace-visit-guide) for getting to the shop. Curious how cannabis plants start out? Read our [clones vs seeds](/resources/clones-vs-seeds-cannabis) explainer. Fort York Cannabis is for adults 19 and over. Staff ask for ID from anyone who looks under 25.`;

const ALLOWED_LINKS = new Set([
  "/resources/clones-vs-seeds-cannabis",
  "/resources/local-guides/fort-york-cityplace-visit-guide",
  "/resources/pre-roll-guides",
]);

function assertArticleCopy() {
  const blob = `${TITLE}\n${DESCRIPTION}\n${BODY}`;
  if (DESCRIPTION.length > 155) throw new Error("Meta description is longer than 155 characters.");
  if (blob.includes("3.5")) throw new Error("Article copy includes a forbidden string.");
  const links = [...BODY.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)];
  if (links.length !== 3) throw new Error("Article body must keep its three internal links.");
  for (const match of links) {
    if (!ALLOWED_LINKS.has(match[2])) throw new Error("Article body includes an unexpected link.");
  }
  if (!BODY.includes("Last checked: October 30, 2026")) throw new Error("Last checked line is missing.");
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
    publishedTime: "2026-11-06",
    modifiedTime: "2026-11-06",
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
  datePublished: "2026-11-06",
  dateModified: "2026-11-06",
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

export default function HempWickPage() {
  return (
    <main className={styles.main}>
      <Navbar />
      <article className={styles.article}>{renderBody(BODY)}</article>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    </main>
  );
}
