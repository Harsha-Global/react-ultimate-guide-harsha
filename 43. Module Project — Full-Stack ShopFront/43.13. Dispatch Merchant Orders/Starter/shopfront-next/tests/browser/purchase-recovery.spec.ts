import 'dotenv/config';
import { test, expect, type Page } from '@playwright/test';
import pg from 'pg';
const url = new URL(process.env.TEST_DATABASE_URL ?? '');
if (!['localhost','127.0.0.1'].includes(url.hostname) || url.pathname !== '/shopfront_test') throw new Error('Use the isolated local shopfront_test database.');
const origin = 'http://127.0.0.1:3240';
const productPath = '/products/studio-desk-lamp';
const ordersPath = '/api/workshop/orders';
async function signIn(page: Page, email = 'alex@example.test', name = 'Alex Morgan') {
  await page.goto('/account');
  await page.getByLabel('Email', { exact: true }).filter({ visible: true }).fill(email);
  await page.getByLabel('Password', { exact: true }).filter({ visible: true }).fill('Course-only-passphrase-40!');
  for (let attempt = 0; attempt < 4; attempt++) {
    const pending = page.waitForResponse(response => response.url().endsWith('/api/auth/sign-in/email') && response.request().method() === 'POST');
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
    const response = await pending;
    if (response.status() !== 429) { expect(response.status()).toBe(200); break; }
    await page.waitForTimeout((Number(response.headers()['retry-after']) || 10) * 1000 + 1000);
  }
  await expect(page.getByRole('heading', { name: `Hello, ${name}`, exact: true })).toBeVisible();
}
async function signOut(page: Page) {
  await page.goto('/account');
  await page.getByRole('button', { name: 'Sign out', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Sign in', exact: true })).toBeVisible();
}
const purchase = (page: Page) => page.locator('form.sf-purchase:visible');
const quantity = (page: Page) => purchase(page).getByRole('spinbutton', { name: 'Quantity', exact: true });
function watchPurchases(page: Page) {
  const requests: unknown[] = [];
  page.on('request', request => { if (new URL(request.url()).pathname === ordersPath && request.method() === 'POST') requests.push(request.postDataJSON()); });
  return requests;
}

test('a committed response can be lost, restored and retried once even at zero stock', async ({ page }) => {
  test.setTimeout(process.env.PWDEBUG ? 0 : 120000);
  const database = new pg.Client({ connectionString: url.href }); await database.connect();
  const original = (await database.query('SELECT stock FROM "Product" WHERE id=$1', ['P-101'])).rows[0].stock;
  let committedId: string | undefined;
  let committedKey: string | undefined;
  let firstPayload: unknown;
  try {
    await signIn(page);
    const stockRoute = '/api/merchant/W-1/products/P-101';
    const prepared = await page.request.patch(stockRoute, { headers: { origin }, data: { expectedStock: original, stock: 1 } });
    expect(prepared.status()).toBe(200);
    await page.goto(productPath);
    await expect(purchase(page).getByRole('button', { name: 'Reserve & review order', exact: true })).toBeEnabled();
    // A definitive rejection releases the draft and retry reference.
    await quantity(page).fill('2');
    const rejected = page.waitForResponse(response => new URL(response.url()).pathname === ordersPath && response.request().method() === 'POST');
    await purchase(page).getByRole('button', { name: 'Reserve & review order', exact: true }).click();
    expect((await rejected).status()).toBe(409);
    await expect(purchase(page).getByRole('status')).toHaveText('There is not enough stock.');
    await expect(quantity(page)).toBeEnabled();
    expect(await page.evaluate(() => Object.keys(sessionStorage).filter(key => key.startsWith('shopfront-attempt:')))).toEqual([]);
    await quantity(page).fill('1');
    await page.route('**/api/workshop/orders', async route => {
      firstPayload = route.request().postDataJSON();
      const result = await route.fetch(); // Real local transaction commits before its browser response is lost.
      expect(result.status()).toBe(201);
      committedId = (await result.json()).id;
      committedKey = (firstPayload as { requestKey: string }).requestKey;
      await route.abort('failed');
    }, { times: 1 });
    await purchase(page).getByRole('button', { name: 'Reserve & review order', exact: true }).click();
    await expect(purchase(page).getByRole('status')).toHaveText('The result is uncertain. Retry this same attempt, or check Your orders.');
    await expect(quantity(page)).toBeDisabled();
    expect(committedId).toBeTruthy();
    expect((await database.query('SELECT stock FROM "Product" WHERE id=$1', ['P-101'])).rows[0].stock).toBe(0);
    await page.reload();
    await expect(page.getByText('Currently unavailable. Please check again later.', { exact: true }).filter({ visible: true })).toBeVisible();
    await expect(purchase(page).getByRole('button', { name: 'Retry this order attempt', exact: true })).toBeEnabled();
    await expect(quantity(page)).toHaveValue('1');
    // Another product and another user must not inherit Alex's lamp attempt.
    await page.goto('/products/terracotta-travel-mug');
    await expect(purchase(page).getByRole('button', { name: 'Reserve & review order', exact: true })).toBeEnabled();
    await signOut(page); await signIn(page, 'bob@example.test', 'Bob Lee');
    await page.goto(productPath);
    await expect(purchase(page).getByRole('button', { name: 'Reserve & review order', exact: true })).toBeDisabled();
    await expect(purchase(page).getByRole('button', { name: 'Retry this order attempt', exact: true })).toHaveCount(0);
    await signOut(page); await signIn(page);
    await page.goto(productPath);
    await expect(purchase(page).getByRole('button', { name: 'Retry this order attempt', exact: true })).toBeEnabled();
    const retry = page.waitForResponse(response => new URL(response.url()).pathname === ordersPath && response.request().method() === 'POST');
    await purchase(page).getByRole('button', { name: 'Retry this order attempt', exact: true }).click();
    const result = await retry;
    expect(result.status()).toBe(201);
    expect(result.request().postDataJSON()).toEqual(firstPayload);
    expect((await result.json()).id).toBe(committedId);
    await expect(page).toHaveURL(new RegExp(`/orders/${committedId}$`));
    await expect(page.getByRole('heading', { name: `Order ${committedId}`, exact: true })).toBeVisible();
    expect((await database.query('SELECT count(*)::int AS count FROM "Order" WHERE "requestKey"=$1', [committedKey])).rows[0].count).toBe(1);
    expect((await database.query('SELECT stock FROM "Product" WHERE id=$1', ['P-101'])).rows[0].stock).toBe(0);
    expect(await page.evaluate(() => Object.keys(sessionStorage).filter(key => key.startsWith('shopfront-attempt:')))).toEqual([]);
  } finally {
    if (committedId) await database.query('DELETE FROM "Order" WHERE id=$1', [committedId]);
    // Direct fixture restoration is followed by an authenticated same-value PATCH to expire the public snapshot.
    await database.query('UPDATE "Product" SET stock=$1 WHERE id=$2', [original, 'P-101']);
    await page.request.patch('/api/merchant/W-1/products/P-101', { headers: { origin }, data: { expectedStock: original, stock: original } }).catch(() => undefined);
    await database.end();
  }
});

for (const operation of ['getItem', 'setItem'] as const) {
  test(`denied session storage ${operation} sends no purchase`, async ({ page }) => {
    test.setTimeout(process.env.PWDEBUG ? 0 : 60000);
    const sent = watchPurchases(page);
    await page.addInitScript(operation => {
      const original = Storage.prototype[operation];
      if (operation === 'getItem') {
        Storage.prototype.getItem = function(key) {
          if (key.startsWith('shopfront-attempt:')) throw new DOMException('Controlled storage denial', 'SecurityError');
          return (original as typeof Storage.prototype.getItem).call(this, key);
        };
      } else {
        Storage.prototype.setItem = function(key, value) {
          if (key.startsWith('shopfront-attempt:')) throw new DOMException('Controlled storage denial', 'SecurityError');
          return (original as typeof Storage.prototype.setItem).call(this, key, value);
        };
      }
    }, operation);
    await signIn(page); await page.goto(productPath);
    const button = purchase(page).getByRole('button', { name: 'Reserve & review order', exact: true });
    if (operation === 'getItem') {
      await expect(purchase(page).getByRole('status')).toHaveText('This tab cannot restore its order attempt. Check Your orders before using another tab.');
      await expect(button).toBeDisabled();
    } else {
      await expect(button).toBeEnabled(); await button.click();
      await expect(purchase(page).getByRole('status')).toHaveText('This browser cannot save the retry reference. Enable session storage before ordering.');
      await expect(button).toBeEnabled();
    }
    expect(sent).toEqual([]);
    // Playwright disposes this browser context, restoring normal storage for the next check.
  });
}
