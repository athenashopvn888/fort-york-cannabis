import type { Metadata } from "next";
import AuthorityLanding from "../components/AuthorityLanding";
import { AUTHORITY_PAGES } from "../lib/authorityPages";
export const metadata: Metadata = { title: { absolute: "Native Cigarettes Fort York Blvd & CityPlace, Downtown Toronto | Fort York Cannabis" }, description: AUTHORITY_PAGES.cigarettes.summary, alternates: { canonical: "/native-cigarettes-fort-york" } };
export default function Page() { return <AuthorityLanding page={AUTHORITY_PAGES.cigarettes} />; }
