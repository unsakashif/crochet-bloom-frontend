import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_COOKIE = "cb_admin";
const PREVIEW_COOKIE = "cb_store_preview";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasAdmin = Boolean(request.cookies.get(ADMIN_COOKIE)?.value);
  const preview = request.cookies.get(PREVIEW_COOKIE)?.value === "1";
  const isStaticAsset =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/brand/") ||
    /^\/products\/.+\.(jpe?g|png|webp|gif|svg)$/i.test(pathname) ||
    pathname === "/favicon.ico";

  if (isStaticAsset || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Admin owns the product surface unless storefront preview is enabled
  if (hasAdmin && !preview && !pathname.startsWith("/admin")) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  if (
    !hasAdmin &&
    pathname.startsWith("/admin") &&
    !pathname.startsWith("/admin/login")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/((?!_next/static|_next/image|favicon.ico).*)"],
};
