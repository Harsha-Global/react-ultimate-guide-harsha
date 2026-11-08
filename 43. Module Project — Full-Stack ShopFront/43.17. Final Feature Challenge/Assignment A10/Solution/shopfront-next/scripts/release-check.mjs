import 'dotenv/config';
const kind = process.env.DEPLOYMENT_KIND;
if (!['local', 'preview', 'production'].includes(kind)) throw new Error('Set DEPLOYMENT_KIND to local, preview, or production.');
const required = ['DATABASE_URL', 'DIRECT_URL', 'BETTER_AUTH_SECRET', 'BETTER_AUTH_URL', 'SITE_URL'];
for (const key of required) if (!process.env[key] || /REPLACE_|example_password/i.test(process.env[key])) throw new Error(`${key} is missing or still a placeholder.`);
if (process.env.BETTER_AUTH_SECRET.length < 32) throw new Error('Use a random authentication secret of at least 32 characters.');
const localHosts = ['127.0.0.1', 'localhost'];
function readUrl(key) {
  try { return new URL(process.env[key]); }
  catch { throw new Error(`${key} must be a valid URL; its private value is omitted.`); }
}
const origin = readUrl('SITE_URL');
const authOrigin = readUrl('BETTER_AUTH_URL');
for (const value of [origin, authOrigin]) if (value.pathname !== '/' || value.search || value.hash || value.username || value.password) throw new Error('Use an origin without a path, query, fragment or credentials.');
for (const key of ['DATABASE_URL','DIRECT_URL']) if (!['postgres:','postgresql:'].includes(readUrl(key).protocol)) throw new Error(`${key} must be a PostgreSQL connection URL.`);
if (kind === 'local') {
  if (!localHosts.includes(origin.hostname) || origin.protocol !== 'http:') throw new Error('This local launcher requires an HTTP localhost or127.0.0.1 origin.');
  const port=process.env.PORT || '3000';
  if (!/^\d+$/.test(port) || Number(port)<1 || Number(port)>65535 || Number(origin.port || '80') !== Number(port)) throw new Error('The local SITE_URL port must match PORT (default3000).');
}
if (origin.origin !== authOrigin.origin) throw new Error('SITE_URL and BETTER_AUTH_URL must have the same origin.');
if (kind !== 'local') {
  if (origin.protocol !== 'https:' || localHosts.includes(origin.hostname)) throw new Error('A hosted release requires its exact HTTPS origin.');
  for (const key of ['DATABASE_URL','DIRECT_URL']) if (localHosts.includes(readUrl(key).hostname)) throw new Error(`${key} still points to the local database.`);
  for (const key of ['STRIPE_SECRET_KEY','STRIPE_WEBHOOK_SECRET','S3_ENDPOINT','S3_BUCKET','S3_ACCESS_KEY','S3_SECRET_KEY','INNGEST_EVENT_KEY','INNGEST_SIGNING_KEY','SMTP_HOST','SMTP_USER','SMTP_PASSWORD','MAIL_FROM','SENTRY_DSN','NEXT_PUBLIC_SENTRY_DSN']) if (!process.env[key] || /REPLACE_/i.test(process.env[key])) throw new Error(`${key} is required for this complete hosted rehearsal.`);
  if (process.env.INNGEST_DEV === '1') throw new Error('Disable INNGEST_DEV on the host.');
  if (!process.env.STRIPE_SECRET_KEY.startsWith('sk_test_')) throw new Error('This course permits Stripe sandbox keys only.');
  const storage = readUrl('S3_ENDPOINT');
  if (storage.protocol !== 'https:' || localHosts.includes(storage.hostname)) throw new Error('Use private persistent hosted object storage over HTTPS.');
  if (process.env.MAIL_FROM.includes('example.test')) throw new Error('Use the configured provider-approved sender for hosted mail.');
  if (localHosts.includes(process.env.SMTP_HOST)) throw new Error('The local mailbox is not a hosted mail service.');
  if (process.env.RENDER && ['25','465','587'].includes(process.env.SMTP_PORT ?? '2525')) throw new Error('Render Free blocks this SMTP port; choose a supported mail delivery route.');
}
console.log(`Release configuration checked (${kind}); private values were not printed.`);
