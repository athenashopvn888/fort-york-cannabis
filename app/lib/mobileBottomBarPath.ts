/** In-store displays keep the full screen. /tv2 must not match a /tv prefix. */
export function isTvDisplayPath(pathname: string | null | undefined) {
  if (!pathname) return false;
  return pathname === "/tv" || pathname === "/tv2" || pathname.startsWith("/tv/") || pathname.startsWith("/tv2/");
}
