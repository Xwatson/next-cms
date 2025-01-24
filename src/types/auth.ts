import { Role } from "@prisma/client";

export interface TokenPayload {
  id: string;
  name: string;
  email: string;
  roleStr: string;
}

export interface LoginResponse {
  code: number;
  message: string;
  data?: {
    token: string;
    user: {
      id: number;
      email: string;
      name: string | null;
      role: {
        id: number;
        name: string;
        code: string;
      };
    };
  };
}

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
