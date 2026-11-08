import 'dotenv/config';
const url = new URL(process.env.DATABASE_URL ?? '');
if (!['localhost','127.0.0.1'].includes(url.hostname) || !['/shopfront_dev','/shopfront_test'].includes(url.pathname)) throw new Error('Manual dispatch is limited to the local course databases.');
const { dispatchOutbox } = await import('../lib/outbox.ts');
const { db } = await import('../lib/db.ts');
try { console.log(await dispatchOutbox()); } finally { await db.$disconnect(); }
