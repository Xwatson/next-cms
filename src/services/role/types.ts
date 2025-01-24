export interface Permission {
  id: number;
  name: string;
  code: string;
  description: string;
}

export interface Role {
  id: number;
  name: string;
  code: string;
  description: string;
  permissions: Permission[];
}

export interface CreateRoleParams {
  name: string;
  code: string;
  description?: string;
  permissionIds: number[];
}

export interface UpdateRoleParams {
  id: number;
  name?: string;
  description?: string;
  permissionIds?: number[];
}

export interface QueryRolesParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
}

export interface QueryRolesResult {
  list: Role[];
  total: number;
  page: number;
  pageSize: number;
}

export interface QueryPermissionsResult {
  list: Permission[];
  total: number;
}
