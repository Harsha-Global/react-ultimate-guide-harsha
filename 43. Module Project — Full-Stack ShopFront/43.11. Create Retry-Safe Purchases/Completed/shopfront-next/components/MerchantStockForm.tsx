'use client';
import { useRouter } from 'next/navigation';
import { useId, useState, type FormEvent } from 'react';
export function MerchantStockForm({ workspaceId, productId, stock }: { workspaceId: string; productId: string; stock: number }) {
  const router = useRouter();
  const inputId = useId();
  const [draft, setDraft] = useState(String(stock));
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage('');
    try {
      const response = await fetch(`/api/merchant/${workspaceId}/products/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expectedStock: stock, stock: Number(draft) }),
      });
      const result = await response.json();
      if (!response.ok) {
        setMessage(result.error);
        return;
      }
      setMessage('Saved.');
      router.refresh();
    } catch {
      setMessage('Save could not be confirmed. Refresh to check the current stock before retrying.');
    } finally {
      setBusy(false);
    }
  }
  return (
    <form onSubmit={save} className="sf-stock-form">
      <label htmlFor={inputId}>Stock<input id={inputId} type="number" min="0" max="100000" step="1" required value={draft} onChange={event => setDraft(event.target.value)} disabled={busy}/></label>
      <button disabled={busy}>{busy ? 'Saving…' : 'Save stock'}</button>
      <p role="status">{message}</p>
    </form>
  );
}
