import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import { generateToken, setTokenCookie } from "@/utils/auth";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { email, password } = req.body;

    // 查找用户
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        role: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        code: 1,
        msg: "用户不存在",
      });
    }

    if (user.status === "LOCKED") {
      return res.status(403).json({ message: "账号已被锁定" });
    }

    if (user.status === "INACTIVE") {
      return res.status(403).json({ message: "账号未激活" });
    }

    // 验证密码
    const isValid = await compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({
        code: 1,
        msg: "密码错误",
      });
    }

    // 更新最后登录信息
    await prisma.user.update({
      where: { id: user.id },
      data: {
        lastLoginTime: new Date(),
        lastLoginIp:
          req.headers["x-forwarded-for"]?.toString() ||
          req.socket.remoteAddress ||
          "",
      },
    });

    // 生成 token
    const token = await generateToken({
      id: user.id.toString(),
      name: user.name!,
      email: user.email,
      roleStr: user.role.code,
    });

    // 设置 cookie
    setTokenCookie(res, token);

    res.json({
      code: 0,
      message: "登录成功",
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      code: 1,
      msg: "服务器错误",
    });
  } finally {
    await prisma.$disconnect();
  }
}
