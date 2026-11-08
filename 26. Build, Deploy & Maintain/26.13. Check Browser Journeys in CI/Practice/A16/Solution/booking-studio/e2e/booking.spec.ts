import { expect, test } from "@playwright/test";
test("a visitor books and reloads the saved confirmation", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("textbox", { name: "Contact name" }).fill("Alex Morgan");
  await page.getByRole("textbox", { name: "Email address" }).fill("alex@example.com");
  await page.getByRole("button", { name: "Book this visit" }).click();
  await expect(page.getByRole("heading", { name: "Your booking is confirmed." })).toBeVisible();
  const confirmationLink = page.getByRole("link", { name: "Open this confirmation" });
  const href = await confirmationLink.getAttribute("href");
  expect(href).toMatch(/^\?booking=[0-9a-f-]+$/);
  await confirmationLink.click();
  await expect(page.getByRole("heading", { name: "Your booking confirmation" })).toBeVisible();
  await expect(page.getByText(/1 place · morning session/)).toBeVisible();
  await page.reload();
  await expect(page.getByText(/1 place · morning session/)).toBeVisible();
});