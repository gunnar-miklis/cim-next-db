import type { Metadata } from 'next';
import styles from '@/src/styles/petition.module.css';
import prisma from '@/prisma/prisma';

export const metadata: Metadata = {
  title: 'PetitionPage',
};

type Props = {};

export default async function PetitionPage({}: Props) {
  const signatures = await prisma.signature.findMany({
    where: { approved: true },
  });
  return (
    <div>
      <h1 className={styles.heading}>PetitionPage</h1>
      <ol className={styles.list}>
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
    </div>
  );
}
