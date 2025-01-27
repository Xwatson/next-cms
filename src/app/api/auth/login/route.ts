import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { getJwtSecretKey } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // 查找用户
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          code: 1,
          msg: "用户不存在",
        },
        { status: 401 }
      );
    }

    if (user.status === "LOCKED") {
      return NextResponse.json(
        { code: 1, msg: "账号已被锁定" },
        { status: 403 }
      );
    }

    if (user.status === "INACTIVE") {
      return NextResponse.json({ code: 1, msg: "账号未激活" }, { status: 403 });
    }

    // 验证密码
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        {
          code: 1,
          msg: "密码错误",
        },
        { status: 401 }
      );
    }

    // 获取客户端 IP
    const forwardedFor = req.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0] : "unknown";

    // 更新最后登录信息
    await prisma.user.update({
      where: { id: user.id },
      data: {
        lastLoginTime: new Date(),
        lastLoginIp: clientIp,
      },
    });

    // 生成 token
    const token = await new SignJWT({
      id: user.id.toString(),
      name: user.name!,
      email: user.email,
      roleStr: user.role.code,
    })
      .setProtectedHeader({ alg: "HS256" })
      .sign(getJwtSecretKey());

    // 创建响应
    const response = NextResponse.json({
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

    // 设置 cookie
    // setTokenCookie(response, token);

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        code: 1,
        msg: "服务器错误",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
