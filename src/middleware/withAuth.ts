import { NextApiRequest, NextApiResponse } from "next";
import { TokenPayload } from "@/utils/auth";

declare module "next" {
  interface NextApiRequest {
    user?: TokenPayload;
  }
}

type MiddlewareFunction = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => Promise<void>
) => Promise<void> | void;

export const withMiddleware =
  (...middlewares: MiddlewareFunction[]) =>
  async (req: NextApiRequest, res: NextApiResponse, handler: any) => {
    try {
      let index = 0;
      const next = async () => {
        if (index < middlewares.length) {
          await middlewares[index++](req, res, next);
        } else {
          await handler(req, res);
        }
      };
      await next();
    } catch (error) {
      console.error("Middleware error:", error);
      res.status(500).json({ message: "服务器错误" });
    }
  };
