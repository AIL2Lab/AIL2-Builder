import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 需要保护的路径
const PROTECTED_PATHS = ['/admin'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 检查是否是受保护的路径
  const isProtected = PROTECTED_PATHS.some((path) =>
    pathname.startsWith(path)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  // 排除登录页面本身
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // 检查 session cookie
  const authSession = request.cookies.get('admin_session');

  if (!authSession || authSession.value !== 'authenticated') {
    // 未认证，重定向到登录页
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
