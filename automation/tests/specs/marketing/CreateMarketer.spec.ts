import { test, expect } from "../../fixtures/authFixture";
import { MarketerPage } from "../../pages/portal/MarketerPage";
import { signOut } from "../../../utils/auth-utils";
import { generateRandomStudentInfo } from "../../../utils/studentDataGenerator";
import type { CreateMarketerDialog } from "../../pages/portal/dialogs/CreateNewMarketerDialog";
import { CreateUserDialog } from "../../pages/portal/dialogs/CreateNewUserDialog";

test("Create New Marketer", async ({ page, admin }, testInfo) => {
  const marketers = new MarketerPage(page);
  const { idNumber, firstName, surname, email } = generateRandomStudentInfo();

  console.log({ idNumber, firstName, surname, email });

  await marketers.goToViaMenu();

  await expect(page.locator("abp-advanced-entity-filters")).toContainText(
    "Advanced filters Name Last Name Email Address Referrer Code ClearRefresh"
  );

  await expect(page.locator("#lpx-wrapper")).toContainText(
    "MarketersExport to ExcelNew Marketer Advanced filters  Name  Last Name  Email Address  Referrer Code ClearRefreshNameLast NameEmail AddressReferrer Code"
  );

  const createMarketerDialog: CreateMarketerDialog =
    await marketers.createNewMarketerButtonClick();
  await createMarketerDialog.waitForOpen();

  const createUserDialog: CreateUserDialog =
    await createMarketerDialog.addNewUser();
  await createUserDialog.waitForOpen();

  await createUserDialog.fillForm({
    firstName: firstName,
    lastName: surname,
    emailAddress: email,
  });

  await createUserDialog.create();

  await createMarketerDialog.save();

  await marketers.searchMarketer(email);

  await expect(page.locator("datatable-footer")).toContainText("1 total");

  await expect(page.locator("#lpx-wrapper")).toContainText(
    `MarketersExport to ExcelNew Marketer Advanced filters  Name  Last Name  Email Address  Referrer Code ClearRefreshNameLast NameEmail AddressReferrer Code ${firstName} ${surname} ${email}`
  );

  await signOut(page);
});
