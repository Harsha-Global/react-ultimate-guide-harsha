import 'dotenv/config';
import assert from 'node:assert/strict';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { chromium, expect } from '@playwright/test';
import pg from 'pg';

// Controlled local course fixtures only. This helper never starts or rebuilds Next.
function privateUrl(name) {
  try { return new URL(process.env[name] ?? ''); }
  catch { throw new Error(`${name} must be a valid URL; its private value is omitted.`); }
}
const origin = privateUrl('SITE_URL');
const databaseUrl = privateUrl('DATABASE_URL');
assert.equal(process.env.DEPLOYMENT_KIND, 'local', 'Use the disposable local release.');
assert(['localhost', '127.0.0.1'].includes(origin.hostname) && origin.protocol === 'http:');
assert.equal(origin.href, origin.origin + '/', 'SITE_URL must be an origin.');
assert.equal(privateUrl('BETTER_AUTH_URL').origin, origin.origin);
assert(['localhost', '127.0.0.1'].includes(databaseUrl.hostname) && databaseUrl.pathname === '/shopfront_dev', 'Use the local disposable shopfront_dev database.');
assert(['postgres:', 'postgresql:'].includes(databaseUrl.protocol));
assert(process.argv.slice(2).every(value => value === '--headed'), 'Only --headed is supported.');
const buildId = (await readFile('.next/BUILD_ID', 'utf8')).trim();
const headed = process.argv.includes('--headed');
const output = `test-results/local-release/${new Date().toISOString().replace(/[:.]/g, '-')}`;
await mkdir(output, { recursive: true });
const database = new pg.Client({ connectionString: databaseUrl.href });
await database.connect();
const browser = await chromium.launch({ headless: !headed });
const context = await browser.newContext({ baseURL: origin.origin, viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
page.setDefaultTimeout(30000);
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const fixtureId = `O-RELEASE-${randomUUID()}`;
let originalStock, stockPrepared = false, requestKey, committedId, firstPayload, cookie, failure;
const purchase = () => page.locator('form.sf-purchase:visible');
const fixtureCard = () => page.locator('article:visible').filter({ has: page.getByRole('heading', { name: fixtureId, exact: true }) });
const report = { buildId, origin: origin.origin, runtime: process.version, browser: await browser.version(), headed, provider: 'Controlled local data only; no Stripe, courier or hosted-service call.', checks: {} };
async function hold(message) {
  console.log(message);
  if (headed) await page.pause(); // Use Inspector Resume after showing this checkpoint.
}
async function signIn(email, name) {
  await page.goto('/account');
  await page.getByLabel('Email', { exact: true }).filter({ visible: true }).fill(email);
  await page.getByLabel('Password', { exact: true }).filter({ visible: true }).fill('Course-only-passphrase-40!');
  for (let attempt = 0; attempt < 4; attempt++) {
    const pending = page.waitForResponse(response => response.url().endsWith('/api/auth/sign-in/email') && response.request().method() === 'POST');
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
    const response = await pending;
    if (response.status() !== 429) { assert.equal(response.status(), 200); break; }
    await page.waitForTimeout((Number(response.headers()['retry-after']) || 10) * 1000 + 1000);
  }
  await expect(page.getByRole('heading', { name: `Hello, ${name}`, exact: true })).toBeVisible();
}
async function signOut() {
  await page.goto('/account');
  await page.getByRole('button', { name: 'Sign out', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Sign in', exact: true })).toBeVisible();
}
async function stockPatch(expectedStock, stock) {
  return fetch(new URL('/api/merchant/W-1/products/P-101', origin), { method: 'PATCH', headers: { cookie, origin: origin.origin, 'content-type': 'application/json' }, body: JSON.stringify({ expectedStock, stock }), signal: AbortSignal.timeout(15000) });
}
try {
  const health = await page.request.get('/api/workshop/health');
  assert.equal(health.status(), 200); assert.equal((await health.json()).database, 'ready');
  const fixtures = (await database.query('SELECT c.id,u.email FROM "Customer" c JOIN "user" u ON u.id=c."userId" WHERE c.id IN (\'C-1\',\'C-2\') ORDER BY c.id')).rows;
  assert.deepEqual(fixtures, [{ id: 'C-1', email: 'alex@example.test' }, { id: 'C-2', email: 'bob@example.test' }]);
  // No background event is created by this helper's synthetic fulfillment fixture.
  await page.goto('/catalog');
  await expect(page.locator('.grid > article.card:visible')).toHaveCount(4);
  for (const image of await page.locator('.grid img:visible').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate(element => element.complete && element.naturalWidth > 0)).toBe(true);
  }
  await page.evaluate(() => document.fonts.ready);
  assert(await page.evaluate(() => [document.body, document.querySelector('h1')].every(element => {
    const family = getComputedStyle(element).fontFamily.split(',')[0].trim().replace(/^['"]|['"]$/g, '');
    return [...document.fonts].some(font => font.family.replace(/^['"]|['"]$/g, '') === family && font.status === 'loaded');
  })));
  await page.goto('/products/studio-desk-lamp'); await page.reload();
  await expect(page.getByRole('heading', { name: 'Studio Desk Lamp', exact: true })).toBeVisible();
  report.checks.catalogImagesFontsAndDirectProduct = true;
  await signIn('alex@example.test', 'Alex Morgan');
  await page.goto('/orders/O-1001');
  await expect(page.getByText('Total $145.00', { exact: true }).filter({ visible: true })).toBeVisible();
  await signOut(); await signIn('bob@example.test', 'Bob Lee');
  await page.goto('/orders/O-1001');
  await expect(page.getByText('Order not found.', { exact: true }).filter({ visible: true })).toBeVisible();
  assert.equal((await page.request.get('/api/workshop/orders/O-1001')).status(), 404);
  report.checks.sameBuildAccountSwitchAndDirectDenial = true;
  await signOut(); await signIn('alex@example.test', 'Alex Morgan');
  cookie = (await context.cookies(origin.origin)).map(value => `${value.name}=${value.value}`).join('; ');
  // Confirm that this running release uses the configured database before changing stock.
  await database.query('BEGIN');
  try {
    await database.query('INSERT INTO "Order"(id,"customerId",status,note) VALUES($1,\'C-1\',\'pending\',\'Explicit local release dispatch fixture\')', [fixtureId]);
    await database.query('INSERT INTO "OrderItem"("orderId","productId",quantity,"unitPriceMinor") VALUES($1,\'P-101\',1,8900),($1,\'P-103\',2,2800)', [fixtureId]);
    await database.query('COMMIT');
  } catch (error) { await database.query('ROLLBACK'); throw error; }
  const boundOrder = await page.request.get(`/api/workshop/orders/${fixtureId}`);
  assert.equal(boundOrder.status(), 200, 'The running app must use this configured local database.');
  assert.equal((await boundOrder.json()).id, fixtureId);
  report.checks.runningReleaseUsesConfiguredDatabase = true;
  originalStock = (await database.query('SELECT stock FROM "Product" WHERE id=\'P-101\'')).rows[0].stock;
  assert.equal((await stockPatch(originalStock, 1)).status, 200); stockPrepared = true;
  await page.goto('/merchant/W-1?status=awaiting'); await page.reload();
  const filter = page.getByRole('combobox', { name: 'Fulfillment status', exact: true });
  await expect(filter).toHaveValue('awaiting');
  const stockCard = page.locator('article:visible').filter({ has: page.getByRole('heading', { name: 'Studio Desk Lamp', exact: true }) });
  await expect(stockCard.getByLabel('Stock', { exact: true })).toHaveValue('1');
  // Submit through the form as well, keeping one available unit for the recovery case.
  await stockCard.getByLabel('Stock', { exact: true }).fill('2');
  await stockCard.getByRole('button', { name: 'Save stock', exact: true }).click();
  await expect(stockCard.getByLabel('Stock', { exact: true })).toHaveValue('2');
  await expect.poll(async () => (await database.query('SELECT stock FROM "Product" WHERE id=\'P-101\'')).rows[0].stock).toBe(2);
  assert.equal((await stockPatch(2, 1)).status, 200);
  report.checks.merchantFilterReloadAndSavedStock = true;
  await page.goto('/products/studio-desk-lamp');
  await expect(purchase().getByRole('button', { name: 'Reserve & review order', exact: true })).toBeEnabled();
  await page.route('**/api/workshop/orders', async route => {
    firstPayload = route.request().postDataJSON(); requestKey = firstPayload.requestKey;
    const result = await route.fetch(); // Actual server transaction, then only its response is lost.
    assert.equal(result.status(), 201); committedId = (await result.json()).id;
    await route.abort('failed');
  }, { times: 1 });
  await purchase().getByRole('button', { name: 'Reserve & review order', exact: true }).click();
  await expect(purchase().getByRole('status')).toHaveText('The result is uncertain. Retry this same attempt, or check Your orders.');
  assert(committedId);
  await hold('Capture checkpoint: the real order committed, but its response was lost.');
  await page.reload();
  await expect(page.getByText('Currently unavailable. Please check again later.', { exact: true }).filter({ visible: true })).toBeVisible();
  await expect(purchase().getByRole('button', { name: 'Retry this order attempt', exact: true })).toBeEnabled();
  await hold('Capture checkpoint: the same tab restores Retry even at zero remaining stock.');
  const retry = page.waitForResponse(response => new URL(response.url()).pathname === '/api/workshop/orders' && response.request().method() === 'POST');
  await purchase().getByRole('button', { name: 'Retry this order attempt', exact: true }).click();
  const result = await retry; assert.equal(result.status(), 201);
  assert.deepEqual(result.request().postDataJSON(), firstPayload); assert.equal((await result.json()).id, committedId);
  await expect(page.getByRole('heading', { name: `Order ${committedId}`, exact: true })).toBeVisible();
  assert.equal((await database.query('SELECT count(*)::int n FROM "Order" WHERE "customerId"=\'C-1\' AND "requestKey"=$1', [requestKey])).rows[0].n, 1);
  assert.equal((await database.query('SELECT stock FROM "Product" WHERE id=\'P-101\'')).rows[0].stock, 0);
  report.checks.committedResponseLossSameTabSamePayloadSameOrderOneReservation = true;
  report.orderId = committedId;
  for (const width of [360,390]) {
    await page.setViewportSize({ width, height: 844 });
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.screenshot({ path: `${output}/order-${width}.png`, fullPage: true });
  }
  await hold('Capture checkpoint: one original order, including its generated identifier on a narrow screen.');
  // A separate named fixture tests dispatch, not a provider payment or stock reservation.
  await database.query('BEGIN');
  try {
    await database.query('UPDATE "Order" SET status=\'paid\' WHERE id=$1', [fixtureId]);
    await database.query('INSERT INTO "Fulfillment"("orderId","workspaceId",status) VALUES($1,\'W-1\',\'ready\'),($1,\'W-2\',\'ready\')', [fixtureId]);
    await database.query('COMMIT');
  } catch (error) { await database.query('ROLLBACK'); throw error; }
  await page.goto('/merchant/W-1?status=ready');
  await expect(fixtureCard().getByRole('button', { name: 'Mark dispatched', exact: true })).toBeVisible();
  await fixtureCard().getByRole('button', { name: 'Mark dispatched', exact: true }).click();
  await expect(fixtureCard()).toHaveCount(0);
  await filter.selectOption('dispatched'); await page.getByRole('button', { name: 'Apply filter', exact: true }).click();
  await expect(fixtureCard().getByText('dispatched', { exact: true })).toBeVisible();
  assert.equal((await database.query('SELECT status FROM "Fulfillment" WHERE "orderId"=$1 AND "workspaceId"=\'W-2\'', [fixtureId])).rows[0].status, 'ready');
  await filter.focus(); await page.keyboard.press('Tab');
  assert(await page.getByRole('button', { name: 'Apply filter', exact: true }).evaluate(element => element === document.activeElement));
  await page.keyboard.press('Tab');
  assert(await page.getByRole('link', { name: 'Clear', exact: true }).evaluate(element => element === document.activeElement));
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await page.screenshot({ path: `${output}/merchant-390.png`, fullPage: true });
  await hold('Capture checkpoint: this merchant’s ready row moved to Dispatched; the other merchant remains ready.');
  report.checks.dispatchFilterRefreshOtherWorkspacePreservedAndKeyboard = true;
  report.checks.narrowGeneratedOrderAndMerchantScreens = true;
  assert.deepEqual(errors, []);
  assert.equal((await readFile('.next/BUILD_ID', 'utf8')).trim(), buildId, 'The build changed during this check.');
} catch (error) { failure = error; }
finally {
  try {
    await database.query('BEGIN');
    // Refuse to silently overwrite a stock value changed by another concurrent user.
    const ownOrder = requestKey ? (await database.query('SELECT id,status FROM "Order" WHERE "customerId"=\'C-1\' AND "requestKey"=$1', [requestKey])).rows[0] : undefined;
    if (stockPrepared) {
      if (ownOrder) assert.equal(ownOrder.status, 'pending', 'Inspect the changed order before cleanup.');
      const restored = await database.query('UPDATE "Product" SET stock=$1 WHERE id=\'P-101\' AND stock=$2', [originalStock, ownOrder ? 0 : 1]);
      assert.equal(restored.rowCount, 1, 'Stock changed concurrently; preserve it and inspect this run’s fixtures.');
    }
    if (ownOrder) await database.query('DELETE FROM "Order" WHERE id=$1', [ownOrder.id]);
    await database.query('DELETE FROM "Order" WHERE id=$1', [fixtureId]);
    await database.query('COMMIT');
    if (stockPrepared) assert.equal((await stockPatch(originalStock, originalStock)).status, 200, 'Restore the public catalog snapshot after fixture cleanup.');
    report.cleanup = { originalStockRestored: originalStock, onlyOwnOrdersRemoved: true, catalogSnapshotExpired: stockPrepared };
  } catch (error) {
    await database.query('ROLLBACK').catch(() => undefined); failure ??= error;
    console.error('Inspect only these local test identities if cleanup needs attention:', { requestKey, committedId, fixtureId });
  }
  await database.end(); await browser.close();
}
if (failure) throw failure;
report.passed = true;
await writeFile(`${output}/result.json`, JSON.stringify(report, null, 2) + '\n');
console.log('PASS: the same running local production build completed all release browser checks.');
console.log(`Evidence: ${output}/result.json`);
