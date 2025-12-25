import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";
import createMiddleware from 'next-intl/middleware';
import { routing } from "./i18n/routing";
import { errorResponse } from "./lib/api-response";

// 路由认证配置
const routeConfig = [
  {
    path: '/api/user/profile',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // 所有方法都需要认证
  },
  {
    path: '/api/model',
    methods: ['POST', 'PUT', 'DELETE'], // 只有这些方法需要认证，GET 不需要
  },

];

// 检查路径和方法是否需要认证
function requiresAuth(pathname: string, method: string): boolean {
  return routeConfig.some((config) => {
    const pathMatch = config.path.endsWith('/*')
      ? pathname.startsWith(config.path.slice(0, -2))
      : pathname === config.path;
    
    return pathMatch && config.methods.includes(method);
  });
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;
  const isApiRoute = pathname.startsWith("/api");
  
  // 1. 判断是否需要认证
  const needsAuth = requiresAuth(pathname, method);
  
  if (!needsAuth) {
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
    response.headers.set("x-locale", defaultLocale);

    return response;
  }
}

export const config = {
  matcher: ["/api/:path*"],
};
