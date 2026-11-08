import 'dotenv/config';
import pg from 'pg';
import assert from 'node:assert/strict';
import { fulfill } from './fulfill.mjs';
const url=new URL(process.env.TEST_DATABASE_URL ?? '');
if(!['localhost','127.0.0.1'].includes(url.hostname)||url.pathname!='/shopfront_test')throw new Error('Use the isolated local test database.');
const client=new pg.Client({connectionString:url.href});await client.connect();
try{
 await client.query('BEGIN');
 await client.query('CREATE TEMP TABLE replay_fulfillment (id BIGSERIAL PRIMARY KEY,order_id TEXT NOT NULL,workspace_id TEXT NOT NULL) ON COMMIT DROP');
 await fulfill(client,'ORDER-1','W-1');
 await fulfill(client,'ORDER-1','W-1'); // replay of the same business operation
 const replay=await client.query('SELECT count(*)::int AS count FROM replay_fulfillment WHERE order_id=$1',['ORDER-1']);
 console.log('Fulfillment rows after replay:',replay.rows[0].count);
 assert.equal(replay.rows[0].count,1,'One order/workspace must not be fulfilled twice.');
 await fulfill(client,'ORDER-2','W-1');
 const independent=await client.query('SELECT count(*)::int AS count FROM replay_fulfillment');
 assert.equal(independent.rows[0].count,2,'An independent order still needs fulfillment.');
 console.log('Replay and independent-order checks passed. This is a local database exercise.');
}finally{await client.query('ROLLBACK');await client.end();}
