import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { isAdmin } from "@/utils/auth";

const prisma = new PrismaClient();

const getRoles = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { page = 1, pageSize = 10, keyword } = req.query;

    const where = keyword
      ? {
          OR: [
            { name: { contains: String(keyword) } },
            { code: { contains: String(keyword) } },
          ],
        }
      : {};

    const [total, roles] = await Promise.all([
      prisma.role.count({ where }),
      prisma.role.findMany({
        where,
        include: {
          permissions: true,
        },
        skip: (Number(page) - 1) * Number(pageSize),
        take: Number(pageSize),
        orderBy: {
          id: "asc",
        },
      }),
    ]);

    res.json({
      code: 0,
      data: {
        list: roles,
        total,
        page: Number(page),
        pageSize: Number(pageSize),
      },
    });
  } catch (error) {
    console.error("Get roles error:", error);
    res.status(500).json({
      code: 1,
      msg: "获取角色列表失败",
    });
  }
};

const createRole = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, code, description, permissionIds } = req.body;

    // 检查角色标识是否已存在
    const existingRole = await prisma.role.findUnique({
      where: { code },
    });

    if (existingRole) {
      return res.status(400).json({
        code: 1,
        msg: "角色标识已存在",
      });
    }

    const role = await prisma.role.create({
      data: {
        name,
        code,
        description,
        permissions: {
          connect: permissionIds.map((id: number) => ({ id })),
        },
      },
      include: {
        permissions: true,
      },
    });

    res.json({
      code: 0,
      data: role,
    });
  } catch (error) {
    console.error("Create role error:", error);
    res.status(500).json({
      code: 1,
      msg: "创建角色失败",
    });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return getRoles(req, res);
    case "POST":
      return createRole(req, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
};

export default isAdmin(handler);
