import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ThemeToggle from "@/components/ThemeToggle";
import "@/styles/globals.css";

// 动态导入 antd 样式，避免服务端渲染问题
import "antd/dist/reset.css";

function NextCMS({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isAdminRoute = router.pathname.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <ThemeProvider>
        <AntdRegistry>
          <ConfigProvider locale={zhCN}>
            <AuthProvider>
              <Component {...pageProps} />
              <ThemeToggle />
            </AuthProvider>
          </ConfigProvider>
        </AntdRegistry>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <Component {...pageProps} />
        <ThemeToggle />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default NextCMS;
