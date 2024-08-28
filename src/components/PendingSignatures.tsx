import prisma from '@/prisma/db';
import SignatureToCheck from './SignatureToCheck';

export default async function PendingSignatures() {
  const signatures = await prisma.signature.findMany({ orderBy: { name: 'asc' } });

  if (!signatures.length) return <h2>No approved signature</h2>;
  else
    return (
      <ul>
        {signatures.map((signature) => (
          <SignatureToCheck key={signature.id} {...signature} />
        ))}
      </ul>
    );
}
