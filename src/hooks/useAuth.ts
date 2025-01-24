import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { User } from "@/types/user";

interface LoginParams {
  email: string;
  password: string;
}

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 从 localStorage 获取用户信息
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (params: LoginParams) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "登录失败");
      }

      const userData = data.data.user;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      return userData;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "退出失败");
      }

      // 清除本地存储的用户信息
      setUser(null);
      localStorage.removeItem("user");

      // 重定向到登录页
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };
}
