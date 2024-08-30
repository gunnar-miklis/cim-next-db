import type { Metadata } from 'next';
import Link from 'next/link';
import prisma from '@/prisma/db';
import PendingSignatures from '@/src/components/Petition/PendingSignatures';
import Form from '@/src/components/Petition/Form';
import styles from '@/src/styles/app.module.css';
import { auth } from '@/src/auth';

type Props = { searchParams: { page?: string } };
export default async function PetitionPage({ searchParams: { page = '' } }: Props) {
  const session = await auth();

  const signituresPerPage = 1;
  const totalSignatures = await prisma.signature.count({ where: { approved: true } });
  const totalPages = Math.ceil(totalSignatures / signituresPerPage);

  let pageNumber = Math.max(parseInt(page) || 1, 1);
  if (pageNumber > totalPages) pageNumber = 1;

  const signatures = await prisma.signature.findMany({
    where: { approved: true },
    take: signituresPerPage,
    skip: (pageNumber - 1) * signituresPerPage,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className={styles.main}>
      <Link href='/' className={styles.card}>
        <h2>
          Home <span>-&gt;</span>
        </h2>
        <p>Go to the home page</p>
      </Link>

      <div className={styles.description}>
        <h1>Important Petition</h1>
        <strong>{totalSignatures} people already signed!</strong>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, ut dolorum. Quae
          adipisci labore magnam nulla officia. Ratione ab magnam voluptatem veniam, numquam maxime
          labore! Illo excepturi possimus temporibus inventore.
        </p>
      </div>

      <div className={styles.description}>
        <h2>Latest Subscribers</h2>

        <ol className={styles.list} start={(pageNumber - 1) * signituresPerPage + 1}>
          {signatures.map(({ name, updatedAt, id }) => (
            <li key={id}>
              {name} (
              <time dateTime={updatedAt.toISOString().substring(0, 10)}>
                {updatedAt.toLocaleDateString('de')}
              </time>
              )
            </li>
          ))}
        </ol>

        {totalPages > 1 && (
          <nav className={styles.flexRow} aria-label='Pagination'>
            <select defaultValue={signituresPerPage} disabled>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='5'>5</option>
              <option value='10'>10</option>
            </select>
            {pageNumber > 1 && (
              <Link href={`/petition?page=${pageNumber - 1}`}>
                <button>Previous Page</button>
              </Link>
            )}
            {pageNumber < totalPages && (
              <Link href={`/petition?page=${pageNumber + 1}`} scroll={false}>
                <button>Next Page</button>
              </Link>
            )}
          </nav>
        )}
      </div>

      <div className={styles.description}>
        <Form />
      </div>

      <div className={styles.description}>
        <h2>Admin Controls</h2>
        {!session && (
          <Link href='/' style={{ color: 'red', textDecoration: 'underline' }}>
            Login with GitHub to create events
          </Link>
        )}
        <PendingSignatures isLoggedIn={!session} />
      </div>
    </main>
  );
}

export const metadata: Metadata = { title: 'Petition' };
