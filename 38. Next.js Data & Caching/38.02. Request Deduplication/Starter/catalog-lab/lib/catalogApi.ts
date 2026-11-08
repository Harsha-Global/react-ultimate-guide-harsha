import 'server-only';
import { parseCatalog } from './catalogContract';
export async function readCatalog() {
 const response = await fetch('http://127.0.0.1:5211/products', { cache: 'no-store' });
 if (!response.ok) throw new Error('Catalog request failed');
 return parseCatalog(await response.json());
}
