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
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    
    if (!token) {
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }

    const role = token.role as string;
    const isSuperAdmin = role === 'super_admin';
    const isEcommerceAdmin = role === 'ecommerce_admin';
    const isPosAdmin = role === 'pos_admin';
    
    // Redirect admins to their specific overview pages if they land on the root dashboard
    if (request.nextUrl.pathname === `/${locale}/dashboard` || request.nextUrl.pathname === `/${locale}/dashboard/`) {
      if (isEcommerceAdmin) {
        return NextResponse.redirect(new URL(`/${locale}/dashboard/ecommerce`, request.url));
      }
      if (isPosAdmin) {
        return NextResponse.redirect(new URL(`/${locale}/dashboard/pos`, request.url));
      }
    }

    // Protect ecommerce and pos specific sub-routes if necessary
    // Example: POS admin cannot access /dashboard/ecommerce
    if (request.nextUrl.pathname.startsWith(`/${locale}/dashboard/ecommerce`) && !isSuperAdmin && !isEcommerceAdmin) {
      return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url)); // Fallback redirect
    }

    if (request.nextUrl.pathname.startsWith(`/${locale}/dashboard/pos`) && !isSuperAdmin && !isPosAdmin) {
      return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url)); // Fallback redirect
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