'use client';

import Link from "next/link";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.title}>
          欢迎使用 Next CMS
        </h1>

        <p className={styles.description}>
          一个现代化的内容管理系统
        </p>

        <div className={styles.grid}>
          <Link href="/admin" className={styles.card}>
            <h2>管理后台 &rarr;</h2>
            <p>进入系统管理后台</p>
          </Link>

          <Link href="/content" className={styles.card}>
            <h2>内容列表 &rarr;</h2>
            <p>浏览所有公开内容</p>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>
          Powered by{" "}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Next.js
          </a>
        </p>
      </footer>
    </>
  );
}
