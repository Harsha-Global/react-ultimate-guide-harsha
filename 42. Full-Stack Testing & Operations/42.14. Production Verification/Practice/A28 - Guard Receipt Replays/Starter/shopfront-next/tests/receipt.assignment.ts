import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { db } from '../lib/db';
import { saveReceipt } from '../lib/receipt';

const url = new URL(process.env.DATABASE_URL ?? '');
if (!['localhost', '127.0.0.1'].includes(url.hostname)
  || url.pathname !== '/shopfront_test')
  throw new Error('Use the isolated local test database.');

test('receipt creation rejects unpaid orders and remains stable across duplicate paid calls', async () => {
  // TODO: create unique local fixtures, exercise saveReceipt and assert stored state.
  // Always clean up only your records and disconnect the database client.
  void randomUUID;
  void db;
  void saveReceipt;
  assert.fail('Complete the receipt regression test.');
});
