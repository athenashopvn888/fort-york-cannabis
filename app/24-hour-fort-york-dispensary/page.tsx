import type { Metadata } from "next";
import AuthorityLanding from "../components/AuthorityLanding";
import { AUTHORITY_PAGES } from "../lib/authorityPages";
export const metadata: Metadata = { title: { absolute: "24-Hour Dispensary in Fort York | Fort York Cannabis, Toronto" }, description: AUTHORITY_PAGES.hours.summary, alternates: { canonical: "/24-hour-fort-york-dispensary" } };
export default function Page() { return <AuthorityLanding page={AUTHORITY_PAGES.hours} />; }
