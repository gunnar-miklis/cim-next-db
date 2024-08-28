'use client';

import type { Signature } from '@/prisma/generated/client';
import { approveSignature, deleteSignature } from './ServerActions';
import styles from '@/src/styles/app.module.css';

type Props = Signature;
export default function SignatureToCheck({ email, name, approved, id }: Props) {
  return (
    <li className={styles.flexRow} style={{ justifyContent: 'space-between' }}>
      {approved ? ' ✓' : ' ×'} | {name} | {email}
      <div className={styles.flexRow}>
        <button onClick={() => approveSignature(id, true)}>Approve</button>
        <button onClick={() => approveSignature(id, false)}>Disapprove</button>
        <button onClick={() => deleteSignature(id)}>Delete</button>
      </div>
    </li>
  );
}
