import React, { useEffect, useState } from "react";
import {
  Table,
  Card,
  Button,
  Space,
  Modal,
  Form,
  Input,
  message,
  Transfer,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { Role, Permission } from "@/services/role/types";
import {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
  getPermissions,
} from "@/services/role";
import AdminLayout from "@/components/layouts/AdminLayout";

const RoleList = () => {
  const [form] = Form.useForm();
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const res = await getRoles({ page, pageSize });
      setRoles(res.data?.list || []);
      setTotal(res.data?.total || 0);
    } catch (error) {
      console.error("Fetch roles error:", error);
    }
    setLoading(false);
  };

  const fetchPermissions = async () => {
    try {
      const res = await getPermissions();
      setPermissions(res.data?.list || []);
    } catch (error) {
      console.error("Fetch permissions error:", error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, [page, pageSize]);

  useEffect(() => {
    fetchPermissions();
  }, []);

  const handleAdd = () => {
    setEditingRole(null);
    form.resetFields();
    setSelectedPermissions([]);
    setModalVisible(true);
  };

  const handleEdit = (record: Role) => {
    setEditingRole(record);
    form.setFieldsValue({
      name: record.name,
      code: record.code,
      description: record.description,
    });
    setSelectedPermissions(record.permissions.map((p) => p.id));
    setModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    Modal.confirm({
      title: "确认删除",
      content: "确定要删除这个角色吗？",
      onOk: async () => {
        try {
          await deleteRole(id);
          message.success("删除成功");
          fetchRoles();
        } catch (error) {
          console.error("Delete role error:", error);
        }
      },
    });
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingRole) {
        await updateRole({
          id: editingRole.id,
          ...values,
          permissionIds: selectedPermissions,
        });
        message.success("更新成功");
      } else {
        await createRole({
          ...values,
          permissionIds: selectedPermissions,
        });
        message.success("创建成功");
      }
      setModalVisible(false);
      fetchRoles();
    } catch (error) {
      console.error("Submit role error:", error);
    }
  };

  const columns: ColumnsType<Role> = [
    {
      title: "ID",
      dataIndex: "id",
      width: 80,
    },
    {
      title: "名称",
      dataIndex: "name",
    },
    {
      title: "标识",
      dataIndex: "code",
    },
    {
      title: "描述",
      dataIndex: "description",
    },
    {
      title: "权限数量",
      dataIndex: "permissions",
      render: (permissions: Permission[]) => permissions.length,
    },
    {
      title: "操作",
      key: "action",
      width: 200,
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button
            type="link"
            danger
            onClick={() => handleDelete(record.id)}
            disabled={record.code === "super_admin"}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <AdminLayout>
      <Card
        title="角色管理"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            新增角色
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={roles}
          rowKey="id"
          loading={loading}
          pagination={{
            total,
            current: page,
            pageSize,
            onChange: (page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            },
          }}
        />
      </Card>

      <Modal
        title={editingRole ? "编辑角色" : "新增角色"}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        width={720}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="名称"
            rules={[{ required: true, message: "请输入名称" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="code"
            label="标识"
            rules={[{ required: true, message: "请输入标识" }]}
          >
            <Input disabled={!!editingRole} />
          </Form.Item>
          <Form.Item name="description" label="描述">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="权限">
            <Transfer
              dataSource={permissions}
              titles={["可选权限", "已选权限"]}
              targetKeys={selectedPermissions.map(String)}
              onChange={(targetKeys) => {
                setSelectedPermissions(targetKeys.map(Number));
              }}
              render={(item) => item.name}
              rowKey={(record) => String(record.id)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </AdminLayout>
  );
};

export default RoleList;
