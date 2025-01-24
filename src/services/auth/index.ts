import request from "@/utils/request";
import { LoginParams, LoginResult } from "./types";

export const login = (params: LoginParams) =>
  request.get("/api/auth/login", {
    method: "POST",
    data: params,
  });

export const logout = () => request.post("/api/auth/logout");
