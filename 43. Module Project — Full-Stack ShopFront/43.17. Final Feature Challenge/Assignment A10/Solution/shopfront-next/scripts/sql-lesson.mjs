import 'dotenv/config';
import { readFile } from 'node:fs/promises';
import pg from 'pg';
const client = new pg.Client({ connectionString: process.env.DATABASE_URL, connectionTimeoutMillis: 5000 });
try {
  await client.connect();
  const results = await client.query(await readFile(new URL('../sql/relations.sql', import.meta.url), 'utf8'));
  for (const result of results) if (result.rows.length) console.table(result.rows);
} finally { await client.end(); }
