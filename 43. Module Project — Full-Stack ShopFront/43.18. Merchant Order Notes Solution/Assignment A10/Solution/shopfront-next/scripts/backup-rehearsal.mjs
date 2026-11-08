import 'dotenv/config';
import pg from 'pg';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { resolve, join } from 'node:path';
import { mkdir, chmod, stat } from 'node:fs/promises';
const source = new URL(process.env.DATABASE_URL ?? '');
const target = new URL(process.env.RESTORE_DATABASE_URL ?? '');
if (!['127.0.0.1','localhost'].includes(source.hostname) || source.pathname !== '/shopfront_dev') throw new Error('The backup source must be the local shopfront_dev database.');
if (!['127.0.0.1','localhost'].includes(target.hostname) || target.pathname !== '/shopfront_restore') throw new Error('Restore only into the separate local shopfront_restore database.');
const targetClient = new pg.Client({ connectionString: target.toString() });
await targetClient.connect();
try {
  const result = await targetClient.query("SELECT COUNT(*)::int AS count FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE'");
  if (result.rows[0].count !== 0) throw new Error('The restore database must be empty. Nothing has been overwritten.');
} finally { await targetClient.end(); }
const directory=resolve('.course-backups');await mkdir(directory,{recursive:true,mode:0o700});
const backup=join(directory,`shopfront-${Date.now()}.dump`);
function connection(url) {return {...process.env,PGHOST:url.hostname,PGPORT:url.port||'5432',PGDATABASE:url.pathname.slice(1),PGUSER:decodeURIComponent(url.username),PGPASSWORD:decodeURIComponent(url.password)};}
async function run(binary,args,env) {
  const name=process.platform==='win32'?`${binary}.exe`:binary;
  const executable=process.env.PG_BIN?join(process.env.PG_BIN,name):name;
  const child=spawn(executable,args,{env,stdio:'inherit'});const [code]=await once(child,'exit');
  if(code!==0)throw new Error(`${binary} failed (${code}).`);
}
await run('pg_dump',['--format=custom','--no-owner','--no-acl','--file',backup],connection(source));
await chmod(backup,0o600);
await run('pg_restore',['--exit-on-error','--no-owner','--no-acl','--dbname',target.pathname.slice(1),backup],connection(target));
const counts=async url=>{const client=new pg.Client({connectionString:url.toString()});await client.connect();try{return (await client.query('SELECT (SELECT COUNT(*)::int FROM "Customer") AS customers,(SELECT COUNT(*)::int FROM "Order") AS orders,(SELECT COUNT(*)::int FROM "OrderItem") AS items')).rows[0];}finally{await client.end();}};
const original=await counts(source),restored=await counts(target);
if(JSON.stringify(original)!==JSON.stringify(restored))throw new Error('Restored counts differ; investigate before relying on this backup.');
console.log({backupBytes:(await stat(backup)).size,original,restored});
console.log('Restore rehearsal passed. Keep this private backup outside source distribution.');
