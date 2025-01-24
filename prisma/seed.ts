const { PrismaClient } = require("@prisma/client");
const bcryptjs = require("bcryptjs");

const prisma = new PrismaClient();

// 系统默认角色
const DEFAULT_ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  EDITOR: "editor",
  USER: "user",
} as const;

// 默认权限列表
const DEFAULT_PERMISSIONS = [
  {
    id: "dashboard",
    name: "控制台",
    code: "dashboard",
    type: "menu",
  },
  {
    id: "content",
    name: "内容管理",
    code: "content",
    type: "menu",
  },
  {
    id: "user",
    name: "用户管理",
    code: "user",
    type: "menu",
  },
  {
    id: "role",
    name: "角色管理",
    code: "role",
    type: "menu",
  },
  {
    id: "system",
    name: "系统设置",
    code: "system",
    type: "menu",
  },
];

async function main() {
  // 创建角色
  const superAdminRole = await prisma.role.upsert({
    where: { code: DEFAULT_ROLES.SUPER_ADMIN },
    update: {},
    create: {
      name: "超级管理员",
      code: DEFAULT_ROLES.SUPER_ADMIN,
      permissions: JSON.stringify(DEFAULT_PERMISSIONS),
      remark: "系统超级管理员，拥有所有权限",
    },
  });

  const adminRole = await prisma.role.upsert({
    where: { code: DEFAULT_ROLES.ADMIN },
    update: {},
    create: {
      name: "管理员",
      code: DEFAULT_ROLES.ADMIN,
      permissions: JSON.stringify(
        DEFAULT_PERMISSIONS.filter((p) => p.code !== "system")
      ),
      remark: "系统管理员，拥有大部分权限",
    },
  });

  // 创建超级管理员用户
  const hashedPassword = await bcryptjs.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@aini.one" },
    update: {},
    create: {
      email: "admin@aini.one",
      name: "超级管理员",
      password: hashedPassword,
      roleId: superAdminRole.id,
      status: "ACTIVE",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
