import { getGlobals } from "../../../utils/getGlobals";
import { signOut } from "../../../utils/auth-utils";
import { test, expect } from "../../fixtures/authFixture";
import { NavBar } from "../../pages/components/NavBar";

test("Add and Remove Academic Record", async ({ page, admin }, testInfo) => {
  const globals = getGlobals(testInfo);
  const nav = new NavBar(page);

  await nav.goToStudents();
  await page.getByPlaceholder("Search").click();
  await page.getByPlaceholder("Search").fill(globals.academicRecordStudent);

  await page.getByText(globals.academicRecordStudent).click();
  await expect(
    page.getByRole("listitem").filter({ hasText: /^Programme$/ })
  ).toBeVisible();

  await page
    .getByRole("listitem")
    .filter({ hasText: /^Programme$/ })
    .locator("small")
    .click();
  await expect(page.getByText("No Academic TranscriptThere")).toBeVisible();

  await page.locator("#top").getByText("Enrolments").click();
  await page.getByRole("button", { name: "Add Modules" }).click();
  await expect(page.locator("#abp-modal-body")).toContainText(
    `Add ModulesPlease select the Modules you would like to add for the ${globals.academicRecordPeriod} Academic PeriodCode Module R-LSK 120Introduction to Life Skills in Grade RCancelSubmit`
  );
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByRole("cell", { name: "R-LSK" })).toBeVisible();
  await page.getByText("Programme", { exact: true }).click();
  await page.getByRole("button", { name: " New Academic Record" }).click();
  await page.locator("#module-programme-id span").first().click();
  await page.getByText("R-LSK 120: Introduction to").click();
  await expect(page.locator("app-page-alert")).toContainText(
    "Module Currently EnrolledYou are about to add an academic record for an existing enrolment in the current academic period."
  );
  const enrolmentStatus = "1: 1";
  const gradeOutcome = "1: 1";
  const finalMark = "80";
  const month = "1";
  const year = "2025";
  const day = "1";
  await page.getByLabel("Enrolment Status *").selectOption(enrolmentStatus);
  await page.getByLabel("Enrolment Date *").click();
  await page.getByLabel("Select month").selectOption(month);
  await page.getByLabel("Select year").selectOption(year);
  await page.getByLabel(`Wednesday, January ${day},`).getByText(day).click();
  await page.locator("#academic-period-id").getByRole("textbox").click();
  await page.getByText(globals.academicRecordPeriod).click();
  await page.getByRole("spinbutton", { name: "Final Mark *" }).fill(finalMark);
  await page.getByLabel("Grade Outcome *").selectOption(gradeOutcome);
  await page.getByLabel("Mark Released Date *").click();
  await page.getByLabel("Select month").selectOption(month);
  await page.getByLabel("Select year").selectOption(year);
  await page.getByLabel(`Wednesday, January ${day},`).getByText(day).click();
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByRole("cell", { name: "R-LSK" })).toBeVisible();
  await page.getByRole("button", { name: "Actions" }).click();
  await page.getByRole("button", { name: "Delete" }).click();
  await expect(page.locator("abp-confirmation")).toContainText(
    "You're about to remove an academic record from the student's profile. Are you sure you want to proceed?"
  );
  await page.getByRole("button", { name: "Yes" }).click();
  await expect(page.getByText("No Academic TranscriptThere")).toBeVisible();
  await page.locator("#top").getByText("Enrolments").click();
  await page.getByRole("button", { name: "Add Modules" }).click();
  await expect(page.locator("#abp-modal-body")).toContainText(
    `Add ModulesPlease select the Modules you would like to add for the ${globals.academicRecordPeriod} Academic PeriodCode Module R-LSK 120Introduction to Life Skills in Grade RCancelSubmit`
  );
  await page.getByRole("button", { name: "Cancel" }).click();
  await signOut(page);
});
