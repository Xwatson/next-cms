import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

const TOKEN_COOKIE_NAME = "token";
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key"
);

interface TokenPayload {
  id: string;
  email: string;
  name: string;
  roleStr: string;
}

// 验证 token
const verifyToken = async (token: string): Promise<TokenPayload | null> => {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET);
    return payload as unknown as TokenPayload;
  } catch (error) {
    return null;
  }
};

export async function middleware(request: NextRequest) {
  // 获取token
  const token = request.cookies.get(TOKEN_COOKIE_NAME)?.value;

  // 检查是否是需要验证的路由
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  const isApiRoute = request.nextUrl.pathname.startsWith("/api");
  const isAuthRoute = request.nextUrl.pathname.startsWith("/api/auth");
  const isLoginPage = request.nextUrl.pathname === "/login";

  // 如果已登录且访问登录页，重定向到管理后台
  if (isLoginPage && token) {
    const decoded = await verifyToken(token);
    if (decoded) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  // 登录接口和非管理后台路由不需要验证
  if (isAuthRoute || !isAdminRoute) {
    return NextResponse.next();
  }

  // 验证管理后台路由的token
  if (!token) {
    if (isApiRoute) {
      return NextResponse.json({ message: "未登录" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 验证 token 并检查权限
  const decoded = await verifyToken(token);
  if (!decoded) {
    if (isApiRoute) {
      return NextResponse.json(
        { message: "未登录或登录已过期" },
        { status: 401 }
      );
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 验证管理员权限
  if (
    isAdminRoute &&
    decoded.roleStr !== "super_admin" &&
    decoded.roleStr !== "admin"
  ) {
    if (isApiRoute) {
      return NextResponse.json({ message: "没有管理员权限" }, { status: 403 });
    }
    return NextResponse.redirect(new URL("/403", request.url));
  }

  return NextResponse.next();
}

// 配置需要进行中间件处理的路由
export const config = {
  matcher: ["/admin/:path*", "/api/:path*", "/login"],
};
