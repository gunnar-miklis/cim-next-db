import Image from 'next/image';
import styles from '@/src/styles/app.module.css';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next DB',
};

export default function Home() {
  return (
    <main className={styles.main}>
      <Image
        className={styles.logo}
        src='/next.svg'
        alt='Next.js Logo'
        width={180}
        height={37}
        style={{ marginLeft: '1rem' }}
        priority
      />

      <br />

      <Link href='/petition' className={styles.card}>
        <h2>
          Petition <span>-&gt;</span>
        </h2>
        <p>Go to the petition page</p>
      </Link>

      <Link href='/events' className={styles.card}>
        <h2>
          Events <span>-&gt;</span>
        </h2>
        <p>Go to the Events page</p>
      </Link>
    </main>
  );
}
