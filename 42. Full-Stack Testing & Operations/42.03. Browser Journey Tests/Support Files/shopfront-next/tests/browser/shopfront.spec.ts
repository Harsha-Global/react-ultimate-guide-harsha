import { test, expect, type Page } from '@playwright/test';
async function signIn(page: Page) {
  await page.goto('/workshop/account');
  await page.getByLabel('Email', { exact: true }).fill('alex@example.test');
  await page.getByLabel('Password', { exact: true }).fill('Course-only-passphrase-40!');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Hello, Alex Morgan' })).toBeVisible();
}
// LIVE: add the three browser journeys below.
