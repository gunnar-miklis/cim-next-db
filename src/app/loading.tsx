import type { Metadata } from 'next';
import styles from '@/src/styles/app.module.css';

export const metadata: Metadata = {
  title: 'Loading...',
};

type Props = {};

export default function Loading({}: Props) {
  return (
    <main className={styles.main}>
      <h1>Loading...</h1>
    </main>
  );
}
