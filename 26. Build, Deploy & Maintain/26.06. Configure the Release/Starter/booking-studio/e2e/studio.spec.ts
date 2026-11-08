import { expect, test } from "@playwright/test";
test("the studio opens with its booking controls", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Book this visit" })).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Contact name" })).toBeEditable();
});