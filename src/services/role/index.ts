import request from "@/utils/request";
import {
  CreateRoleParams,
  UpdateRoleParams,
  QueryRolesParams,
  QueryRolesResult,
  QueryPermissionsResult,
  Role,
  Permission,
} from "./types";
import { DataResult, PaginationResult } from "@/types/api";

// 角色管理
export const getRoles = (params: QueryRolesParams) =>
  request.get<DataResult<PaginationResult<Role>>>("/admin/roles", {
    params,
  });

export const getRoleById = (id: number) =>
  request.get<Role>(`/admin/roles/${id}`);

export const createRole = (params: CreateRoleParams) =>
  request.post<Role>("/admin/roles", params);

export const updateRole = (params: UpdateRoleParams) =>
  request.put<Role>(`/admin/roles/${params.id}`, {
    data: params,
  });

export const deleteRole = (id: number) => request.delete(`/admin/roles/${id}`);

// 权限管理
export const getPermissions = () =>
  request.get<DataResult<PaginationResult<Permission>>>("/admin/permissions");
