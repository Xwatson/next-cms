'use client';

import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { Role, Permission } from "@/services/role/types";
import dayjs from "dayjs";
import { createRole, getPermissions, getRoles, updateRole, deleteRole } from "@/services/role";

export default function RolesPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("新增角色");
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const columns: ColumnsType<Role> = [
    {
      title: "角色名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "角色标识",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "描述",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Popconfirm
            title="确定要删除吗?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button
              type="link"
              danger
              disabled={record.code === "super_admin"}
            >
              删除
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const fetchRoles = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getRoles({
        page: pagination.current,
        pageSize: pagination.pageSize,
      });
      setRoles(res.data?.list || []);
      setPagination({
        ...pagination,
        total: res.data?.total || 0,
      });
    } catch (error) {
      message.error("获取角色列表失败");
    } finally {
      setLoading(false);
    }
  }, [pagination.current, pagination.pageSize]);

  const fetchPermissions = useCallback(async () => {
    try {
      const res = await getPermissions();
      setPermissions(res.data?.list || []);
    } catch (error) {
      message.error("获取权限列表失败");
    }
  }, []);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  // useEffect(() => {
  //   fetchPermissions();
  // }, [fetchPermissions]);

  const handleAdd = () => {
    form.resetFields();
    setModalTitle("新增角色");
    setModalVisible(true);
  };

  const handleEdit = (record: Role) => {
    form.setFieldsValue({
      ...record,
      permissionIds: record.permissions?.map((p) => p.id),
    });
    setModalTitle("编辑角色");
    setModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteRole(id);
      message.success("删除成功");
      fetchRoles();
    } catch (error) {
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (values.id) {
        await updateRole(values);
        message.success("更新成功");
      } else {
        await createRole(values);
        message.success("创建成功");
      }
      setModalVisible(false);
      fetchRoles();
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
      title="角色管理"
      extra={
        <Button type="primary" onClick={handleAdd}>
          新增
        </Button>
      }
    >
      <Table
        columns={columns}
        dataSource={roles}
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
          <Form.Item
            label="角色名称"
            name="name"
            rules={[{ required: true, message: "请输入角色名称" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="角色标识"
            name="code"
            rules={[{ required: true, message: "请输入角色标识" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="描述" name="description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="权限" name="permissionIds">
            <Select
              mode="multiple"
              placeholder="请选择权限"
              options={permissions.map((p) => ({
                label: p.name,
                value: p.id,
              }))}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
