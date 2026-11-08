// Local fixture timing comparison. Start npm run api and select api:slow first.
const base='http://127.0.0.1:5211';
async function get(path){const r=await fetch(base+path);if(!r.ok)throw new Error(`${path}: ${r.status}`);return r.json();}
let start=performance.now();await get('/products');await get('/stock/P-101');console.log('Sequential ms:',Math.round(performance.now()-start));
start=performance.now();await Promise.all([get('/products'),get('/stock/P-101')]);console.log('Parallel ms:',Math.round(performance.now()-start));
console.log('Restore npm run api:ready after comparing. Exact timings vary.');
