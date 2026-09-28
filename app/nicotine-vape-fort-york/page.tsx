import type { Metadata } from "next";
import AuthorityLanding from "../components/AuthorityLanding";
import { AUTHORITY_PAGES } from "../lib/authorityPages";
export const metadata: Metadata = { title: { absolute: "Nicotine Vape Fort York Blvd & CityPlace, Downtown Toronto | Fort York Cannabis" }, description: AUTHORITY_PAGES.vape.summary, alternates: { canonical: "/nicotine-vape-fort-york" } };
export default function Page() { return <AuthorityLanding page={AUTHORITY_PAGES.vape} />; }
