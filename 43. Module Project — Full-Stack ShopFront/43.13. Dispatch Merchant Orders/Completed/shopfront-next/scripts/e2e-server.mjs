import 'dotenv/config';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { randomBytes } from 'node:crypto';

const url = new URL(process.env.TEST_DATABASE_URL ?? '');
if (!['localhost','127.0.0.1'].includes(url.hostname) || url.pathname !== '/shopfront_test') throw new Error('Use the isolated local shopfront_test database.');
const env = { ...process.env, DATABASE_URL: url.toString(), DIRECT_URL: url.toString(),
  BETTER_AUTH_URL: 'http://127.0.0.1:3240', SITE_URL: 'http://127.0.0.1:3240',
  BETTER_AUTH_SECRET: randomBytes(32).toString('hex'), GITHUB_CLIENT_ID: '', GITHUB_CLIENT_SECRET: '',
  STRIPE_SECRET_KEY: '', STRIPE_WEBHOOK_SECRET: '', SENTRY_DSN: '', NEXT_PUBLIC_SENTRY_DSN: '',
  COURSE_ALLOW_WRITES: 'disabled', COURSE_HOSTED_DEMO: 'read-only', NODE_ENV: 'production',
};
const children = new Set();let stopping=false;
function launch(args, options={}) { const child=spawn(process.execPath,args,{env,stdio:'inherit',...options});children.add(child);child.once('exit',()=>children.delete(child));return child; }
async function run(args) {const child=launch(args);const [code]=await once(child,'exit');if(code!==0)throw new Error(`Setup command failed (${code}).`);}
async function stop(code=0) {
  if(stopping)return;stopping=true;
  await Promise.all([...children].map(async child=>{const ended=once(child,'exit');child.kill('SIGTERM');const force=setTimeout(()=>child.kill('SIGKILL'),4000);force.unref();await ended;clearTimeout(force);}));
  process.exitCode=code;
}
process.on('SIGINT',()=>void stop());process.on('SIGTERM',()=>void stop());

try {
  await run(['node_modules/prisma/build/index.js','migrate','deploy']);
  await run(['node_modules/prisma/build/index.js','generate']);
  await run(['--import','tsx','prisma/seed.ts']);await run(['--import','tsx','prisma/fixtures.ts']);
  await run(['--import','tsx','prisma/browser-fixture.ts']);
  await run(['scripts/api-mode.mjs','reset']);
  const api=launch(['scripts/sample-api.mjs']);
  let ready=false;for(let i=0;i<40;i++){if(api.exitCode!==null)throw new Error('The sample API could not start.');try{if((await fetch('http://127.0.0.1:5211/health',{signal:AbortSignal.timeout(500)})).ok){ready=true;break;}}catch{}await new Promise(resolve=>setTimeout(resolve,100));}
  if(!ready)throw new Error('The sample API is not ready.');
  await run(['node_modules/next/dist/bin/next','build']);
  const next=launch(['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port','3240']);
  api.once('exit',()=>{if(!stopping)void stop(1);});
  const [code]=await once(next,'exit');await stop(code??0);
} catch(error){console.error(error.message);await stop(1);}
