import 'dotenv/config';
import { db } from '../lib/db.ts';
import { recoverPendingPayments } from '../lib/paymentRecovery.ts';
const url = new URL(process.env.DATABASE_URL ?? '');
if (!['localhost','127.0.0.1'].includes(url.hostname) || !['/shopfront_dev','/shopfront_test'].includes(url.pathname)) throw new Error('Use the separate local course database.');
try { console.log(await recoverPendingPayments()); } finally { await db.$disconnect(); }
