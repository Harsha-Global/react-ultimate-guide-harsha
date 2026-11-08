'use client';
import { useActionState, useOptimistic } from 'react';
import { useFormStatus } from 'react-dom';
import { saveStock, type StockResult } from '@/app/actions/stock';
const initial:StockResult={status:'idle',message:'Update the local sample stock.',stock:null};
function SubmitStock() {
 const {pending}=useFormStatus();
 return <button disabled={pending}>{pending?'Saving…':'Save stock'}</button>;
}
export function StockForm({initialStock}:{initialStock:number}) {
 const [result,action,pending]=useActionState(async (previous:StockResult, formData:FormData) => {
  const next = await saveStock(previous,formData);
  return next.status === 'saved' ? next : {...next,stock:previous.stock};
 },initial);
 const confirmed=result.stock ?? initialStock;
 const [displayed,setOptimistic]=useOptimistic(confirmed);
 async function submit(formData:FormData) {
  const value=Number(formData.get('stock'));
  if(Number.isInteger(value)&&value>=0&&value<=99) setOptimistic(value);
  action(formData);
 }
 return <section className="panel"><h2>Local stock editor</h2><p role="status">{pending?'Proposed':'Confirmed'} stock: {displayed}</p><form action={submit}><fieldset disabled={pending}><legend>Sample lamp inventory</legend><input type="hidden" name="id" value="P-101"/><label htmlFor="lamp-stock">Lamp stock</label><input id="lamp-stock" name="stock" type="number" min="0" max="99" step="1" required defaultValue={initialStock}/><SubmitStock/></fieldset></form><p role="status">{result.message}</p></section>;
}
