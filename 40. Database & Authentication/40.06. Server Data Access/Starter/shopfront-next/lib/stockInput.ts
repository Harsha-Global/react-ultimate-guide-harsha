export function parseStockInput(formData: FormData): {id:string;stock:number} | null {
 const id=formData.get('id'); const raw=formData.get('stock');
 if (typeof id!=='string' || !/^P-\d{3}$/.test(id) || typeof raw!=='string' || !/^\d{1,2}$/.test(raw.trim())) return null;
 return {id, stock:Number(raw.trim())};
}
