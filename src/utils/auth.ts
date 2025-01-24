import { NextResponse } from "next/server";
import type { NextApiRequest, NextApiResponse } from "next/types";
import jwt from "jsonwebtoken";
import { RoleCode } from "@/types/permission";
import { TokenPayload } from "@/types/auth";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const TOKEN_COOKIE_NAME = "token";

export async function generateToken(payload: TokenPayload): Promise<string> {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
}

export function getTokenFromHeader(authHeader?: string | null): string | null {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.split(" ")[1];
}

export function getTokenFromCookie(req: NextApiRequest): string | null {
  return req.cookies[TOKEN_COOKIE_NAME] || null;
}

export function setTokenCookie(response: NextResponse | NextApiResponse, token: string) {
  if (response instanceof NextResponse) {
    response.cookies.set({
      name: TOKEN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60, // 1 day
    });
  } else {
    response.setHeader(
      "Set-Cookie",
      `${TOKEN_COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400${
        process.env.NODE_ENV === "production" ? "; Secure" : ""
      }`
    );
  }
}

export function clearTokenCookie(response: NextResponse | NextApiResponse) {
  if (response instanceof NextResponse) {
    response.cookies.delete(TOKEN_COOKIE_NAME);
  } else {
    response.setHeader(
      "Set-Cookie",
      `${TOKEN_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`
    );
  }
}

type NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

export const isAuthenticated = (handler: NextApiHandler): NextApiHandler => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const token = getTokenFromCookie(req) || getTokenFromHeader(req.headers.authorization);
      if (!token) {
        return res.status(401).json({ message: "未登录" });
      }

      const decoded = verifyToken(token);
      req.user = decoded;
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ message: "Token 无效或已过期" });
    }
  };
};

export const isAdmin = (handler: NextApiHandler): NextApiHandler => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const token = getTokenFromCookie(req) || getTokenFromHeader(req.headers.authorization);
      if (!token) {
        return res.status(401).json({ message: "未登录" });
      }

      const decoded = verifyToken(token);
      if (
        decoded.roleStr !== RoleCode.SUPER_ADMIN &&
        decoded.roleStr !== RoleCode.ADMIN
      ) {
        return res.status(403).json({ message: "无权限访问" });
      }

      req.user = decoded;
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ message: "Token 无效或已过期" });
    }
  };
};

export const hasPermission = (permission: string) => {
  return (handler: NextApiHandler): NextApiHandler => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
      try {
        const token = getTokenFromCookie(req) || getTokenFromHeader(req.headers.authorization);
        if (!token) {
          return res.status(401).json({ message: "未登录" });
        }

        const decoded = verifyToken(token);

        // 超级管理员默认拥有所有权限
        if (decoded.roleStr === RoleCode.SUPER_ADMIN) {
          req.user = decoded;
          return handler(req, res);
        }

        // TODO: 检查用户是否有指定权限
        req.user = decoded;
        return handler(req, res);
      } catch (error) {
        return res.status(401).json({ message: "Token 无效或已过期" });
      }
    };
  };
};
