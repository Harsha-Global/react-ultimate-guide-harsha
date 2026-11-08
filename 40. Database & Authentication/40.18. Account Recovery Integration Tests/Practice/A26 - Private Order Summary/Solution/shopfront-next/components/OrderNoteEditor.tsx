'use client';
import { useState, type FormEvent } from 'react';
export function OrderNoteEditor({ id, note }: { id: string; note: string }) {
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const data = new FormData(event.currentTarget); setBusy(true);
    try {
      const response = await fetch(`/api/workshop/orders/${encodeURIComponent(id)}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ note: data.get('note') }),
      });
      const result = await response.json(); setMessage(response.ok ? 'Note saved.' : result.error);
    } catch { setMessage('The service is unavailable. Your note was not confirmed.'); }
    finally { setBusy(false); }
  }
  return (
    <form onSubmit={save} className="fs-form">
      <label>Order note<textarea name="note" defaultValue={note} maxLength={200}/></label>
      <button disabled={busy}>{busy ? 'Saving…' : 'Save note'}</button>
      <p role="status">{message}</p>
    </form>
  );
}
