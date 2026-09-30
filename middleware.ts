import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = process.env.AUTH_COOKIE_NAME || "tesla_erp_session";

const PROTECTED_PREFIXES = [
  "/dashboard",
  "/users",
  "/roles",
  "/inventory",
  "/customers",
  "/sales",
  "/installments",
  "/suppliers",
  "/purchases",
  "/engineers",
  "/service-orders",
  "/reports",
];

function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isProtectedPath(pathname) && pathname !== "/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  const secret = process.env.AUTH_SECRET;

  let authenticated = false;
  if (token && secret && secret.length >= 32) {
    try {
      await jwtVerify(token, new TextEncoder().encode(secret));
      authenticated = true;
    } catch {
      authenticated = false;
    }
  }

  if (pathname === "/login") {
    if (authenticated) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (!authenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/dashboard/:path*",
    "/users/:path*",
    "/roles/:path*",
    "/inventory/:path*",
    "/customers/:path*",
    "/sales/:path*",
    "/installments/:path*",
    "/suppliers/:path*",
    "/purchases/:path*",
    "/engineers/:path*",
    "/service-orders/:path*",
    "/reports/:path*",
  ],
};
