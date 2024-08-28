import prisma from '@/prisma/db';
import SignatureToCheck from './SignatureToCheck';

export default async function PendingSignatures() {

  const signatures = await prisma.signature.findMany({
    where: { approved: true },
  });
  console.log('signatures :>> ', signatures);
  if (!signatures.length) return <h2>No approved signature</h2>;
  return (
    <ul>
      {signatures.map((signature) => (
        <SignatureToCheck key={signature.id} {...signature} />
      ))}
    </ul>
  );
}
