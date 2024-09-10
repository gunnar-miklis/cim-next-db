import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { auth } from '@/src/auth';
import User from '@/src/components/Auth/User';
import SignIn from '@/src/components/Auth/SignIn';
import SignOut from '@/src/components/Auth/SignOut';
import styles from '@/src/styles/app.module.css';

export default async function Home() {
  const session = await auth();

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

      <article className={styles.description}>
        {session ? (
          <>
            <div>
              <User {...session.user} />
            </div>
            <SignOut />
          </>
        ) : (
          <>
            <div>
              <h2>Login</h2>
            </div>
            <SignIn />
          </>
        )}
      </article>
    </main>
  );
}

export const metadata: Metadata = { title: 'Next DB' };
