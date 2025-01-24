'use client';

import { useTheme } from "@/contexts/ThemeContext";
import { BulbOutlined, BulbFilled } from "@ant-design/icons";
import styles from "./index.module.scss";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.themeToggle} onClick={toggleTheme}>
      {theme === "dark" ? (
        <BulbOutlined style={{ fontSize: 24, color: "#fff" }} />
      ) : (
        <BulbFilled style={{ fontSize: 24, color: "#fadb14" }} />
      )}
    </div>
  );
}
