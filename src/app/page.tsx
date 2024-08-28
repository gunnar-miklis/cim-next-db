import Image from 'next/image';
import styles from '@/src/styles/app.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div>
          <a href='/' rel='noopener noreferrer'>
            <Image
              className={styles.logo}
              src='/next.svg'
              alt='Next.js Logo'
              width={180}
              height={37}
              priority
            />
          </a>
        </div>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
      </div>

      <div className={styles.center}></div>

      <div className={styles.grid}>
        <a href='/petition' className={styles.card} target='_blank' rel='noopener noreferrer'>
          <h2>
            Petition <span>-&gt;</span>
          </h2>
          <p>Start with prisma</p>
        </a>
      </div>
    </main>
  );
}
