import 'dotenv/config';
import pg from 'pg';
const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('Set DATABASE_URL in .env first.');
const client = new pg.Client({ connectionString, connectionTimeoutMillis: 5000 });
try {
  await client.connect();
  const result = await client.query('SELECT current_database() AS database, current_user AS user');
  console.table(result.rows);
} finally { await client.end(); }
