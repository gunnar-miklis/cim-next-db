import type { Metadata } from 'next';
import styles from '@/src/styles/app.module.css';

export default function Loading() {
  return (
    <main className={styles.main}>
      <h1>Loading...</h1>
    </main>
  );
}

export const metadata: Metadata = { title: 'Loading...' };
