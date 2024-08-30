'use client';

import type { Signature } from '@/prisma/generated/client';
import { approveSignature, deleteSignature } from './ServerActions';
import FormSubmitButton from '../FormSubmitButton';
import styles from '@/src/styles/app.module.css';

type Props = Signature & {
  isLoggedIn: boolean;
};
export default function PendingSignaturesControls({
  email,
  name,
  approved,
  id,
  isLoggedIn,
}: Props) {
  return (
    <li className={styles.flexRow} style={{ justifyContent: 'space-between' }}>
      <div>
        <strong>{approved ? ' ✓' : ' ×'}</strong> | {name} | {email}
      </div>

      <div className={styles.flexRow}>
        <form action={() => approveSignature(id, true)}>
          <FormSubmitButton buttonType='default' disabled={isLoggedIn}>
            Approve
          </FormSubmitButton>
        </form>
        <form action={() => approveSignature(id, false)}>
          <FormSubmitButton buttonType='default' disabled={isLoggedIn}>
            Disapprove
          </FormSubmitButton>
        </form>
        <form action={() => deleteSignature(id)}>
          <FormSubmitButton buttonType='default' disabled={isLoggedIn}>
            Delete
          </FormSubmitButton>
        </form>
      </div>
    </li>
  );
}
