import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken, getTokenFromCookie } from "@/utils/auth";

export interface AuthenticatedRequest extends NextApiRequest {
  user?: any;
}

export function withAuth(
  handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>
) {
  return async (req: AuthenticatedRequest, res: NextApiResponse) => {
    try {
      const token = getTokenFromCookie(req);
      if (!token) {
        return res.status(401).json({ message: "未授权访问" });
      }

      const decoded = verifyToken(token);
      if (!decoded) {
        return res.status(401).json({ message: "Token 无效或已过期" });
      }

      req.user = decoded;
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ message: "认证失败" });
    }
  };
}

export function withRole(role: string) {
  return function (
    handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>
  ) {
    return withAuth(async (req: AuthenticatedRequest, res: NextApiResponse) => {
      if (req.user?.role !== role) {
        return res.status(403).json({ message: "没有权限访问" });
      }
      return handler(req, res);
    });
  };
}
