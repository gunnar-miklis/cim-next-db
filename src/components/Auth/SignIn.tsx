import { signIn } from '@/src/auth';

export default function SignIn() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('github');
      }}
    >
      <button type='submit'>Signin with GitHub</button>
      <br />
      <br />

      <small style={{ opacity: '0.6' }}>
        *Secure via <strong>OAuth</strong>
        <br />
        (Industry-standard protocol <br /> for authorization)
      </small>
    </form>
  );
}
