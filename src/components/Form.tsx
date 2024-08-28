'use client';

import styles from '@/src/styles/petition.module.css';

export default function Form() {
  return (
    <form className={styles.form}>
      <div className={styles.inputs}>
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
          *Agree Privacy Terms.
        </label>
        <button type='submit'>Sign now!</button>
      </div>
    </form>
  );
}
