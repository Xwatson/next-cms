import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;
  const keyword = searchParams.get("keyword");

  try {
    const where = keyword
      ? {
          OR: [
            { name: { contains: keyword } },
            { code: { contains: keyword } },
          ],
        }
      : {};

    const [total, roles] = await Promise.all([
      prisma.role.count({ where }),
      prisma.role.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          permissions: true,
        },
      }),
    ]);

    return NextResponse.json({
      code: 0,
      msg: "success",
      data: {
        list: roles,
        pagination: {
          current: page,
          pageSize,
          total,
        },
      },
    });
  } catch (error) {
    console.error("获取角色列表失败:", error);
    return NextResponse.json(
      { code: 1, msg: "获取角色列表失败" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, code, description, permissionIds } = await req.json();

    // 验证必填字段
    if (!name || !code) {
      return NextResponse.json(
        { code: 1, msg: "角色名称和标识为必填项" },
        { status: 400 }
      );
    }

    // 检查角色标识是否已存在
    const existingRole = await prisma.role.findFirst({
      where: {
        OR: [{ code }, { name }],
      },
    });

    if (existingRole) {
      return NextResponse.json(
        {
          code: 1,
          msg: existingRole.code === code ? "角色标识已存在" : "角色名称已存在",
        },
        { status: 400 }
      );
    }

    const role = await prisma.role.create({
      data: {
        name,
        code,
        description,
        ...(permissionIds && {
          permissions: {
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
      { status: 201 }
    );
  } catch (error) {
    console.error("创建角色失败:", error);
    return NextResponse.json({ code: 1, msg: "创建角色失败" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
