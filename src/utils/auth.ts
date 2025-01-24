import { NextApiRequest, NextApiResponse } from "next";
import * as jose from "jose";
import { User } from "@/types/user";
import { RoleCode } from "@/types/permission";

export const TOKEN_COOKIE_NAME = "token";
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key"
);
export const TOKEN_EXPIRES_IN = "1d"; // token 过期时间为 1 天

// token 相关的类型定义
export interface TokenPayload extends jose.JWTPayload {
  id: string;
  email: string;
  name: string;
  roleStr: string;
}

// 生成 token
export const generateToken = async (payload: TokenPayload): Promise<string> => {
  const token = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRES_IN)
    .sign(JWT_SECRET);
  return token;
};

// 验证 token
export const verifyToken = async (token: string): Promise<TokenPayload> => {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET);
    return payload as TokenPayload;
  } catch (error) {
    throw new Error("Token 无效或已过期");
  }
};

// 从 header 获取 token
export const getTokenFromHeader = (authHeader?: string): string | null => {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.split(" ")[1];
};

// 从 cookie 获取 token
export const getTokenFromCookie = (req: NextApiRequest): string | null => {
  return req.cookies[TOKEN_COOKIE_NAME] || null;
};

// 设置 token cookie
export const setTokenCookie = (res: NextApiResponse, token: string) => {
  res.setHeader(
    "Set-Cookie",
    `${TOKEN_COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400${
      process.env.NODE_ENV === "production" ? "; Secure" : ""
    }`
  );
};

// 清除 token cookie
export const clearTokenCookie = (res: NextApiResponse) => {
  res.setHeader(
    "Set-Cookie",
    `${TOKEN_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`
  );
};

type NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

// 验证用户是否已登录
export const isAuthenticated = (handler: NextApiHandler): NextApiHandler => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const token =
        getTokenFromCookie(req) || getTokenFromHeader(req.headers.authorization);
      if (!token) {
        return res.status(401).json({ message: "未登录" });
      }

      const decoded = await verifyToken(token);
      req.user = decoded;
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ message: "未登录或登录已过期" });
    }
  };
};

// 验证用户是否是管理员
export const isAdmin = (handler: NextApiHandler): NextApiHandler => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const token =
        getTokenFromCookie(req) || getTokenFromHeader(req.headers.authorization);
      if (!token) {
        return res.status(401).json({ message: "未登录" });
      }

      const decoded = await verifyToken(token);
      if (
        decoded.roleStr !== RoleCode.SUPER_ADMIN &&
        decoded.roleStr !== RoleCode.ADMIN
      ) {
        return res.status(403).json({ message: "没有管理员权限" });
      }

      req.user = decoded;
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ message: "未登录或登录已过期" });
    }
  };
};

// 验证用户是否有指定权限
export const hasPermission = (permission: string) => {
  return (handler: NextApiHandler): NextApiHandler => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
      try {
        const token =
          getTokenFromCookie(req) || getTokenFromHeader(req.headers.authorization);
        if (!token) {
          return res.status(401).json({ message: "未登录" });
        }

        const decoded = await verifyToken(token);

        // 超级管理员默认拥有所有权限
        if (decoded.roleStr === RoleCode.SUPER_ADMIN) {
          req.user = decoded;
          return handler(req, res);
        }

        // TODO: 实现具体的权限验证逻辑
        req.user = decoded;
        return handler(req, res);
      } catch (error) {
        return res.status(401).json({ message: "未登录或登录已过期" });
      }
    };
  };
};
