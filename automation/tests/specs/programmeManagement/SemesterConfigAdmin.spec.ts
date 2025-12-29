import { signOut } from "../../../utils/auth-utils";
import { test, expect } from "../../fixtures/authFixture";
import { NavBar } from "../../pages/components/NavBar";

test("Semester Config", async ({ page, admin }, testInfo) => {
  const nav = new NavBar(page);

  await nav.goToSemesterConfig();
  await expect(
    page.getByRole("heading", { name: "Semester Config" })
  ).toBeVisible();
  await expect(
    page.locator("li").filter({ hasText: "Academic Period" })
  ).toBeVisible();
  await expect(page.getByPlaceholder("Search")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Advanced filters" })
  ).toBeVisible();
  await page.getByRole("button", { name: "New Academic Period" }).click();
  await expect(page.locator("#abp-modal-body")).toContainText(
    "New Academic PeriodAcademic Period Details Name  * Academic term Select Start Date * End Date *Registration Details Registration Start Date * Registration End Date *Academic Progress Details Qualification Completed Date WIL Modules WIL Practical Window Start Date  WIL Practical Window End Date  WIL Placement Submission Open Date  WIL Placement Submission Due Date  WIL Placement Submission Close Date CancelCreate"
  );
  await page.getByRole("button", { name: "Cancel" }).click();
  await page.getByText("Application Intake").click();
  await expect(
    page.getByRole("heading", { name: "Application Intake" })
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Previous Intake Periods" })
  ).toBeVisible();
  await page.getByText("Academic Calendar").click();
  await expect(
    page.getByRole("button", { name: "Add Academic Calendar" })
  ).toBeVisible();
  await page.getByRole("button", { name: "Add Academic Calendar" }).click();
  await expect(
    page.getByRole("heading", { name: "Add a New Academic Calendar" })
  ).toBeVisible();
  await page.getByRole("button", { name: "Cancel" }).click();
  await expect(
    page.getByRole("heading", { name: "Semester Config" })
  ).toBeVisible();
  await signOut(page);
});
