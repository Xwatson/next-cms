import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { withMiddleware } from "@/middleware/withAuth";
import { isAdmin, hasPermission } from "@/utils/auth";
import { UserStatus, UserCreateInput } from "@/types/user";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const data = req.body as UserCreateInput;
      
      // 验证必填字段
      if (!data.email || !data.password || !data.roleId) {
        return res.status(400).json({ message: "邮箱、密码和角色为必填项" });
      }

      // 检查邮箱是否已存在
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser) {
        return res.status(400).json({ message: "该邮箱已被注册" });
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
      return res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error("创建用户失败:", error);
      return res.status(500).json({ message: "创建用户失败" });
    }
  }

  if (req.method !== "GET") {
    return res.status(405).json({ message: "方法不允许" });
  }

  try {
    const { page = "1", pageSize = "10", keyword, roleId, status } = req.query;

    // 构建查询条件
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

    // 分页查询
    const [total, users] = await Promise.all([
      prisma.user.count({ where }),
      prisma.user.findMany({
        where,
        include: {
          role: {
            select: {
              id: true,
              name: true,
              code: true,
            },
          },
        },
        skip: (Number(page) - 1) * Number(pageSize),
        take: Number(pageSize),
        orderBy: {
          id: "desc",
        },
      }),
    ]);

    res.json({
      code: 0,
      message: "success",
      data: {
        list: users,
        total,
        page: Number(page),
        pageSize: Number(pageSize),
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      code: 1,
      message: "获取用户列表失败",
    });
  } finally {
    await prisma.$disconnect();
  }
}

// 使用中间件进行权限验证
export default isAdmin(handler);
