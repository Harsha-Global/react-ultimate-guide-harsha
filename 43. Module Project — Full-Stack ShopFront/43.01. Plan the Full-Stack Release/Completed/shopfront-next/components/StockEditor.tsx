import { readCatalog } from '@/lib/catalogApi';
import { StockForm } from './StockForm';
export async function StockEditor() {
 const snapshot=await readCatalog();
 const lamp=snapshot.products.find(product=>product.id==='P-101');
 return lamp ? <StockForm initialStock={lamp.stock}/> : <p>The lamp is no longer in the sample catalog.</p>;
}
