import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { isAdmin } from "@/utils/auth";

const prisma = new PrismaClient();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const userId = Number(id);

  switch (req.method) {
    case "GET":
      return handleGet(userId, res);
    case "PUT":
      return handlePut(userId, req, res);
    case "DELETE":
      return handleDelete(userId, res);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

// 获取用户详情
async function handleGet(id: number, res: NextApiResponse) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        role: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        code: 1,
        msg: "用户不存在",
      });
    }

    res.json({
      code: 0,
      data: user,
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({
      code: 1,
      msg: "获取用户详情失败",
    });
  }
}

// 更新用户
async function handlePut(id: number, req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, password, roleId, status } = req.body;

    const user = await prisma.user.findUnique({
      where: { id },
      include: { role: true },
    });

    if (!user) {
      return res.status(404).json({
        code: 1,
        msg: "用户不存在",
      });
    }

    // 不允许修改超级管理员的角色
    if (user.role.code === "super_admin" && roleId && roleId !== user.roleId) {
      return res.status(403).json({
        code: 1,
        msg: "不能修改超级管理员的角色",
      });
    }

    const data: any = {
      name,
      roleId: roleId ? Number(roleId) : undefined,
      status,
    };

    // 如果提供了密码，则更新密码
    if (password) {
      data.password = await hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data,
      include: {
        role: true,
      },
    });

    res.json({
      code: 0,
      data: updatedUser,
    });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({
      code: 1,
      msg: "更新用户失败",
    });
  }
}

// 删除用户
async function handleDelete(id: number, res: NextApiResponse) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { role: true },
    });

    if (!user) {
      return res.status(404).json({
        code: 1,
        msg: "用户不存在",
      });
    }

    if (user.role.code === "super_admin") {
      return res.status(403).json({
        code: 1,
        msg: "超级管理员不能删除",
      });
    }

    await prisma.user.delete({
      where: { id },
    });

    res.json({
      code: 0,
      msg: "删除成功",
    });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({
      code: 1,
      msg: "删除用户失败",
    });
  }
}

export default isAdmin(handler);
