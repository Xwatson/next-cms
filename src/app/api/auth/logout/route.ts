import { NextRequest, NextResponse } from "next/server";
import { clearTokenCookie } from "@/utils/auth";
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const response = NextResponse.json({
      code: 0,
      msg: "退出登录成功",
    });

    // 清除 cookie
    clearTokenCookie(response);

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      {
        code: 1,
        msg: "退出登录失败",
      },
      { status: 500 }
    );
  }
}
