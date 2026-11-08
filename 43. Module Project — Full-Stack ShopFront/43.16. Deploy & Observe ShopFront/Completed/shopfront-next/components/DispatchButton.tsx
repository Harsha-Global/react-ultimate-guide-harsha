'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
export function DispatchButton({ workspaceId, orderId }: { workspaceId: string; orderId: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  async function dispatch() {
    setBusy(true);
    setMessage('');
    try {
      const response = await fetch(`/api/merchant/${workspaceId}/orders/${orderId}/dispatch`, { method: 'POST' });
      const result = await response.json();
      if (!response.ok) {
        setMessage(result.error);
        return;
      }
      router.refresh();
    } catch {
      setMessage('Dispatch could not be confirmed. Refresh or retry this same fulfillment.');
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <button onClick={dispatch} disabled={busy}>{busy ? 'Saving…' : 'Mark dispatched'}</button>
      <p role="status">{message}</p>
    </>
  );
}
