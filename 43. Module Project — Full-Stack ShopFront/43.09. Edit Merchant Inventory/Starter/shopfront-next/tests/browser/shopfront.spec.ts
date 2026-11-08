import { test, expect, type Page } from '@playwright/test';
async function signIn(page: Page) {
  await page.goto('/workshop/account');
  await page.getByLabel('Email', { exact: true }).fill('alex@example.test');
  await page.getByLabel('Password', { exact: true }).fill('Course-only-passphrase-40!');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Hello, Alex Morgan' })).toBeVisible();
}
test('protected order, browser checkout handoff and logout', async ({ page }) => {
  await page.goto('/workshop/orders/O-BROWSER-1001');
  await expect(page).toHaveURL(/\/workshop\/account/);
  await signIn(page);
  await page.goto('/workshop/orders/O-BROWSER-1001');
  await expect(page.getByRole('heading', { name: 'O-BROWSER-1001', exact: true })).toBeVisible();
  // This controlled boundary checks navigation, not Stripe or payment verification.
  await page.route('**/api/workshop/orders/O-BROWSER-1001/checkout', route => route.fulfill({ json: { url: '/workshop/orders/O-BROWSER-1001?checkout=returned' } }));
  await page.getByRole('button', { name: 'Open Stripe test checkout' }).click();
  await expect(page).toHaveURL(/checkout=returned/);
  await expect(page.getByRole('status').filter({ hasText: /^Order status: pending$/ })).toBeVisible();
  await page.goto('/workshop/account');await page.getByRole('button', { name: 'Sign out', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Sign in', exact: true })).toBeVisible();
  await page.goto('/workshop/orders/O-BROWSER-1001');await expect(page).toHaveURL(/\/workshop\/account/);
});
test('failed note save retains input and succeeds on retry', async ({ page }) => {
  await signIn(page);await page.goto('/workshop/orders/O-BROWSER-1001');
  await page.getByRole('textbox', { name: 'Order note' }).fill('Leave at reception.');
  const mutation='**/api/workshop/orders/O-BROWSER-1001';
  await page.route(mutation, route => route.abort());
  await page.getByRole('button', { name: 'Save note' }).click();
  await expect(page.getByText('The service is unavailable. Your note was not confirmed.')).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Order note' })).toHaveValue('Leave at reception.');
  await page.unroute(mutation);await page.getByRole('button', { name: 'Save note' }).click();
  await expect(page.getByText('Note saved.', { exact: true })).toBeVisible();
  await page.reload();await expect(page.getByRole('textbox', { name: 'Order note' })).toHaveValue('Leave at reception.');
});
test('public catalog navigation survives a direct reload', async ({ page }) => {
  await page.goto('/catalog');
  await page.getByRole('link', { name: /Studio Desk Lamp/ }).first().click();
  await expect(page).toHaveURL(/products\/studio-desk-lamp/);
  await page.reload();await expect(page.getByRole('heading', { name: 'Studio Desk Lamp', exact: true })).toBeVisible();
});
