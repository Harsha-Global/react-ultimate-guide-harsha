'use client';
import { useState, type FormEvent } from 'react';
export function UploadPanel({ orderId }: { orderId: string }) {
  const [message, setMessage] = useState(''); const [busy, setBusy] = useState(false);
  async function upload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(false); setMessage('Connect the upload ticket in this lesson.');
  }
  return <form onSubmit={upload} className="fs-form"><h3>Order image</h3><label>PNG or JPEG<input disabled={busy} name="image" type="file" accept="image/png,image/jpeg" aria-describedby="image-help"/></label>
    <p id="image-help">Maximum 500 KB. Use only a disposable course image.</p><button disabled={busy}>{busy ? 'Uploading…' : 'Upload image'}</button><p role="status">{message}</p></form>;
}
