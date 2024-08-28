import type { Metadata } from 'next';
import prisma from '@/prisma/db';
import styles from '@/src/styles/petition.module.css';
import Link from 'next/link';
import PendingSignatures from '@/src/components/PendingSignatures';
import Form from '@/src/components/Form';

/* Pages erhalten automatisch searchParams als Prop */
type Props = {
  searchParams: {
    page?: string;
    perPage?: string;
  };
};

const defaultPerPage = 1;

export const metadata: Metadata = {
  title: 'Petition',
};

export default async function PetitionPage({ searchParams: { page = '', perPage = '' } }: Props) {
  const perPageNumber = Math.max(Math.min(parseInt(perPage) || defaultPerPage, 100), 1);

  const totalSignatures = await prisma.signature.count({
    where: { approved: true },
  });
  const totalPageCount = Math.ceil(totalSignatures / perPageNumber);

  let pageNumber = Math.max(parseInt(page) || 1, 1);
  if (pageNumber > totalPageCount) pageNumber = 1;

  const signatures = await prisma.signature.findMany({
    where: { approved: true },
    take: perPageNumber,
    skip: (pageNumber - 1) * perPageNumber,
    orderBy: { date: 'asc' },
  });

  console.log('signatures :>> ', signatures);

  return (
    <>
      <h1 className={styles.heading}>Important Petition</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, ut dolorum. Quae
        adipisci labore magnam nulla officia. Ratione ab magnam voluptatem veniam, numquam maxime
        labore! Illo excepturi possimus temporibus inventore.
      </p>
      <strong>{totalSignatures} people already signed!</strong>

      <ol className={styles.list} start={(pageNumber - 1) * perPageNumber + 1}>
        {signatures.map(({ name, date, id }) => (
          <li key={id}>
            {name} (
            <time dateTime={date.toISOString().substring(0, 10)}>
              {date.toLocaleDateString('de')}
            </time>
            )
          </li>
        ))}
      </ol>

      {totalPageCount > 1 && (
        <nav className={styles.pagination} aria-label='Pagination'>
          {pageNumber > 1 && (
            <Link href={`/petition?perPage=${pageNumber - 1}&page=${perPage}`}>
              Next Signatures
            </Link>
          )}
          {pageNumber < totalPageCount && (
            <Link href={`/petition?perPage=${pageNumber + 1}&page=${perPage}`} scroll={false}>
              Next Signatures
            </Link>
          )}
        </nav>
      )}
	  
	  <Form />
      <PendingSignatures />
    </>
  );
}
