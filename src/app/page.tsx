import Image from 'next/image';
import styles from '@/src/styles/app.module.css';

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

      <div className={styles.grid}>
        <a href='/petition' className={styles.card} target='_blank' rel='noopener noreferrer'>
          <h2>
            Petition <span>-&gt;</span>
          </h2>
          <p>Go to the petition page</p>
        </a>
      </div>

      <div className={styles.center}></div>
    </main>
  );
}
