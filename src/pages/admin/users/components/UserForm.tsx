import { Modal, Form, Input, Select, message } from "antd";
import type { User, CreateUserParams, UpdateUserParams } from "@/services/user/types";
import type { Role } from "@/services/role/types";

interface UserFormProps {
  visible: boolean;
  user: User | null;
  roles: Role[];
  onCancel: () => void;
  onSuccess: (values: CreateUserParams | UpdateUserParams) => void;
}

export default function UserForm({
  visible,
  user,
  roles,
  onCancel,
  onSuccess,
}: UserFormProps) {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await onSuccess(values);
      form.resetFields();
    } catch (error) {
      message.error("表单验证失败");
    }
  };

  return (
    <Modal
      title={user ? "编辑用户" : "新增用户"}
      open={visible}
      onOk={handleSubmit}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={user || {}}
      >
        <Form.Item
          name="email"
          label="邮箱"
          rules={[
            { required: true, message: "请输入邮箱" },
            { type: "email", message: "请输入有效的邮箱地址" },
          ]}
        >
          <Input disabled={!!user} />
        </Form.Item>

        {!user && (
          <Form.Item
            name="password"
            label="密码"
            rules={[
              { required: true, message: "请输入密码" },
              { min: 6, message: "密码长度不能小于 6 位" },
            ]}
          >
            <Input.Password />
          </Form.Item>
        )}

        <Form.Item
          name="name"
          label="用户名"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="roleId"
          label="角色"
          rules={[{ required: true, message: "请选择角色" }]}
        >
          <Select>
            {roles.map((role) => (
              <Select.Option key={role.id} value={role.id}>
                {role.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="status"
          label="状态"
          rules={[{ required: true, message: "请选择状态" }]}
        >
          <Select>
            <Select.Option value="ACTIVE">正常</Select.Option>
            <Select.Option value="LOCKED">锁定</Select.Option>
            <Select.Option value="INACTIVE">未激活</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="phone" label="手机号">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
