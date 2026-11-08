'use client';
import { useId, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
export function MerchantOrderNote({ workspaceId, orderId, body, revision }: { workspaceId: string; orderId: string; body: string; revision: number }) {
  const id = useId(); const router = useRouter();
  const [draft,setDraft] = useState(body); const [busy,setBusy] = useState(false);
  const [message,setMessage] = useState(''); const [invalid,setInvalid] = useState(false);
  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setInvalid(false); setMessage('');
    try {
      const response = await fetch(`/api/merchant/${workspaceId}/orders/${orderId}/note`, { method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ body:draft,revision }) });
      const result = await response.json();
      if (!response.ok) { setMessage(result.error); setInvalid(response.status===400); return; }
      setMessage('Note saved.'); router.refresh();
    } catch { setMessage('The result is uncertain. Copy your draft, then refresh to check the saved note.'); }
    finally { setBusy(false); }
  }
  return (
    <form onSubmit={save} className="fs-form">
      <label htmlFor={id}>Merchant note<textarea id={id} value={draft} onChange={event=>setDraft(event.target.value)} required maxLength={240} disabled={busy} aria-invalid={invalid} aria-describedby={`${id}-help ${id}-message`}/></label>
      <p id={`${id}-help`}>1–240 characters. Visible only within this workspace.</p>
      <button disabled={busy}>{busy?'Saving…':'Save note'}</button>
      <p id={`${id}-message`} role="status">{message}</p>
      <button type="button" disabled={busy} onClick={()=>{if(window.confirm('Copy any unsaved draft first. Refresh this view now?'))router.refresh();}}>Refresh saved note</button>
    </form>
  );
}
