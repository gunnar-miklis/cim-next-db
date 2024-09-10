import type { Metadata } from 'next';
import styles from '@/src/styles/app.module.css';

export default function NotFound() {
  return (
    <main className={styles.main}>
      <h1>Not Found</h1>
      <p>Could not find requested resource</p>
    </main>
  );
}

export const metadata: Metadata = { title: 'Not Found' };
