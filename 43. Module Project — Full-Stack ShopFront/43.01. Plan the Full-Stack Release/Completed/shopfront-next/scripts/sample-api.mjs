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
  const match = /^\/products\/(P-\d{3})\/stock$/.exec(url.pathname);
  if (req.method === 'PUT' && match) {
   if (process.env.COURSE_HOSTED_DEMO === 'read-only') return send(res,403,{message:'The hosted teaching fixture is read-only.'});
   if (mode === 'reject') return send(res,409,{message:'Inventory review is temporarily locked.'});
   let raw=''; for await (const chunk of req) { raw+=chunk; if (raw.length>2048) return send(res,413,{message:'Body too large'}); }
   let body; try { body=JSON.parse(raw); } catch { return send(res,400,{message:'Use a JSON stock value.'}); }
   if (!body || !Number.isInteger(body.stock) || body.stock<0 || body.stock>99) return send(res,400,{message:'Stock must be a whole number from0 to99.'});
   const product=data.products.find(item=>item.id===match[1]);
   if (!product) return send(res,404,{message:'Unknown product'});
   product.stock=body.stock;data.revision++;
   await writeFile(dataUrl,JSON.stringify(data));
   return send(res,200,{id:product.id,stock:product.stock,revision:data.revision});
  }
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
