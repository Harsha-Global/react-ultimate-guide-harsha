'use client';
import { useState } from 'react';
type Summary = { id: string; status: string; lineCount: number; unitCount: number; totalMinor: number };
export function OrderSummary({ id }: { id: string }) {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  async function load() {
    setBusy(true); setMessage(''); setSummary(null);
    try {
      const response = await fetch(`/api/workshop/orders/${encodeURIComponent(id)}/summary`, { cache: 'no-store' });
      const result = await response.json();
      if (!response.ok) { setMessage(result.error ?? 'The summary is unavailable.'); return; }
      setSummary(result);
    } catch { setMessage('The summary could not be loaded. Please try again.'); }
    finally { setBusy(false); }
  }
  return <section aria-label="Order summary"><button onClick={load} disabled={busy}>{busy ? 'Loading summary…' : 'Load order summary'}</button>
    <p role="status">{message}</p>{summary && <dl><dt>Order</dt><dd>{summary.id}</dd><dt>Status</dt><dd>{summary.status}</dd>
    <dt>Lines</dt><dd>{summary.lineCount}</dd><dt>Units</dt><dd>{summary.unitCount}</dd><dt>Total</dt><dd>${(summary.totalMinor / 100).toFixed(2)}</dd></dl>}</section>;
}
