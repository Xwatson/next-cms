import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/Home.module.css";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Next CMS - 内容管理系统</title>
        <meta name="description" content="Next CMS 是一个现代化的内容管理系统" />
        <meta name="keywords" content="CMS,内容管理,Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
