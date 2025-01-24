import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { isAdmin } from "@/utils/auth";

const prisma = new PrismaClient();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const roleId = Number(id);

  switch (req.method) {
    case "GET":
      return handleGet(roleId, res);
    case "PUT":
      return handlePut(roleId, req, res);
    case "DELETE":
      return handleDelete(roleId, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

// 获取角色详情
async function handleGet(id: number, res: NextApiResponse) {
  try {
    const role = await prisma.role.findUnique({
      where: { id },
      include: {
        permissions: true,
      },
    });

    if (!role) {
      return res.status(404).json({
        code: 1,
        msg: "角色不存在",
      });
    }

    res.json({
      code: 0,
      data: role,
    });
  } catch (error) {
    console.error("Get role error:", error);
    res.status(500).json({
      code: 1,
      msg: "获取角色详情失败",
    });
  }
}

// 更新角色
async function handlePut(id: number, req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, description, permissionIds } = req.body;

    const role = await prisma.role.update({
      where: { id },
      data: {
        name,
        description,
        permissions: {
          set: permissionIds.map((id: number) => ({ id })),
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
    console.error("Update role error:", error);
    res.status(500).json({
      code: 1,
      msg: "更新角色失败",
    });
  }
}

// 删除角色
async function handleDelete(id: number, res: NextApiResponse) {
  try {
    const role = await prisma.role.findUnique({
      where: { id },
    });

    if (!role) {
      return res.status(404).json({
        code: 1,
        msg: "角色不存在",
      });
    }

    if (role.code === "super_admin") {
      return res.status(403).json({
        code: 1,
        msg: "超级管理员角色不能删除",
      });
    }

    await prisma.role.delete({
      where: { id },
    });

    res.json({
      code: 0,
      msg: "删除成功",
    });
  } catch (error) {
    console.error("Delete role error:", error);
    res.status(500).json({
      code: 1,
      msg: "删除角色失败",
    });
  }
}

export default isAdmin(handler);
