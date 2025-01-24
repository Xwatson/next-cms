import { useState, useEffect } from "react";
import { Table, Button, Space, Modal, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { getUsers, deleteUser, createUser, updateUser } from "@/services/user";
import type {
  User,
  CreateUserParams,
  UpdateUserParams,
} from "@/services/user/types";
import { getRoles } from "@/services/role";
import type { Role } from "@/services/role/types";
import AdminLayout from "@/components/layouts/AdminLayout";
import UserForm from "./components/UserForm";

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [visible, setVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);

  const fetchUsers = async (page = currentPage, size = pageSize) => {
    setLoading(true);
    try {
      const res = await getUsers({ page, pageSize: size });
      setUsers(res.list || []);
      setTotal(res.total || 0);
    } catch (error) {
      message.error("获取用户列表失败");
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await getRoles({});
      setRoles(res.data?.list || []);
    } catch (error) {
      message.error("获取角色列表失败");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const handleDelete = async (id: number) => {
    Modal.confirm({
      title: "确认删除",
      content: "确定要删除这个用户吗？",
      onOk: async () => {
        try {
          await deleteUser(id);
          message.success("删除成功");
          fetchUsers();
        } catch (error) {
          message.error("删除失败");
        }
      },
    });
  };

  const columns: ColumnsType<User> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
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
      dataIndex: ["role", "name"],
      key: "role",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={() => {
              setCurrentUser(record);
              setVisible(true);
            }}
          >
            编辑
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setCurrentUser(null);
    setVisible(true);
  };

  const handleSubmit = async (values: CreateUserParams | UpdateUserParams) => {
    try {
      if (currentUser) {
        await updateUser(currentUser.id, values as UpdateUserParams);
        message.success("更新成功");
      } else {
        await createUser(values as CreateUserParams);
        message.success("创建成功");
      }
      setVisible(false);
      fetchUsers();
    } catch (error) {
      message.error("操作失败");
    }
  };

  return (
    <AdminLayout>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={handleAdd}>
          添加用户
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        loading={loading}
        pagination={{
          total,
          current: currentPage,
          pageSize,
          onChange: (page, size) => {
            setCurrentPage(page);
            setPageSize(size);
            fetchUsers(page, size);
          },
        }}
      />

      <UserForm
        visible={visible}
        user={currentUser}
        roles={roles}
        onCancel={() => setVisible(false)}
        onSuccess={handleSubmit}
      />
    </AdminLayout>
  );
};

export default UserList;
