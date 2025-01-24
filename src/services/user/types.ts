import { Role, UserStatus } from "@prisma/client";

export interface User {
  id: number;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  roleId: number;
  status: UserStatus;
  lastLoginTime?: Date;
  lastLoginIp?: string;
  createdAt: Date;
  updatedAt: Date;
  role: Role;
}

export interface CreateUserParams {
  email: string;
  name: string;
  password: string;
  roleId: number;
  status?: UserStatus;
  avatar?: string;
  phone?: string;
}

export interface UpdateUserParams {
  id: number;
  name?: string;
  password?: string;
  roleId?: number;
  status?: UserStatus;
  avatar?: string;
  phone?: string;
}

export interface QueryUsersParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
  roleId?: number;
  status?: string;
}

export interface QueryUsersResult {
  list: User[];
  total: number;
  page: number;
  pageSize: number;
}
