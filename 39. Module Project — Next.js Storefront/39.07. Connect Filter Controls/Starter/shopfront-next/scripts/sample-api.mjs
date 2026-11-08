import { createServer } from 'node:http';
import { readFile, writeFile } from 'node:fs/promises';
import { products as original } from '../lib/catalog.ts';
const dataUrl = new URL('../data/api-products.json', import.meta.url);
const modeUrl = new URL('../data/api-mode.json', import.meta.url);
let reads = 0;
const send = (res, status, value) => { res.writeHead(status, { 'content-type': 'application/json', 'cache-control': 'no-store' }); res.end(JSON.stringify(value)); };
try { await readFile(dataUrl); } catch { await writeFile(dataUrl, JSON.stringify({ revision: 1, products: original })); }
const server = createServer(async (req, res) => {
 try {
  const url = new URL(req.url, 'http://127.0.0.1');
  if (url.pathname === '/health') return send(res, 200, { status: 'ok' });
  if (url.pathname === '/metrics') return send(res, 200, { reads });
  const { mode } = JSON.parse(await readFile(modeUrl, 'utf8'));
  if (mode === 'slow') await new Promise(resolve => setTimeout(resolve, 2000));
  if (mode === 'error') return send(res, 503, { message: 'Sample catalog is unavailable' });
  const data = JSON.parse(await readFile(dataUrl, 'utf8'));
  if (req.method === 'GET' && url.pathname === '/products') {
   reads++; console.log(`catalog read ${reads}, revision ${data.revision}`);
   return send(res, 200, data);
  }
  if (req.method === 'GET' && url.pathname.startsWith('/stock/')) {
   const product = data.products.find(item => item.id === decodeURIComponent(url.pathname.slice(7)));
   if (!product) return send(res, 404, { message: 'Unknown product' });
   reads++; console.log(`stock read ${reads}, ${product.id}`);
   return send(res, 200, { id: product.id, stock: product.stock, revision: data.revision });
  }
  return send(res, 404, { message: 'Unknown endpoint' });
 } catch { send(res, 500, { message: 'Fixture could not be read' }); }
});
server.listen(5211, '127.0.0.1', () => console.log('Sample API: http://127.0.0.1:5211'));
