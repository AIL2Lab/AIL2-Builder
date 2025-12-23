import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";
import createMiddleware from 'next-intl/middleware';
import { routing } from "./i18n/routing";
import { errorResponse } from "./lib/api-response";
// 需要认证的路由匹配规则
const protectedPaths: string[] = [
  // '/api/model/list',
  '/api/user/profile',
  '/api/model'
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isApiRoute = pathname.startsWith("/api");
  // 1. 判断是否是受保护路径
  const isProtected = protectedPaths.some((path) => pathname === path);
  
  if (!isProtected) {
    return NextResponse.next();
  }

  if (isApiRoute) {
    // 2. 获取 Authorization Header
    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return errorResponse(
        "Unauthorized: Missing Token.",
        401,
      )
    }

    // 3. 提取并验证 Token
    const token = authHeader.split(" ")[1];
    const payload = await verifyToken(token);

    if (!payload) {
      return errorResponse(
        "Unauthorized: Token is invalid or expired.",
        401,
      )
    }

    // 4. 【关键】将用户信息传递给 Server Components
    // 由于中间件不能直接传对象给组件，我们通过设置新的 Request Headers 传递
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", payload.userId);
    requestHeaders.set("x-user-address", payload.address);
    
    // 5. 放行请求，并带上新的 Headers
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } else {
    const defaultLocale : any = request.headers.get('x-locale')  || routing.defaultLocale;
    const handleI18nRouting = createMiddleware({
      locales: routing.locales,
      defaultLocale,
    });
    const response = handleI18nRouting(request);

    // Step 3: Alter the response (example)
    response.headers.set("x-locale", defaultLocale);

    return response;
  }
}

export const config = {
  matcher: ["/api/:path*"],
};
