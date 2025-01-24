import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { withMiddleware } from "@/middleware/withAuth";
import { isAdmin, hasPermission } from "@/utils/auth";

const prisma = new PrismaClient();

async function handler(req: NextApiRequest, res: NextApiResponse) {
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
      ...(status ? { status: String(status) } : {}),
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
