'use client';

import type { ReactNode, ButtonHTMLAttributes } from 'react';
import { useFormStatus } from 'react-dom';
import styles from '@/src/styles/app.module.css';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  buttonType: 'default' | 'strong';
};

export default function FormSubmitButton({ buttonType, children, ...props }: Props) {
  const { pending } = useFormStatus();
  return (
    <button
      type='submit'
      className={styles.flexRow}
      style={{ justifyContent: 'center' }}
      disabled={pending}
      {...props}
    >
      {pending ? (
        <div className={styles.spinner}></div>
      ) : buttonType === 'strong' ? (
        <strong style={{ textTransform: 'uppercase' }}>{children}</strong>
      ) : (
        <span>{children}</span>
      )}
    </button>
  );
}
