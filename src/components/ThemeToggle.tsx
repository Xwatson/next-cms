import { useTheme } from "@/contexts/ThemeContext";
import styles from "@/styles/ThemeToggle.module.css";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={`切换到${theme === "light" ? "暗色" : "亮色"}模式`}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
