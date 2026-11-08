import { parseStock } from '@/lib/stockContract';
import { readCatalog } from '@/lib/catalogApi';
export async function CatalogSummary() {
 const catalogPromise = readCatalog();
 const stockPromise = fetch('http://127.0.0.1:5211/stock/P-101', { cache:'no-store' });
 const [catalog, response] = await Promise.all([catalogPromise, stockPromise]);
 if (!response.ok) throw new Error('Stock request failed');
 const stock = parseStock(await response.json(),'P-101');
 return <aside className="panel"><h2>At a glance</h2><p>{catalog.products.length} products · Lamp stock: {stock.stock}</p><p>Summary revision: {catalog.revision}</p></aside>;
}
