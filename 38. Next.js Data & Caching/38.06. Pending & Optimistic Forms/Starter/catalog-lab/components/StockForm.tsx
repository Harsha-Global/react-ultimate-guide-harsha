'use client';
import { useActionState } from 'react';
import { saveStock, type StockResult } from '@/app/actions/stock';
const initial:StockResult={status:'idle',message:'Update the local sample stock.',stock:null};
export function StockForm({initialStock}:{initialStock:number}) {
 const [result,action,pending]=useActionState(async (previous:StockResult, formData:FormData) => {
  const next = await saveStock(previous,formData);
  return next.status === 'saved' ? next : {...next,stock:previous.stock};
 },initial);
 return <section className="panel"><h2>Local stock editor</h2><p>Confirmed stock: {result.stock ?? initialStock}</p><form action={action}><input type="hidden" name="id" value="P-101"/><label htmlFor="lamp-stock">Lamp stock</label><input id="lamp-stock" name="stock" type="number" min="0" max="99" step="1" required defaultValue={initialStock}/><button disabled={pending}>Save stock</button></form><p role="status">{result.message}</p></section>;
}
