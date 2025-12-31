import { test, expect } from "../../fixtures/authFixture";
import { getGlobals } from "../../../utils/getGlobals";
import { signOut } from "../../../utils/auth-utils";
import { NavBar } from "../../pages/components/NavBar";

test("Student Upload POP in My Account", async ({ page, admin }, testInfo) => {
  const POPfilePath = "automation/Test_Documents/Test_Dummy_POP.pdf";
  const globals = getGlobals(testInfo)();
  const nav = new NavBar(page);

  await nav.goToUsers();
  await page.getByPlaceholder("Search").click();
  await page.getByPlaceholder("Search").fill(globals.transcriptStudent);
  await expect(
    page
      .getByRole("row", {
        name: " Actions",
      })
      .locator("span")
      .first()
  ).toBeVisible();
  await page
    .getByRole("row", {
      name: " Actions",
    })
    .getByRole("button")
    .first()
    .click();
  await page.getByRole("button", { name: "Log in with this user" }).click();
  await page.waitForLoadState("networkidle");
  await expect(
    page.locator("abp-back-to-impersonator-nav-item a")
  ).toBeVisible();
  await nav.goToMyAccount();
  await page.locator("li").filter({ hasText: "Proof Of Payments" }).click();
  for (let i = 0; i < 1; i++) {
    await page.getByRole("button", { name: " Upload Document" }).click();

    const [fileChooser] = await Promise.all([
      page.waitForEvent("filechooser"),
      await page.getByText("Select File").click(),
    ]);
    await fileChooser.setFiles(POPfilePath);

    await page.getByRole("combobox").click();
    await page.getByText("Proof of Payment", { exact: true }).click();
    await page.getByRole("button", { name: "Submit" }).click();
    await page.waitForTimeout(1000);
  }
  await signOut(page);
});
