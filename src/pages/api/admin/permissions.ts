import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { isAdmin } from "@/utils/auth";

const prisma = new PrismaClient();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const permissions = await prisma.permission.findMany({
      orderBy: {
        id: "asc",
      },
    });

    res.json({
      code: 0,
      data: {
        list: permissions,
        total: permissions.length,
      },
    });
  } catch (error) {
    console.error("Get permissions error:", error);
    res.status(500).json({
      code: 1,
      msg: "获取权限列表失败",
    });
  } finally {
    await prisma.$disconnect();
  }
}

export default isAdmin(handler);
