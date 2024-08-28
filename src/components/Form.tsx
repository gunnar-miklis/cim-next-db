'use client';

import styles from '@/src/styles/app.module.css';
import { addSignature } from './ServerActions';

export default function Form() {
  return (
    <form className={styles.form} action={addSignature}>
      <div className={styles.inputWrapper}>
        <label htmlFor='name'>Name (optional)</label>
        <input id='name' name='name' maxLength={100} />
      </div>
      <div className={styles.inputWrapper}>
        <label htmlFor='email'>Email</label>
        <input id='email' name='email' type='email' required />
      </div>
      <label>
        <input type='checkbox' name='privacy' value='accept' />
        <small>*Agree Privacy Terms.</small>
      </label>
      <button type='submit'>
        <strong style={{ textTransform: 'uppercase' }}>Sign now!</strong>
      </button>
    </form>
  );
}
