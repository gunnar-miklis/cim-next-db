'use client';

import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import { addSignature } from './ServerActions';
import FormSubmitButton from '../FormSubmitButton';
import styles from '@/src/styles/app.module.css';

export default function Form() {
  const [formState, formAction] = useFormState(addSignature, initalState);

  const formRef = useRef<HTMLFormElement>(null!);
  useEffect(() => {
    if (formState.status === 'ok') formRef.current.reset();
  }, [formState]);

  return (
    <form className={styles.form} action={formAction} ref={formRef}>
      <div className={styles.inputWrapper}>
        <label htmlFor='name'>Name (optional)</label>
        <input id='name' name='name' maxLength={48} />
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor='email'>Email</label>
        <input id='email' name='email' type='email' required autoComplete='email' />
      </div>

      <label>
        <input type='checkbox' name='privacy' value='accept' />
        <small>*Agree Privacy Terms.</small>
      </label>

      <FormSubmitButton buttonType='strong'>Sign now!</FormSubmitButton>

      {formState.status === 'error' ? (
        <p style={{ color: 'red' }}>{formState.message}</p>
      ) : (
        <p style={{ color: 'green' }}>{formState.message}</p>
      )}
    </form>
  );
}

export type PetitionFormResponse = { status: 'ok' | 'error' | null; message: string };
const initalState: PetitionFormResponse = { status: null, message: '' };
