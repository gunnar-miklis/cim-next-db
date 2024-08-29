'use server';

import prisma from '@/prisma/db';
import PendingSignaturesButtons from './PendingSignaturesButtons';

export default async function PendingSignatures() {
  const signatures = await prisma.signature.findMany({
    orderBy: [{ approved: 'asc' }, { name: 'asc' }],
  });

  if (!signatures.length) return <h2>No approved signature</h2>;
  else
    return (
      <>
        <h2>Admin Controls</h2>
        <ul>
          {signatures.map((signature) => (
            <PendingSignaturesButtons key={signature.id} {...signature} /> // client component for onClick interactions
          ))}
        </ul>
      </>
    );
}
