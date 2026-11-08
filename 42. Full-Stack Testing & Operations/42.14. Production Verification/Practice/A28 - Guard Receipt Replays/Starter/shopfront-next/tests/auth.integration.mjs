import { withAuthRetry } from './test-auth.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import pg from 'pg';
const base = process.env.BETTER_AUTH_URL;
const url = new URL(process.env.DATABASE_URL ?? '');
if (base !== 'http://127.0.0.1:3140' || !['localhost','127.0.0.1'].includes(url.hostname) || url.pathname !== '/shopfront_test') throw new Error('Run npm run test:auth; never target the authoring or hosted database.');
async function request(path, cookie = '', method = 'GET', body, origin = base) {
  return fetch(`${base}${path}`, { method, redirect: 'manual', headers: { cookie, origin, 'Content-Type': 'application/json' }, body: body === undefined ? undefined : JSON.stringify(body) });
}
async function signIn(email) {
  const response = await withAuthRetry(() => request('/api/auth/sign-in/email', '', 'POST', { email, password: 'Course-only-passphrase-40!' }));
  assert.equal(response.status, 200, `Sign-in should succeed for ${email}`);
  const cookie = response.headers.getSetCookie().map(value => value.split(';')[0]).join('; ');
  assert.ok(cookie.includes('session_token')); return cookie;
}
test('sessions, ownership, workspace boundaries and direct requests', async () => {
  const alex = await signIn('alex@example.test');
  const bob = await signIn('bob@example.test');
  assert.equal((await request('/api/workshop/orders/O-1001')).status, 401);
  assert.equal((await request('/api/workshop/orders/O-1001', alex)).status, 200);
  assert.equal((await request('/api/workshop/orders/O-1001', bob)).status, 404);
  assert.equal((await request('/api/workshop/orders/O-1001', bob, 'PATCH', { note: 'Intrusion' })).status, 404);
  assert.equal((await request('/api/workshop/orders/O-1001', alex, 'PATCH', { note: 'Leave with reception.' })).status, 200);
  assert.equal((await (await request('/api/workshop/orders/O-1001', alex)).json()).note, 'Leave with reception.');
  assert.equal((await request('/api/workshop/orders/O-1001', alex, 'PATCH', { note: 'Wrong origin' }, 'https://untrusted.example')).status, 403);
  assert.equal((await request('/api/workshop/workspaces/W-1', alex)).status, 200);
  assert.equal((await request('/api/workshop/workspaces/W-2', alex)).status, 404);
  assert.equal((await request('/api/workshop/workspaces/W-1/notes/N-2', alex, 'PATCH', { body: 'Wrong workspace' })).status, 404);
  const viewerDatabase = new pg.Client({ connectionString: url.toString() }); await viewerDatabase.connect();
  try {
    const owner = (await viewerDatabase.query('SELECT id FROM "user" WHERE email=$1', ['alex@example.test'])).rows[0];
    const role = (await viewerDatabase.query('SELECT role FROM "Membership" WHERE "workspaceId"=$1 AND "userId"=$2', ['W-1', owner.id])).rows[0].role;
    try {
      await viewerDatabase.query('UPDATE "Membership" SET role=$1 WHERE "workspaceId"=$2 AND "userId"=$3', ['viewer','W-1',owner.id]);
      assert.equal((await request('/api/workshop/workspaces/W-1', alex)).status, 200);
      assert.equal((await request('/api/workshop/workspaces/W-1/notes/N-1', alex, 'PATCH', { body: 'Viewer cannot edit' })).status, 404);
    } finally {
      await viewerDatabase.query('UPDATE "Membership" SET role=$1 WHERE "workspaceId"=$2 AND "userId"=$3', [role,'W-1',owner.id]);
    }
  } finally { await viewerDatabase.end(); }
  const noCookie = await request('/workshop/orders/O-1001');
  assert.equal(noCookie.status, 307); assert.ok(noCookie.headers.get('location').endsWith('/workshop/account'));
  const fake = await request('/api/workshop/orders/O-1001', 'better-auth.session_token=made-up');
  assert.equal(fake.status, 401);
  const fakePage = await request('/workshop/orders/O-1001', 'better-auth.session_token=made-up');
  assert.equal(fakePage.status, 200); assert.equal(fakePage.headers.get('location'), null);
  assert.match(await fakePage.text(), /Please sign in/);
  assert.equal((await request('/api/auth/sign-out', bob, 'POST', {})).status, 200);
  assert.equal((await request('/api/workshop/orders/O-2001', bob)).status, 401);
  const database = new pg.Client({ connectionString: url.toString() }); await database.connect();
  try {
    await database.query('UPDATE "session" SET "expiresAt" = $1 WHERE "userId" = (SELECT id FROM "user" WHERE email = $2)', [new Date(0), 'alex@example.test']);
  } finally { await database.end(); }
  assert.equal((await request('/api/workshop/orders/O-1001', alex)).status, 401);
});
