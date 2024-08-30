'use server';

import prisma from '@/prisma/db';
import PendingSignaturesControls from './PendingSignaturesControls';

export default async function PendingSignatures({ isLoggedIn }: { isLoggedIn: boolean }) {
  const signatures = await prisma.signature.findMany({
    orderBy: [{ approved: 'asc' }, { name: 'asc' }],
  });

  if (!signatures.length) return <h2>No approved signature</h2>;
  else
    return (
      <ul>
        {signatures.map((signature) => (
          <PendingSignaturesControls key={signature.id} isLoggedIn={isLoggedIn} {...signature} /> // client component for onClick interactions
        ))}
      </ul>
    );
}
