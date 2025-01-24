import { NextApiRequest, NextApiResponse } from "next";
import { clearTokenCookie } from "@/utils/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // 清除 cookie
    clearTokenCookie(res);

    res.json({
      code: 0,
      msg: "退出登录成功",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      code: 1,
      msg: "退出登录失败",
    });
  }
}
