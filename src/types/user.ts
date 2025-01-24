import { Role } from "./permission";

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  LOCKED = "LOCKED",
}

export interface User {
  id: number;
  email: string;
  name: string | null;
  avatar: string | null;
  phone: string | null;
  role: Role;
  roleStr?: string;
  roleId: number;
  status: UserStatus;
  lastLoginTime: Date | null;
  lastLoginIp: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface UserCreateInput {
  email: string;
  password: string;
  name?: string;
  avatar?: string;
  phone?: string;
  roleId: number;
  status?: UserStatus;
}

export interface UserUpdateInput extends Partial<UserCreateInput> {
  id: number;
}
