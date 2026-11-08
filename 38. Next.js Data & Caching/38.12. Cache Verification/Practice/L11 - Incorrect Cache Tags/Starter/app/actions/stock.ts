'use server';
import { updateTag, refresh } from 'next/cache';
import { catalogTag } from '@/lib/catalogCache';
import { hasLocalWriteAccess } from '@/lib/demoWriteAccess';
import { parseStockInput } from '@/lib/stockInput';
export type StockResult = { status:'idle'|'saved'|'error'; message:string; stock:number|null };
export async function saveStock(_previous:StockResult,formData:FormData):Promise<StockResult> {
 if (!await hasLocalWriteAccess()) return {status:'error',message:'Local sample writes are disabled.',stock:null};
 const input=parseStockInput(formData);
 if (!input) return {status:'error',message:'Enter a whole stock value from 0 to 99.',stock:null};
 try {
  const response=await fetch(`http://127.0.0.1:5211/products/${input.id}/stock`,{method:'PUT',headers:{'content-type':'application/json'},body:JSON.stringify({stock:input.stock})});
  if (response.status===409) return {status:'error',message:'Inventory review is locked. Restore the API, then retry.',stock:null};
  if (!response.ok) return {status:'error',message:'The stock could not be saved. Try again.',stock:null};
  updateTag('public-products');
  refresh();
  return {status:'saved',message:'The API accepted the stock update.',stock:input.stock};
 } catch { return {status:'error',message:'The API is unavailable. Your change was not confirmed.',stock:null}; }
}
