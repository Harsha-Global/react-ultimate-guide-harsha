'use client';
import { useState, type FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { authClient } from '@/lib/authClient';
export function RecoveryPanel() {
  const params = useSearchParams();
  const token = params.get('token');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = new FormData(event.currentTarget);
    setBusy(true);
    try {
      if (token) {
        const result = await authClient.resetPassword({ token, newPassword: String(form.get('password')) });
        setMessage(result.error ? 'This reset could not be completed. Request a new link or check the password.' : 'Password updated. Sign in again.');
      } else {
        const result = await authClient.requestPasswordReset({ email: String(form.get('email')), redirectTo: '/workshop/recovery' });
        setMessage(result.error ? 'The request could not be completed. Try again shortly.' : 'If the address is registered, a reset link will arrive shortly.');
      }
    } catch { setMessage('The service is unavailable. Please try again.'); }
    finally { setBusy(false); }
  }
  return (
    <section className="fs-card">
      <h2>{token ? 'Choose a new password' : 'Request a reset link'}</h2>
      {params.has('error') && <p role="alert">This link is invalid or expired. Request a new one.</p>}
      <form onSubmit={submit} className="fs-form">
        {token ? <label>New password<input name="password" type="password" autoComplete="new-password" minLength={12} maxLength={128} required/></label> : <label>Email<input name="email" type="email" autoComplete="email" required/></label>}
        <button disabled={busy}>{busy ? 'Please wait…' : token ? 'Save new password' : 'Request reset'}</button>
      </form>
      <p role="status">{message}</p>
    </section>
  );
}
