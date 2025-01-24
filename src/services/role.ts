import request from "@/utils/request";
import { DataResult, PaginationResult } from "@/types/api";
import { Permission, QueryRolesParams, Role } from "@/types/role";

// 角色管理
export const getRoles = (params: QueryRolesParams) =>
  request.get<DataResult<PaginationResult<Role>>>("/admin/roles", {
    params,
  });

export const getRoleById = (id: number) =>
  request.get<Role>(`/admin/roles/${id}`);

export const createRole = (params: Partial<Role>) =>
  request.post<Role>("/admin/roles", params);

export const updateRole = (params: Partial<Role>) =>
  request.put<Role>(`/admin/roles/${params.id}`, params);

export const deleteRole = (id: number) => request.delete(`/admin/roles/${id}`);

// 权限管理
export const getPermissions = () =>
  request.get<DataResult<PaginationResult<Permission>>>("/admin/permissions");
