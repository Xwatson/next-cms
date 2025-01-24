import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken, getTokenFromHeader } from "./utils/auth";
import { RoleCode } from "./types/permission";

// 不需要登录的路由
const publicRoutes = ["/login", "/", "/api/auth/login"];

// 需要管理员权限的路由
const adminRoutes = ["/admin", "/api/admin"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 公开路由直接放行
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // 获取 token
  const cookieToken = request.cookies.get("token")?.value;
  const headerToken = getTokenFromHeader(request.headers.get("authorization"));
  const token = cookieToken || headerToken;

  if (!token) {
    // API 路由返回 401
    if (pathname.startsWith("/api")) {
      return NextResponse.json(
        { code: 1, msg: "未登录" },
        { status: 401 }
      );
    }
    // 页面路由重定向到登录页
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // 验证 token
    const decoded = verifyToken(token);

    // 检查管理员权限
    if (
      adminRoutes.some((route) => pathname.startsWith(route)) &&
      decoded.roleStr !== RoleCode.SUPER_ADMIN &&
      decoded.roleStr !== RoleCode.ADMIN
    ) {
      if (pathname.startsWith("/api")) {
        return NextResponse.json(
          { code: 1, msg: "无权限访问" },
          { status: 403 }
        );
      }
      return NextResponse.redirect(new URL("/403", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    // token 无效
    if (pathname.startsWith("/api")) {
      return NextResponse.json(
        { code: 1, msg: "登录已过期" },
        { status: 401 }
      );
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
