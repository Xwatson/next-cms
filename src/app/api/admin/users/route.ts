import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { UserStatus, UserCreateInput } from "@/types/user";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// GET 处理器
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;
  const keyword = searchParams.get("keyword");
  const roleId = searchParams.get("roleId");
  const status = searchParams.get("status");

  try {
    const where = {
      ...(keyword
        ? {
            OR: [
              { name: { contains: String(keyword) } },
              { email: { contains: String(keyword) } },
            ],
          }
        : {}),
      ...(roleId ? { roleId: Number(roleId) } : {}),
      ...(status ? { status: status as UserStatus } : {}),
    };

    const [total, users] = await Promise.all([
      prisma.user.count({ where }),
      prisma.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          status: true,
          lastLoginTime: true,
          createdAt: true,
          role: {
            select: {
              id: true,
              name: true,
              code: true,
            },
          },
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: {
          createdAt: "desc",
        },
      }),
    ]);

    return NextResponse.json({
      code: 0,
      msg: "success",
      data: {
        list: users,
        pagination: {
          current: page,
          pageSize,
          total,
        },
      },
    });
  } catch (error) {
    console.error("获取用户列表失败:", error);
    return NextResponse.json(
      { code: 1, msg: "获取用户列表失败" },
      { status: 500 }
    );
  }
}

// POST 处理器
export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as UserCreateInput;

    // 验证必填字段
    if (!data.email || !data.password || !data.roleId) {
      return NextResponse.json(
        { code: 1, msg: "邮箱、密码和角色为必填项" },
        { status: 400 }
      );
    }

    // 检查邮箱是否已存在
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { code: 1, msg: "该邮箱已被注册" },
        { status: 400 }
      );
    }

    // 检查手机是否已存在
    const existingPhone = await prisma.user.findUnique({
      where: { phone: data.phone },
    });

    if (existingPhone) {
      return NextResponse.json(
        { code: 1, msg: "该手机已被注册" },
        { status: 400 }
      );
    }

    // 密码加密
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // 创建用户
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name || null,
        avatar: data.avatar || null,
        phone: data.phone || null,
        roleId: data.roleId,
        status: data.status || UserStatus.ACTIVE,
      },
    });

    // 移除密码后返回用户信息
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json(
      { code: 0, msg: "success", data: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error("创建用户失败:", error);
    return NextResponse.json({ code: 1, msg: "创建用户失败" }, { status: 500 });
  }
}
