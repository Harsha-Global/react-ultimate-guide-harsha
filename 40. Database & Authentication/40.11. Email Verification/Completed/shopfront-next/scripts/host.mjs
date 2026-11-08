import 'dotenv/config';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
const mode = process.argv[2];
if (!['build', 'start'].includes(mode)) throw new Error('Use node scripts/host.mjs build | start');
const cwd = fileURLToPath(new URL('../', import.meta.url));
// An explicit value also overrides a local .env file loaded later by Next.
const env = { ...process.env, COURSE_HOSTED_DEMO: 'read-only', COURSE_ALLOW_WRITES: 'disabled' };
const hosted = env.DEPLOYMENT_KIND === 'preview' || env.DEPLOYMENT_KIND === 'production' || Boolean(env.RENDER);
const hostname = hosted ? '0.0.0.0' : '127.0.0.1';
const port = env.PORT || (hosted ? '10000' : '3000');
if (!/^\d+$/.test(port) || Number(port) < 1 || Number(port) > 65535) throw new Error('PORT must be a valid port number');
let api, next, stopping = false;
async function endChild(child) {
 if (!child || child.exitCode !== null || child.signalCode !== null) return;
 const ended = once(child, 'exit');
 child.kill('SIGTERM');
 const force = setTimeout(() => child.kill('SIGKILL'), 4000);
 force.unref();
 await ended;
 clearTimeout(force);
}
async function finish(code) {
 if (stopping) return;
 stopping = true;
 await Promise.all([endChild(next), endChild(api)]);
 process.exitCode = code;
}
process.on('SIGINT', () => void finish(0));
process.on('SIGTERM', () => void finish(0));
try {
 const reset = spawn(process.execPath, ['scripts/api-mode.mjs', 'reset'], { cwd, env, stdio: 'inherit' });
 const [resetCode] = await once(reset, 'exit');
 if (resetCode !== 0) throw new Error('The hosted demo fixture could not be reset');
 api = spawn(process.execPath, ['scripts/sample-api.mjs'], { cwd, env, stdio: ['ignore', 'pipe', 'inherit'] });
 await new Promise((ready, reject) => {
  let text = '';
  const timeout = setTimeout(() => reject(new Error('Sample API startup timed out')), 10000);
  const failed = (code) => { clearTimeout(timeout); reject(new Error(`Sample API stopped before readiness: ${code}`)); };
  api.once('error', reject);
  api.once('exit', failed);
  api.stdout.on('data', chunk => {
   process.stdout.write(chunk); text += chunk;
   if (text.includes('Sample API: http://127.0.0.1:5211')) {
    clearTimeout(timeout); api.off('exit', failed); ready();
   }
  });
 });
 api.on('exit', () => { if (!stopping) { console.error('Sample API stopped unexpectedly'); void finish(1); } });
 const args = mode === 'build' ? ['build'] : ['start', '--hostname', hostname, '--port', port];
 next = spawn(process.execPath, [resolve(cwd, 'node_modules/next/dist/bin/next'), ...args], { cwd, env, stdio: 'inherit' });
 const [code] = await once(next, 'exit');
 await finish(code ?? 1);
} catch (error) {
 console.error(error.message);
 await finish(1);
}
