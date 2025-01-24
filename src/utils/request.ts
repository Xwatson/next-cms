import axios, { AxiosRequestConfig } from "axios";
import { message } from "antd";

// 创建 axios 实例
const instance = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 从 localStorage 获取 token
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    const { data } = response;
    // 如果后端返回的不是标准格式，直接返回数据
    if (data.code === undefined) {
      return Promise.resolve(data);
    }
    // 处理业务错误
    if (data.code !== 0) {
      message.error(data.message || "操作失败");
      return Promise.reject(new Error(data.message || "操作失败"));
    }
    return Promise.resolve(data);
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 401:
          message.error("未登录或登录已过期");
          // 清除本地存储的 token
          localStorage.removeItem("token");
          // 跳转到登录页
          window.location.href = "/login";
          break;
        case 403:
          message.error("没有权限");
          break;
        case 404:
          message.error("请求的资源不存在");
          break;
        case 500:
          message.error("服务器错误");
          break;
        default:
          message.error(data?.message || "请求失败");
      }
    } else if (error.request) {
      message.error("网络错误");
    } else {
      message.error("请求配置错误");
    }
    return Promise.reject(error);
  }
);

// 请求方法
const request = {
  get: <T = any>(url: string, config?: AxiosRequestConfig) =>
    instance.get<any, T>(url, config),

  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    instance.post<any, T>(url, data, config),

  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    instance.put<any, T>(url, data, config),

  delete: <T = any>(url: string, config?: AxiosRequestConfig) =>
    instance.delete<any, T>(url, config),

  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    instance.patch<any, T>(url, data, config),
};

export default request;
