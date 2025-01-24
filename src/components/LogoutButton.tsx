import { Button, message } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useAuth } from "@/hooks/useAuth";

export default function LogoutButton() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      message.success("退出成功");
    } catch (error) {
      message.error("退出失败");
    }
  };

  return (
    <Button
      type="link"
      icon={<LogoutOutlined />}
      onClick={handleLogout}
      style={{ color: "rgba(0, 0, 0, 0.65)" }}
    >
      退出登录
    </Button>
  );
}
