import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const { name, roleId, status, password, phone } = await req.json();

    // 验证必填字段
    if (!id || Number.isNaN(id) || !name || !roleId || !password || !status) {
      return NextResponse.json({ code: 1, msg: "参数错误" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (phone && phone !== user?.phone) {
      const existingPhone = await prisma.user.findUnique({
        where: { phone },
      });

      if (existingPhone) {
        return NextResponse.json(
          { code: 1, msg: "该手机已被注册" },
          { status: 400 }
        );
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updateUser = await prisma.user.update({
      where: { id },
      data: {
        password: hashedPassword,
        phone,
        name,
        roleId,
        status,
      },
    });

    return NextResponse.json(
      { code: 0, msg: "success", data: updateUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("更新用户失败:", error);
    return NextResponse.json({ code: 1, msg: "更新用户失败" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    if (!id || Number.isNaN(id)) {
      return NextResponse.json({ code: 1, msg: "参数错误" }, { status: 400 });
    }
    const user = await prisma.user.delete({ where: { id } });
    return NextResponse.json(
      { code: 0, msg: "success", data: user },
      { status: 200 }
    );
  } catch (error) {
    console.error("删除用户失败:", error);
    return NextResponse.json({ code: 1, msg: "删除用户失败" }, { status: 500 });
  }
}
