function parseStockInput(formData: FormData): {id:string;stock:number} | null {
 // Validate both untrusted form fields before returning a write input.
 return { id:String(formData.get('id')), stock:Number(formData.get('stock')) };
}
