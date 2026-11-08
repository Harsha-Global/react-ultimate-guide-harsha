'use client';
import { useState, type FormEvent } from 'react';
export function UploadPanel({ orderId }: { orderId: string }) {
  const [message, setMessage] = useState(''); const [busy, setBusy] = useState(false);
  async function upload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const file = new FormData(event.currentTarget).get('image');
    if (!(file instanceof File) || file.size === 0) { setMessage('Choose an image first.'); return; }
    setBusy(true);
    try {
      const response = await fetch(`/api/workshop/orders/${encodeURIComponent(orderId)}/uploads`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ contentType: file.type, size: file.size }) });
      const ticket = await response.json();
      if (!response.ok) { setMessage(ticket.error); return; }
      const stored = await fetch(ticket.url, { method: 'PUT', headers: { 'Content-Type': file.type }, body: file });
      if (!stored.ok) throw new Error('Upload rejected.');
      setMessage('Uploaded to quarantine. It is not attached to your order yet.');
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
    </form>
  );
}
