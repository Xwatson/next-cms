'use client';

import { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth";
import styles from "./page.module.less";

export default function LoginPage() {
  const router = useRouter();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      const res = await login(values);
      if (res.code === 0) {
        message.success("登录成功");
        router.push("/admin");
      } else {
        message.error(res.msg || "登录失败");
      }
    } catch (error) {
      message.error("登录失败");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <h1 className={styles.title}>Next CMS</h1>
          </div>
          <div className={styles.desc}>Next.js + Ant Design 后台管理系统</div>
        </div>

        <div className={styles.main}>
          <Form
            form={form}
            name="login"
            onFinish={onFinish}
            initialValues={{ remember: true }}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "请输入邮箱!" },
                { type: "email", message: "请输入有效的邮箱地址!" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="邮箱"
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "请输入密码!" }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="密码"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.button}
                size="large"
                block
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
