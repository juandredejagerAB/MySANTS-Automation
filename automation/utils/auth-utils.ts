import { Page, expect } from "@playwright/test";

export async function signOut(page: Page) {
  await page.locator("div:nth-child(3)").first().click();
  await page
    .getByRole("listitem")
    .filter({ hasText: "Log out" })
    .locator("a")
    .click();
  await expect(page.getByRole("button", { name: "Sign in" })).toBeVisible();
}
