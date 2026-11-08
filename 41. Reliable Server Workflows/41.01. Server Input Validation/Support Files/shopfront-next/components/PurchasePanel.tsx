'use client';
import { useState, type FormEvent } from 'react';
export function PurchasePanel() {
  const [message, setMessage] = useState('');
  const [quantityError, setQuantityError] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(false); setQuantityError(''); setMessage('Connect the server quote in this lesson.');
  }
  return <form onSubmit={submit} className="fs-card fs-form" noValidate>
    <label>Product<select name="productId"><option value="P-101">Studio Desk Lamp</option><option value="P-103">Terracotta Travel Mug</option></select></label>
    <label>Quantity<input name="quantity" type="number" defaultValue={1} min={1} max={5} step={1}/></label>
    <p id="quantity-help">Choose between 1 and 5 units.</p>{quantityError && <p id="quantity-error" role="alert">{quantityError}</p>}
    <button disabled={busy}>{busy ? 'Checking…' : 'Check order'}</button><p role="status">{message}</p>
  </form>;
}
