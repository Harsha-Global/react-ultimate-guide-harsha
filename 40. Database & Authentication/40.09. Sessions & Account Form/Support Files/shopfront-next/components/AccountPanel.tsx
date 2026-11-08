'use client';
import { useState, type FormEvent } from 'react';
export function AccountPanel() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // LIVE: read the form, then add signup/signin handling.
    setBusy(false); setMessage('Connect authentication in this lesson.');
  }
  return <section className="fs-card">
      <form onSubmit={submit} className="fs-form">
        {mode === 'signup' && <label>Name<input name="name" autoComplete="name" required maxLength={60}/></label>}
        <label>Email<input name="email" type="email" autoComplete="email" required/></label>
        <label>Password<input name="password" type="password" autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} required minLength={12} maxLength={128} aria-describedby="password-help"/></label>
        <p id="password-help">Use a disposable course password with at least 12 characters.</p>
        <button disabled={busy}>{busy ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}</button>
      </form>
      <button type="button" disabled={busy} onClick={() => {setMode(mode === 'signin' ? 'signup' : 'signin');setMessage('');}}>{mode === 'signin' ? 'Need an account?' : 'Already registered?'}</button>
    <p role="status">{message}</p>
  </section>;
}
