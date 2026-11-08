import 'dotenv/config';
import { spawn } from 'node:child_process';
import { randomBytes } from 'node:crypto';
const url = new URL(process.env.TEST_DATABASE_URL ?? '');
if (!['localhost','127.0.0.1'].includes(url.hostname) || url.pathname !== '/shopfront_test') throw new Error('Use the separate local shopfront_test database.');
const env = { ...process.env, DATABASE_URL: url.toString(), DIRECT_URL: url.toString(),
  BETTER_AUTH_URL: 'http://127.0.0.1:3140', BETTER_AUTH_SECRET: randomBytes(32).toString('hex'),
  GITHUB_CLIENT_ID: '', GITHUB_CLIENT_SECRET: '', NODE_ENV: 'development',
  SMTP_HOST: '127.0.0.1', SMTP_PORT: '2525', SMTP_SECURE: 'false', SMTP_USER: '', SMTP_PASSWORD: '',
  MAIL_FROM: 'ShopFront <demo@example.test>',
};
function run(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, { env, stdio: 'inherit' });
    child.on('error', reject); child.on('exit', code => code === 0 ? resolve() : reject(new Error(`Recovery check failed (${code}).`)));
  });
}
const mailbox = await fetch('http://127.0.0.1:3041', { signal: AbortSignal.timeout(2000) }).catch(() => null);
if (!mailbox?.ok) throw new Error('Start npm run mail in another terminal before this check.');
await run(['node_modules/prisma/build/index.js', 'migrate', 'deploy']);
await run(['node_modules/prisma/build/index.js', 'generate']);
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'dev', '--hostname', '127.0.0.1', '--port', '3140'], { env, stdio: ['ignore','pipe','pipe'] });
let log = ''; server.stdout.on('data', data => { log = (log + data).slice(-8000); }); server.stderr.on('data', data => { log = (log + data).slice(-8000); });
try {
  let ready = false;
  for (let attempt = 0; attempt < 120; attempt++) {
    if (server.exitCode !== null) throw new Error('The test server exited before becoming ready.');
    try { const response = await fetch(`${env.BETTER_AUTH_URL}/api/auth/get-session`, { signal: AbortSignal.timeout(1500) }); if (response.ok) { ready = true; break; } } catch {}
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  if (!ready) throw new Error('The isolated recovery-test server did not become ready.');
  await run(['--test', 'tests/recovery.integration.mjs']);
} catch (error) { console.error(log.replace(/token=[^&\s]+/g, 'token=[redacted]').replace(/reset-password\/[^?\s]+/g, 'reset-password/[redacted]')); throw error; }
finally {
  if (server.exitCode === null) { server.kill('SIGTERM'); await new Promise(resolve => server.once('exit', resolve)); }
}
