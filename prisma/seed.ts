const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

// 系统默认角色
const DEFAULT_ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  EDITOR: "editor",
  USER: "user",
} as const;

const defaultPermissions = [
  {
    name: '控制台',
    code: 'dashboard',
    type: 'menu'
  },
  {
    name: '内容管理',
    code: 'content',
    type: 'menu'
  },
  {
    name: '用户管理',
    code: 'user',
    type: 'menu'
  },
  {
    name: '角色管理',
    code: 'role',
    type: 'menu'
  },
  {
    name: '系统设置',
    code: 'system',
    type: 'menu'
  }
]

async function main() {
  // 创建权限
  const permissions = await Promise.all(
    defaultPermissions.map(permission =>
      prisma.permission.upsert({
        where: { code: permission.code },
        update: permission,
        create: permission
      })
    )
  )

  // 创建角色
  const superAdminRole = await prisma.role.upsert({
    where: { code: DEFAULT_ROLES.SUPER_ADMIN },
    update: {
      permissions: {
        connect: permissions.map(p => ({ id: p.id }))
      }
    },
    create: {
      name: '超级管理员',
      code: DEFAULT_ROLES.SUPER_ADMIN,
      permissions: {
        connect: permissions.map(p => ({ id: p.id }))
      },
      remark: '系统超级管理员，拥有所有权限'
    }
  });

  const adminRole = await prisma.role.upsert({
    where: { code: DEFAULT_ROLES.ADMIN },
    update: {},
    create: {
      name: "管理员",
      code: DEFAULT_ROLES.ADMIN,
      remark: "系统管理员，拥有大部分权限",
    }
  });

  // 创建超级管理员用户
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@aini.one'
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
  const hashedPassword = await bcrypt.hash(adminPassword, 10)

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
      roleId: superAdminRole.id
    },
    create: {
      email: adminEmail,
      name: '超级管理员',
      password: hashedPassword,
      roleId: superAdminRole.id,
      status: 'ACTIVE'
    }
  })
}

const prisma = new PrismaClient()

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
