import request from "@/utils/request";
import type { User, CreateUserParams, UpdateUserParams } from "./types";
import { DataResult, PaginationResult } from "@/types/api";

interface GetUsersParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
  roleId?: number;
  status?: string;
}

export const getUsers = (params: GetUsersParams) => {
  return request.get<PaginationResult<User>>("/admin/users", {
    params,
  });
};

export const getUser = (id: number) => {
  return request.get<DataResult<User>>(`/admin/users/${id}`);
};

export const createUser = (data: CreateUserParams) => {
  return request.post<User>("/admin/users", data);
};

export const updateUser = (id: number, data: UpdateUserParams) => {
  return request.put<User>(`/admin/users/${id}`, data);
};

export const deleteUser = (id: number) => {
  return request.delete<void>(`/admin/users/${id}`);
};
