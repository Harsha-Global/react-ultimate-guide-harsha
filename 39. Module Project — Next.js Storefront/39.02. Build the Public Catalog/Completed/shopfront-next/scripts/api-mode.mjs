import { readFile, writeFile } from 'node:fs/promises';
import { products } from '../lib/catalog.ts';
const [mode, id, value] = process.argv.slice(2);
const root = new URL('../data/', import.meta.url);
if (['ready', 'slow', 'error'].includes(mode)) {
 await writeFile(new URL('api-mode.json', root), JSON.stringify({ mode }));
} else if (mode === 'reset') {
 await writeFile(new URL('api-products.json', root), JSON.stringify({ revision: 1, products }));
 await writeFile(new URL('api-mode.json', root), JSON.stringify({ mode: 'ready' }));
} else if (mode === 'stock' && Number.isInteger(Number(value)) && Number(value) >= 0) {
 const file = new URL('api-products.json', root);
 const data = JSON.parse(await readFile(file, 'utf8'));
 const product = data.products.find(item => item.id === id);
 if (!product) throw new Error('Unknown product');
 product.stock = Number(value); data.revision++;
 await writeFile(file, JSON.stringify(data));
} else throw new Error('Use ready | slow | error | reset | stock P-101 7');
console.log(`Sample API fixture: ${mode}`);
