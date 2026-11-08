import 'dotenv/config';
import { spawn } from 'node:child_process';
const url = new URL(process.env.TEST_DATABASE_URL ?? '');
if (!['127.0.0.1','localhost'].includes(url.hostname) || url.pathname !== '/shopfront_test') throw new Error('Use the isolated shopfront_test database.');
const env = { ...process.env, DATABASE_URL: url.toString(), DIRECT_URL: url.toString() };
function run(args) { return new Promise((resolve,reject) => { const child=spawn(process.execPath,args,{env,stdio:'inherit'});child.on('error',reject);child.on('exit',code=>code===0?resolve():reject(new Error(`Test command failed (${code}).`))); }); }
await run(['node_modules/prisma/build/index.js','migrate','deploy']);
await run(['node_modules/prisma/build/index.js','generate']);
await run(['--import','tsx','prisma/seed.ts']);
await run(['--conditions=react-server','--import','tsx','--test',process.argv[2] ?? 'tests/workflows.integration.ts']);
