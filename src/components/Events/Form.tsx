'use client';

import type { Metadata } from 'next';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import type { Category, Venue } from '@/prisma/generated/client';
import { addEvent } from './ServerActions';
import FormSubmitButton from '../FormSubmitButton';
import styles from '@/src/styles/app.module.css';

type Props = {
  venues: Venue[];
  categories: Category[];
  isLoggedIn: boolean;
};
export default function CreateEventForm({ venues, categories, isLoggedIn }: Props) {
  const [formState, formAction] = useFormState(addEvent, initalState);

  const formRef = useRef<HTMLFormElement>(null!);
  useEffect(() => {
    if (formState.status === 'ok') formRef.current.reset();
  }, [formState]);

  return (
    <form className={styles.form} action={formAction} ref={formRef}>
      <div className={styles.inputWrapper}>
        <label htmlFor='name'>Name*</label>
        <input
          type='text'
          name='name'
          id='name'
          minLength={2}
          maxLength={100}
          required
          // @ts-expect-error the "disabled" attribute "disabled" apparently does not exist on InputHTMLAttributes. "disable" exist, but doesn't do the same as "disabled". looked it up but can't fix it :(
          disabled={isLoggedIn}
        />
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor='description'>Description (optional)</label>
        <textarea id='description' name='description' disabled={isLoggedIn} />
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor='dateStart'>Start Date*</label>
        {/* @ts-expect-error the "disabled" attribute "disabled" apparently does not exist on InputHTMLAttributes. "disable" exist, but doesn't do the same as "disabled". looked it up but can't fix it :( */}
        <input id='dateStart' name='dateStart' type='date' required disabled={isLoggedIn} />
      </div>
      <div className={styles.inputWrapper}>
        <label htmlFor='dateEnd'>End Date (optional)</label>
        {/* @ts-expect-error the "disabled" attribute "disabled" apparently does not exist on InputHTMLAttributes. "disable" exist, but doesn't do the same as "disabled". looked it up but can't fix it :( */}
        <input id='dateEnd' name='dateEnd' type='date' disabled={isLoggedIn} />
      </div>

      <div className={styles.inputWrapper}>
        <label htmlFor='venueId'>Venue*</label>
        <select id='venueId' name='venueId' required disabled={isLoggedIn}>
          {venues.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <fieldset className={styles.fieldSet}>
        <legend>Categories*</legend>
        {categories.map(({ id, name }) => (
          <label key={id}>
            {/* @ts-expect-error the "disabled" attribute "disabled" apparently does not exist on InputHTMLAttributes. "disable" exist, but doesn't do the same as "disabled". looked it up but can't fix it :( */}
            <input type='checkbox' name='categoryIds' value={id} disabled={isLoggedIn} />
            {name}
          </label>
        ))}
      </fieldset>

      <FormSubmitButton buttonType='strong' disabled={isLoggedIn}>
        Create
      </FormSubmitButton>

      {formState.status === 'error' && <p style={{ color: 'red' }}>{formState.message}</p>}
      {formState.status == 'ok' && (
        <p style={{ color: 'green' }}>
          {formState.message}
          {': '}
          <Link href={`/events/${formState.newEventId}`} style={{ textDecoration: 'underline' }}>
            Go to the newely created event
          </Link>
        </p>
      )}
    </form>
  );
}

export const metadata: Metadata = { title: 'CreateEvent' };

export type EventFormResponse = {
  status: 'ok' | 'error' | null;
  message: string;
  newEventId: number | null;
};
const initalState: EventFormResponse = {
  status: null,
  message: '',
  newEventId: null,
};
