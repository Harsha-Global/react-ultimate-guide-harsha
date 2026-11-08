'use client';
import { useState, type FormEvent } from 'react';
export function UploadPanel({ orderId }: { orderId: string }) {
  const [attachmentId, setAttachmentId] = useState('');
  const [message, setMessage] = useState(''); const [busy, setBusy] = useState(false);
  async function upload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const file = new FormData(event.currentTarget).get('image');
    if (!(file instanceof File) || file.size === 0) { setMessage('Choose an image first.'); return; }
    setAttachmentId(''); setBusy(true); setMessage('');
    try {
      const response = await fetch(`/api/workshop/orders/${encodeURIComponent(orderId)}/uploads`, { method: 'POST', signal: AbortSignal.timeout(15000), headers: { 'content-type': 'application/json' }, body: JSON.stringify({ contentType: file.type, size: file.size }) });
      const ticket = await response.json();
      if (!response.ok) { setMessage(ticket.error); return; }
      const stored = await fetch(ticket.url, { method: 'PUT', headers: { 'Content-Type': file.type }, body: file, signal: AbortSignal.timeout(40000) });
      if (!stored.ok) throw new Error('Upload rejected.');
      const verified = await fetch(`/api/workshop/orders/${encodeURIComponent(orderId)}/uploads/${ticket.id}`, { method: 'POST', signal: AbortSignal.timeout(40000) });
      const result = await verified.json();
      if (!verified.ok) { setMessage(result.error); return; }
      setAttachmentId(result.id); setMessage('Verified image attached.');
    } catch { setMessage('The upload failed. Choose the file and try again.'); }
    finally { setBusy(false); }
  }
  return (
    <form onSubmit={upload} className="fs-form">
      <h3>Order image</h3>
      <label>PNG or JPEG<input disabled={busy} name="image" type="file" accept="image/png,image/jpeg" aria-describedby="image-help"/></label>
      <p id="image-help">Maximum 500 KB. Use only a disposable course image.</p>
      <button disabled={busy}>{busy ? 'Uploading…' : 'Upload image'}</button>
      <p role="status">{message}</p>
      {attachmentId && <a href={`/api/workshop/orders/${encodeURIComponent(orderId)}/uploads/${attachmentId}/image`} target="_blank" rel="noreferrer">Open verified image</a>}
    </form>
  );
}
