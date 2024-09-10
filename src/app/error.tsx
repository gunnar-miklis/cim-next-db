'use client';

import type { Metadata } from 'next';
import styles from '@/src/styles/app.module.css';

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};
export default function Error({ error, reset }: Props) {
  return (
    <main className={styles.main}>
      <h1>Oops, there was an error.</h1>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </main>
  );
}

export const metadata: Metadata = { title: 'Error' };
