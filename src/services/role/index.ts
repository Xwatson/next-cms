import request from "@/utils/request";
import {
  CreateRoleParams,
  UpdateRoleParams,
  QueryRolesParams,
  QueryRolesResult,
  QueryPermissionsResult,
  Role,
} from "./types";

// 角色管理
export const getRoles = (params: QueryRolesParams) =>
  request<QueryRolesResult>("/api/admin/roles", {
    method: "GET",
    data: params,
  });

export const getRoleById = (id: number) =>
  request<Role>(`/api/admin/roles/${id}`, {
    method: "GET",
  });

export const createRole = (params: CreateRoleParams) =>
  request<Role>("/api/admin/roles", {
    method: "POST",
    data: params,
  });

export const updateRole = (params: UpdateRoleParams) =>
  request<Role>(`/api/admin/roles/${params.id}`, {
    method: "PUT",
    data: params,
  });

export const deleteRole = (id: number) =>
  request(`/api/admin/roles/${id}`, {
    method: "DELETE",
  });

// 权限管理
export const getPermissions = () =>
  request<QueryPermissionsResult>("/api/admin/permissions", {
    method: "GET",
  });
