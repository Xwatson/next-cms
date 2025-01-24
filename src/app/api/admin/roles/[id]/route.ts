import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const { name, code, description, permissionIds } = await req.json();

    // 验证必填字段
    if (!id || Number.isNaN(id) || !name || !code) {
      return NextResponse.json(
        { code: 1, msg: "角色 ID、名称和标识为必填项" },
        { status: 400 }
      );
    }

    const role = await prisma.role.update({
      where: { id },
      data: {
        name,
        code,
        description,
        ...(permissionIds && {
          permissions: {
            set: [],
            connect: permissionIds.map((id: number) => ({ id })),
          },
        }),
      },
      include: {
        permissions: true,
      },
    });

    return NextResponse.json(
      { code: 0, msg: "success", data: role },
      { status: 200 }
    );
  } catch (error) {
    console.error("更新角色失败:", error);
    return NextResponse.json({ code: 1, msg: "更新角色失败" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);

    if (Number.isNaN(id)) {
      return NextResponse.json(
        { code: 1, msg: "角色 ID 为必填项" },
        { status: 400 }
      );
    }

    const role = await prisma.role.delete({
      where: { id },
    });

    return NextResponse.json(
      { code: 0, msg: "success", data: role },
      { status: 200 }
    );
  } catch (error) {
    console.error("删除角色失败:", error);
    return NextResponse.json({ code: 1, msg: "删除角色失败" }, { status: 500 });
  }
}
