// Local hosting demonstration only. The lesson uses this tool; it does not teach its implementation.
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
const args = process.argv.slice(2);
const option = (name, fallback) => args.includes(name) ? args[args.indexOf(name) + 1] : fallback;
const fallback = args.includes('--fallback');
const port = Number(option('--port', fallback ? '5187' : '5186'));
const root = resolve(option('--root', fileURLToPath(new URL('../../routed-directory/dist/', import.meta.url))));
const mime = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.ttf':'font/ttf', '.png':'image/png', '.svg':'image/svg+xml' };
http.createServer(async (req,res) => {
  const url = new URL(req.url ?? '/', 'http://127.0.0.1');
  if (url.pathname.startsWith('/api/')) {
    const upstream = http.request({hostname:'127.0.0.1',port:4183,path:url.pathname+url.search,method:req.method,headers:req.headers}, response => {res.writeHead(response.statusCode ?? 502,response.headers);response.pipe(res);});
    upstream.on('error',()=>{res.writeHead(502,{'Content-Type':'application/json'});res.end(JSON.stringify({message:'Local teaching API is unavailable.'}));});
    req.pipe(upstream);return;
  }
  if (req.method !== 'GET' && req.method !== 'HEAD') {res.writeHead(405);res.end('Method not allowed');return;}
  let requested;
  try { requested = resolve(root, '.' + decodeURIComponent(url.pathname)); } catch {res.writeHead(400);res.end('Bad path');return;}
  if (requested !== root && !requested.startsWith(root + sep)) {res.writeHead(403);res.end('Forbidden');return;}
  if (url.pathname === '/') requested = resolve(root,'index.html');
  try { if (!(await stat(requested)).isFile()) throw Error('not file'); }
  catch {
    if (fallback && !extname(url.pathname) && !url.pathname.startsWith('/assets/')) requested = resolve(root,'index.html');
    else {res.writeHead(404,{'Content-Type':'text/plain'});res.end('No static file matches this path.');return;}
  }
  try {const body=await readFile(requested);res.writeHead(200,{'Content-Type':mime[extname(requested)]??'application/octet-stream'});res.end(req.method==='HEAD'?undefined:body);}
  catch {res.writeHead(500,{'Content-Type':'text/plain'});res.end('Build the selected application before starting this demonstration.');}
}).listen(port,'127.0.0.1',()=>console.log(`Local ${fallback?'application fallback':'plain static'} host: http://127.0.0.1:${port}\nBuild directory: ${root}`));
