import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "@/styles/Login.module.css";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ email, password });
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "登录失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>登录 - Next CMS</title>
        <meta name="description" content="登录到 Next CMS 系统" />
        <meta name="robots" content="noindex" />
      </Head>

      <main className={styles.main}>
        <div className={styles.loginBox}>
          <h1 className={styles.title}>Next CMS</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="email">邮箱</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.input}
                placeholder="请输入邮箱"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">密码</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={styles.input}
                placeholder="请输入密码"
              />
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className={styles.submitButton}
            >
              {loading ? "登录中..." : "登录"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
