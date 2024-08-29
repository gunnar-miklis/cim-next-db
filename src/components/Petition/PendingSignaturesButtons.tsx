'use client';

import type { Signature } from '@/prisma/generated/client';
import { approveSignature, deleteSignature } from './ServerActions';
import styles from '@/src/styles/app.module.css';
import FormSubmitButton from './FormSubmitButton';

type Props = Signature;
export default function SignatureToCheck({ email, name, approved, id }: Props) {
  return (
    <li className={styles.flexRow} style={{ justifyContent: 'space-between' }}>
      <div>
        <strong>{approved ? ' ✓' : ' ×'}</strong> | {name} | {email}
      </div>
      <div className={styles.flexRow}>
        <form action={() => approveSignature(id, true)}>
          <FormSubmitButton buttonType='default'>Approve</FormSubmitButton>
        </form>
        <form action={() => approveSignature(id, false)}>
          <FormSubmitButton buttonType='default'>Disapprove</FormSubmitButton>
        </form>
        <form action={() => deleteSignature(id)}>
          <FormSubmitButton buttonType='default'>Delete</FormSubmitButton>
        </form>
      </div>
    </li>
  );
}
