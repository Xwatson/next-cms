'use client';

import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
  message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { User } from "@/types/user";
import dayjs from 'dayjs';
import { createUser, getUsers, updateUser } from "@/services/user";
import { getRoles } from "@/services/role";

export default function UsersPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("新增用户");
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const columns: ColumnsType<User> = [
    {
      title: "用户名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "角色",
      dataIndex: "role",
      key: "role",
      render: (role) => role?.name,
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "最后登录时间",
      dataIndex: "lastLoginTime",
      key: "lastLoginTime",
      render: (text: string) => (text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : "-"),
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>编辑</a>
        </Space>
      ),
    },
  ];

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getUsers({
        page: pagination.current,
        pageSize: pagination.pageSize,
      });
      setUsers(res.data?.list || []);
      setPagination({
        ...pagination,
        total: res.data?.total || 0,
      });
    } catch (error) {
      message.error("获取用户列表失败");
    } finally {
      setLoading(false);
    }
  }, [pagination.current, pagination.pageSize]);

  const fetchRoles = useCallback(async () => {
    try {
      const res = await getRoles({ pageSize: 100 });
      setRoles(res.data?.list || []);
    } catch (error) {
      message.error("获取角色列表失败");
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const handleAdd = () => {
    form.resetFields();
    setModalTitle("新增用户");
    setModalVisible(true);
  };

  const handleEdit = (record: User) => {
    form.setFieldsValue({ ...record, roleId: record.role?.id });
    setModalTitle("编辑用户");
    setModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (values.id) {
        await updateUser(values.id, values);
        message.success("更新成功");
      } else {
        await createUser(values);
        message.success("创建成功");
      }
      setModalVisible(false);
      fetchUsers();
    } catch (error) {
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleTableChange = (pagination: any) => {
    setPagination(pagination);
  };

  return (
    <Card
      title="用户管理"
      extra={
        <Button type="primary" onClick={handleAdd}>
          新增
        </Button>
      }
    >
      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />

      <Modal
        title={modalTitle}
        open={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
        >
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item noStyle shouldUpdate>
            {({ getFieldValue }) => (
              <Form.Item
                label="邮箱"
                name="email"
                rules={[
                  { required: true, message: "请输入邮箱" },
                  { type: "email", message: "请输入有效的邮箱地址" },
                ]}
              >
                <Input disabled={!!getFieldValue("id")} />
              </Form.Item>
            )}
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item label="用户名" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="手机号" name="phone">
            <Input />
          </Form.Item>
          <Form.Item
            label="角色"
            name="roleId"
            rules={[{ required: true, message: "请选择角色" }]}
          >
            <Select
              placeholder="请选择角色"
              options={roles.map((role) => ({
                label: role.name,
                value: role.id,
              }))}
            />
          </Form.Item>
          <Form.Item label="状态" name="status">
            <Select
              placeholder="请选择状态"
              options={[
                { label: "正常", value: "ACTIVE" },
                { label: "禁用", value: "INACTIVE" },
                { label: "锁定", value: "LOCKED" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
