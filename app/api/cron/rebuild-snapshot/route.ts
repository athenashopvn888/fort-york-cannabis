import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Daily Vercel cron (see vercel.json). Triggers this project's deploy hook so the build-time
 * menu snapshot (prebuild feed fetch) is rebuilt from the shared feed at least once a day,
 * which keeps the bundled backup menu no older than ~1 day. Grok 2026-10-08.
 * Needs env SNAPSHOT_REBUILD_HOOK_URL (Vercel deploy hook) and CRON_SECRET (Vercel sends it).
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const hook = (process.env.SNAPSHOT_REBUILD_HOOK_URL || "").trim();
  if (!hook) return NextResponse.json({ ok: false, error: "SNAPSHOT_REBUILD_HOOK_URL not set" }, { status: 500 });
  try {
    const res = await fetch(hook, { method: "POST", signal: AbortSignal.timeout(15000) });
    return NextResponse.json({ ok: res.ok, status: res.status }, { status: res.ok ? 200 : 502 });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 502 });
  }
}
