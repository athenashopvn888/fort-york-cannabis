import Link from "next/link";
import type { GuideEntry } from "../lib/guideRegistry";
export default function GuideStrip({ groups }: { groups: { label: string; guides: GuideEntry[] }[] }) {
  if (!groups.length) return null;
  return <nav aria-label="Related name guides" style={{padding:"22px 20px",background:"#f5fff1",borderBlock:"1px solid rgba(11,77,50,.16)"}}><div style={{width:"min(100% - 1rem,1200px)",margin:"auto"}}>{groups.map((group) => <section key={group.label} style={{marginBottom:groups.length > 1 ? 16 : 0}}><h2 style={{fontSize:"1.1rem",margin:"0 0 10px",color:"#0b4d32"}}>{group.label}</h2><div style={{display:"flex",flexWrap:"wrap",gap:8}}>{group.guides.map((guide) => <Link key={guide.slug} href={`/guides/${guide.slug}`} style={{padding:"8px 12px",border:"1px solid #b9d8c5",borderRadius:999,background:"white",color:"#0b4d32",fontWeight:800,textDecoration:"none"}}>{guide.name}</Link>)}</div></section>)}</div></nav>;
}
