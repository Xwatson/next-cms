import { Role } from "@prisma/client";

export interface LoginParams {
  email: string;
  password: string;
}

export interface LoginResult {
  user: {
    id: number;
    email: string;
    name: string;
    role: Role;
  };
}
