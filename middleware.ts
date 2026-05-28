import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from 'next-auth/jwt';

const locales = ["en", "ar"];
const defaultLocale = "en";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for API routes and public files
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".") // This usually catches files like favicon.ico, images, etc.
  ) {
    return NextResponse.next();
  }

  let locale = defaultLocale;
  const pathnameHasLocale = locales.some(
    (loc) => {
      if (pathname.startsWith(`/${loc}`)) {
        locale = loc;
        return true;
      }
      return false;
    }
  );

  let finalUrl = request.nextUrl;
  let redirected = false;

  if (!pathnameHasLocale) {
    request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
    finalUrl = request.nextUrl;
    redirected = true;
  }

  // Dashboard role-based protection
  const isDashboardPath = request.nextUrl.pathname.includes('/dashboard');

  if (isDashboardPath) {
    const useSecureCookie = process.env.NEXTAUTH_URL?.startsWith('https://') || !!request.cookies.get('__Secure-next-auth.session-token');
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
      secureCookie: useSecureCookie
    });

    if (!token) {
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }

    const role = token.role as string;
    const isSuperAdmin = role === 'super_admin';
    const isAdmin = role === 'admin';

    // Protect ecommerce-specific sub-routes if necessary
    if (request.nextUrl.pathname.startsWith(`/${locale}/dashboard/ecommerce`) && !isSuperAdmin && !isAdmin) {
      return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
    }
  }

  if (redirected) {
    return NextResponse.redirect(finalUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};


export default middleware;