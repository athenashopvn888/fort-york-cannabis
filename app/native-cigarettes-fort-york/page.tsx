import type { Metadata } from "next";
import AuthorityLanding from "../components/AuthorityLanding";
import CigaretteUnavailable from "../components/CigaretteUnavailable";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AUTHORITY_PAGES } from "../lib/authorityPages";
import { getCigaretteSnapshot } from "../lib/cigaretteFeed";
export const metadata: Metadata = { title: { absolute: "Native Cigarettes Fort York Blvd & CityPlace, Downtown Toronto | Fort York Cannabis" }, description: AUTHORITY_PAGES.cigarettes.summary, alternates: { canonical: "/native-cigarettes-fort-york" } };
export default async function Page() {
  if (!(await getCigaretteSnapshot()).web.show) {
    return <main><Navbar /><CigaretteUnavailable /><Footer /></main>;
  }
  return <AuthorityLanding page={AUTHORITY_PAGES.cigarettes} />;
}
