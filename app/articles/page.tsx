import type { Metadata } from "next";
import Link from "next/link";
import { notFound, unstable_rethrow } from "next/navigation";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { loadFleetArticles, mergeArticleLinks, type MergedArticleLink } from "../lib/fleet/articles";
import { codedResourceLinks, visibleFleetArticles } from "../lib/fleet/codedArticles";
import { FLEET_ARTICLES_PATH, FLEET_ORIGIN, FLEET_STORE_NAME } from "../lib/fleet/config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Articles",
  description: `Guides and articles from ${FLEET_STORE_NAME}.`,
  alternates: { canonical: `${FLEET_ORIGIN}${FLEET_ARTICLES_PATH}` },
};

export default async function ArticlesPage() {
  let links: MergedArticleLink[];
  try {
    const loaded = await loadFleetArticles();
    if (!loaded.ok) notFound();
    links = mergeArticleLinks(codedResourceLinks(), visibleFleetArticles(loaded.articles));
  } catch (error) {
    unstable_rethrow(error);
    notFound();
  }
  return (
    <>
      <Navbar />
      <main>
        <h1>Articles</h1>
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
