'use client';
import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/authClient';
export function AccountPanel() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const credentials = { email: String(form.get('email')), password: String(form.get('password')) };
    setBusy(true); setMessage('');
    try {
      const result = mode === 'signup'
        ? await authClient.signUp.email({ ...credentials, name: String(form.get('name')), callbackURL: '/workshop/account' })
        : await authClient.signIn.email(credentials);
      setMessage(result.error ? result.error.message ?? 'Please try again.' : 'Request completed.');
      if (!result.error) router.refresh();
    } catch { setMessage('The service is unavailable. Please try again.'); }
    finally { setBusy(false); }
  }
  async function signOut() {
    setBusy(true);
    try {
      const result = await authClient.signOut();
      if (result.error) setMessage('Sign-out failed. Please try again.');
      else { setMessage('You are signed out.'); router.refresh(); }
    } catch { setMessage('Sign-out failed. Please try again.'); }
    finally { setBusy(false); }
  }
  return (
    <section className="fs-card">
      {isPending ? <p role="status">Checking your session…</p> : session ? (
        <>
          <h2>Hello, {session.user.name}</h2>
          <button disabled={busy} onClick={signOut}>Sign out</button>
        </>
      ) : (
        <>
          <h2>{mode === 'signin' ? 'Sign in' : 'Create account'}</h2>
          <form onSubmit={submit} className="fs-form">
            {mode === 'signup' && <label>Name<input name="name" autoComplete="name" required maxLength={60}/></label>}
            <label>Email<input name="email" type="email" autoComplete="email" required/></label>
            <label>Password<input name="password" type="password" autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} required minLength={12} maxLength={128} aria-describedby="password-help"/></label>
            <p id="password-help">Use a disposable course password with at least 12 characters.</p>
            <button disabled={busy}>{busy ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}</button>
          </form>
          <button type="button" disabled={busy} onClick={() => {setMode(mode === 'signin' ? 'signup' : 'signin');setMessage('');}}>{mode === 'signin' ? 'Need an account?' : 'Already registered?'}</button>
        </>
      )}
      <p role="status">{message}</p>
    </section>
  );
}
