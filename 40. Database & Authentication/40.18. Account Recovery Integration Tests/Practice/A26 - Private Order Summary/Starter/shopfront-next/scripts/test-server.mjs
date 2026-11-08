import 'dotenv/config';
import { spawn } from 'node:child_process';
import { randomBytes } from 'node:crypto';
const url = new URL(process.env.TEST_DATABASE_URL ?? '');
if (!['localhost','127.0.0.1'].includes(url.hostname) || url.pathname !== '/shopfront_test') throw new Error('Set TEST_DATABASE_URL to the separate local shopfront_test database.');
const port = '3140';
const env = { ...process.env, DATABASE_URL: url.toString(), DIRECT_URL: url.toString(),
  BETTER_AUTH_URL: `http://127.0.0.1:${port}`, BETTER_AUTH_SECRET: randomBytes(32).toString('hex'),
  GITHUB_CLIENT_ID: '', GITHUB_CLIENT_SECRET: '', NODE_ENV: 'development',
};
function run(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, { env, stdio: 'inherit' });
    child.on('error', reject); child.on('exit', code => code === 0 ? resolve() : reject(new Error(`Test setup failed: ${args[0]} (${code}).`)));
  });
}
await run(['node_modules/prisma/build/index.js', 'migrate', 'deploy']);
await run(['node_modules/prisma/build/index.js', 'generate']);
await run(['--import', 'tsx', 'prisma/seed.ts']);
await run(['--import', 'tsx', 'prisma/fixtures.ts']);
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next','dev','--hostname','127.0.0.1','--port',port], { env, stdio: ['ignore','pipe','pipe'] });
let log = ''; server.stdout.on('data', data => { log = (log + data).slice(-8000); }); server.stderr.on('data', data => { log = (log + data).slice(-8000); });
try {
  let ready = false;
  for (let attempt = 0; attempt < 120; attempt++) {
    if (server.exitCode !== null) throw new Error('The test server exited before becoming ready.');
    try { const result = await fetch(`${env.BETTER_AUTH_URL}/api/workshop/health`, { signal: AbortSignal.timeout(1000) }); if (result.ok) { ready = true; break; } } catch {}
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  if (!ready) throw new Error('The isolated test server did not become ready.');
  await run(['--test','tests/auth.integration.mjs']);
} catch (error) { console.error(log.replace(/token=[^&\s]+/g, 'token=[redacted]').replace(/reset-password\/[^?\s]+/g, 'reset-password/[redacted]')); throw error; }
finally {
  if (server.exitCode === null) {
    server.kill('SIGTERM');
    await new Promise(resolve => server.once('exit', resolve));
  }
}
