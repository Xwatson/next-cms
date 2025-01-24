import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/Error.module.css";
import ThemeToggle from "@/components/ThemeToggle";

export default function Error403() {
  return (
    <>
      <Head>
        <title>403 - 访问被拒绝</title>
        <meta name="description" content="没有访问权限" />
      </Head>

      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>403</h1>
          <h2 className={styles.subtitle}>访问被拒绝</h2>
          <p className={styles.description}>
            抱歉，您没有权限访问此页面。
          </p>
          <div className={styles.actions}>
            <Link href="/" className={styles.button}>
              返回首页
            </Link>
            <Link href="/login" className={styles.buttonOutline}>
              重新登录
            </Link>
          </div>
        </div>
      </div>

      <ThemeToggle />
    </>
  );
}
