'use client';
import { useRef, useState } from 'react';
type Line = { productId: string; name: string };
export function ReorderPanel({ orderId, lines }: { orderId: string; lines: Line[] }) {
  const [productId,setProductId]=useState(lines[0]?.productId ?? '');
  const [quantity,setQuantity]=useState('1');
  const [message,setMessage]=useState('');
  const [result,setResult]=useState<{id:string;total:number}|null>(null);
  const [busy,setBusy]=useState(false);
  const requestKey=useRef('');
  function changed() { requestKey.current='';setResult(null);setMessage(''); }
  async function reorder() {
    if (!requestKey.current) requestKey.current=crypto.randomUUID();
    setBusy(true);setMessage('');
    try {
      const response=await fetch(`/api/workshop/orders/${encodeURIComponent(orderId)}/reorder`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({requestKey:requestKey.current,productId,quantity:Number(quantity)}),signal:AbortSignal.timeout(40000)});
      const data=await response.json();
      if (!response.ok) {setMessage(data.error ?? 'The reorder was not confirmed.');return;}
      setResult(data);setMessage('Reorder confirmed. Repeating this attempt returns the same order.');
    } catch {setMessage('The result was not confirmed. Retry the same attempt before starting another.');}
    finally {setBusy(false);}
  }
  return <section className="fs-card fs-reorder"><h2>Reorder one product</h2>
    <p>This creates a new order at the current catalog price. It does not charge a card.</p>
    <label htmlFor="reorder-product">Saved product</label><select id="reorder-product" value={productId} disabled={busy} onChange={event=>{changed();setProductId(event.target.value);}}>{lines.map(line=><option key={line.productId} value={line.productId}>{line.name} ({line.productId})</option>)}</select>
    <label htmlFor="reorder-quantity">Quantity</label><input id="reorder-quantity" type="number" min="1" max="5" step="1" value={quantity} disabled={busy} onChange={event=>{changed();setQuantity(event.target.value);}}/>
    <button disabled={busy||!productId} onClick={reorder}>{busy?'Requesting…':'Request or retry reorder'}</button>
    <button disabled={busy||!result} onClick={changed}>Start another reorder</button>
    <p role="status">{message}</p>{result&&<p>New order: <strong>{result.id}</strong> · Total ${(result.total/100).toFixed(2)}</p>}
  </section>;
}
