import { test, expect } from "../../fixtures/authFixture";
import { WILAssessorPage } from "../../pages/portal/WILAssessorPage";
import { signOut } from "../../../utils/auth-utils";
import { generateRandomStudentInfo } from "../../../utils/studentDataGenerator";
import type { CreateAssessorDialog } from "../../pages/portal/dialogs/CreateNewAssessorDialog";
import { CreateUserDialog } from "../../pages/portal/dialogs/CreateNewUserDialog";

test("Create New WIL Assessor", async ({ page, admin }, testInfo) => {
  const assessors = new WILAssessorPage(page);
  const { idNumber, firstName, surname, email } = generateRandomStudentInfo();

  console.log({ idNumber, firstName, surname, email });

  await assessors.navigate();

  await expect(page.locator("app-assessor")).toContainText(
    "AssessorsExport to ExcelNew Advanced filters  Min Rating  Max Rating  Min Travel Radius  Max Travel Radius  Type  Not Set  In-School WIL Assessor  Multi-School WIL Assessor  Status  Orientation  Active  Inactive  Removed  Resigned  Deceased  Province  City  School  Programme ClearRefreshNameLast NameEmail AddressContact NumberRatingTypeStatus"
  );

  const CreateAssessorDialog: CreateAssessorDialog =
    await assessors.createNewAssessor();
  await CreateAssessorDialog.waitForOpen();

  const createUserDialog: CreateUserDialog =
    await CreateAssessorDialog.addNewUser();
  await createUserDialog.waitForOpen();

  await createUserDialog.fillForm({
    firstName: firstName,
    lastName: surname,
    emailAddress: email,
  });

  await createUserDialog.create();

  await CreateAssessorDialog.save();

  await CreateAssessorDialog.verifyassessorcreation({
    FirstName: firstName,
    LastName: surname,
    EmailAddress: email,
  });

  await assessors.searchAssessor(email);

  await expect(page.locator("datatable-footer")).toContainText("1 total");

  await expect(page.locator("app-assessor")).toContainText(
    `AssessorsExport to ExcelNew Advanced filters  Min Rating  Max Rating  Min Travel Radius  Max Travel Radius  Type  Not Set  In-School WIL Assessor  Multi-School WIL Assessor  Status  Orientation  Active  Inactive  Removed  Resigned  Deceased  Province  City  School  Programme ClearRefreshNameLast NameEmail AddressContact NumberRatingTypeStatus ${firstName} ${surname} ${email}`
  );

  await signOut(page);
});
