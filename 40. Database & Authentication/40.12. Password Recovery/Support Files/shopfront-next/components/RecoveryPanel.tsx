'use client';
import { useState, type FormEvent } from 'react';
export function RecoveryPanel() {
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(false); setMessage('Connect recovery in this lesson.');
  }
  return <section className="fs-card"><h2>Request a reset link</h2>
    <form onSubmit={submit} className="fs-form">
      <label>Email<input name="email" type="email" autoComplete="email" required/></label>
      <button disabled={busy}>{busy ? 'Please wait…' : 'Request reset'}</button>
    </form><p role="status">{message}</p>
  </section>;
}
