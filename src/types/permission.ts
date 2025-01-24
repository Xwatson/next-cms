export interface Permission {
  id: string;
  name: string;
  code: string;
  type: 'menu' | 'button' | 'api';
  parentId?: string;
  children?: Permission[];
}

export interface Role {
  id: number;
  name: string;
  code: string;
  permissions: Permission[];
  remark?: string;
  createdAt: Date;
  updatedAt: Date;
}

// 系统默认角色
export enum RoleCode {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  EDITOR = 'editor',
  USER = 'user'
}

// 权限类型
export enum PermissionType {
  MENU = 'menu',
  BUTTON = 'button',
  API = 'api'
}
