"use client";

import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DashboardOutlined,
  SettingOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Dropdown, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { logout } from "@/services/auth";

const { Header, Sider, Content } = Layout;

const menuItems = [
  {
    key: "/admin",
    icon: <DashboardOutlined />,
    label: "控制台",
  },
  {
    key: "/admin/user_management",
    icon: <UserOutlined />,
    label: "用户管理",
    children: [
      {
        key: "/admin/users",
        icon: <UserOutlined />,
        label: "用户管理",
      },
      {
        key: "/admin/roles",
        icon: <UserOutlined />,
        label: "角色管理",
      },
    ],
  },
  {
    key: "/admin/content",
    icon: <FileTextOutlined />,
    label: "内容管理",
    children: [
      {
        key: "/admin/content/articles",
        label: "文章管理",
      },
      {
        key: "/admin/content/categories",
        label: "分类管理",
      },
    ],
  },
  {
    key: "/admin/settings",
    icon: <SettingOutlined />,
    label: "系统设置",
  },
];

const userMenuItems = [
  {
    key: "profile",
    label: "个人信息",
  },
  {
    key: "logout",
    label: "退出登录",
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = async () => {
    try {
      await logout();
      message.success("退出登录成功");
      router.push("/login");
    } catch (error) {
      // 错误已在 request 中处理
      console.error("Logout error:", error);
    }
  };

  const handleUserMenuClick = ({ key }: { key: string }) => {
    if (key === "logout") {
      handleLogout();
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[router.pathname]}
          items={menuItems}
          onClick={({ key }) => router.push(key)}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingRight: 24,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <Dropdown
              menu={{
                items: userMenuItems,
                onClick: handleUserMenuClick,
              }}
            >
              <Button icon={<UserOutlined />}>用户</Button>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
