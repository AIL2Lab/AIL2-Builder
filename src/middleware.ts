import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Page routes that require an authenticated admin session. Failure mode is
// a redirect to the login page so the user lands somewhere usable.
const PROTECTED_PAGE_PREFIXES = ['/admin'];

// API routes that require an authenticated admin session. Failure mode is
// a 401 JSON response — never redirect, since the caller is fetch / curl,
// not a human browser.
const PROTECTED_API_PREFIX = '/api/admin';

// State-changing HTTP methods we additionally guard against cross-origin
// abuse (CSRF). Idempotent / read-only verbs are not gated this way so
// e.g. status pings and HEAD probes from monitoring still work.
const CSRF_GUARDED_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

function isAuthenticated(request: NextRequest): boolean {
  const session = request.cookies.get('admin_session');
  return session?.value === 'authenticated';
}

// CSRF defense: require Origin (or fallback Referer) of state-changing
// requests to match this server's host. Browsers attach Origin automatically
// on cross-site requests and refuse to let the page forge it; an attacker
// page on evil.example trying to POST to our admin API will land here with
// an Origin that doesn't match Host and get rejected.
function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin') ?? request.headers.get('referer');
  if (!origin) {
    // No Origin header is the typical case for a same-origin form submission
    // in older browsers. We accept it because forcing strict header presence
    // would break legitimate clients; real browsers send Origin on fetch().
    return true;
  }
  try {
    const originUrl = new URL(origin);
    const host = request.headers.get('host');
    return host !== null && originUrl.host === host;
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Login endpoint is intentionally public — that's how unauthenticated
  // users acquire the session cookie. We still apply the CSRF check on the
  // POST so an attacker can't trigger login from another origin.
  if (pathname === '/admin/login' || pathname === '/api/admin/login') {
    if (
      pathname === '/api/admin/login' &&
      CSRF_GUARDED_METHODS.has(request.method) &&
      !isSameOrigin(request)
    ) {
      return NextResponse.json({ error: 'Cross-origin request blocked' }, { status: 403 });
    }
    return NextResponse.next();
  }

  if (pathname.startsWith(PROTECTED_API_PREFIX)) {
    if (!isAuthenticated(request)) {
      return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
    }
    if (CSRF_GUARDED_METHODS.has(request.method) && !isSameOrigin(request)) {
      return NextResponse.json({ error: 'Cross-origin request blocked' }, { status: 403 });
    }
    return NextResponse.next();
  }

  if (PROTECTED_PAGE_PREFIXES.some((p) => pathname.startsWith(p))) {
    if (!isAuthenticated(request)) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Cover both page routes (/admin) and the now-gated API surface
  // (/api/admin), so the auth + CSRF check above runs for every protected
  // request without per-route boilerplate.
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
