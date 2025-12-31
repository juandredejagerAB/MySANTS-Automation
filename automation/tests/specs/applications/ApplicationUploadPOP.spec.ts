import { test, expect } from "@playwright/test";
import { generateRandomStudentInfo } from "../../../utils/studentDataGenerator";
import { ApplyPage } from "../../pages/portal/ApplyPage";
import { getGlobals } from "../../../utils/getGlobals";

test("Apply New Student", async ({ page }, testInfo) => {
  const apply = new ApplyPage(page);
  const { idNumber, firstName, surname, email } = generateRandomStudentInfo();
  const globals = getGlobals(testInfo)();

  console.log({ idNumber, firstName, surname, email });

  await apply.goToApplyPage();
  await apply.verifyInitialPage();
  await apply.startApplication(email, idNumber);

  // Step 1: Personal Information
  await apply.verifyStep("1", "Personal Information");
  await apply.fillPersonalInformation({
    firstName,
    preferredName: "Preferred",
    lastName: surname,
    address: "1234 Test Ave",
    province: globals.provinceOption,
    suburb: "JHB",
    streetNumber: "1234",
    postalCode: "2001",
    contactNumber: "0821111111",
  });
  await apply.continuetonextStep();

  // Step 2: Programme Selection
  await apply.verifyStep("2", "Select a Programme");
  await apply.selectProgramme();

  await expect(page.locator("#programme-selected-main")).toContainText(
    "Programme selected:"
  );
  await expect(page.locator("#top")).toContainText(
    "Diploma in Grade R Teaching"
  );

  await apply.fillProgrammeDetails();

  // Upload employment verification document
  const EmpfilePath = "automation\\Test_Documents\\Test_Dummy.pdf";
  page.on("filechooser", async (filechooser) => {
    await filechooser.setFiles([EmpfilePath]);
  });
  await page.getByText("Select File").click();
  await apply.continuetonextStep();

  await apply.verifyStep("3", "Upload Documents");
  await expect(page.locator("abp-page")).toContainText(
    "Upload Documents All documents must: Be clear and easy to readBe less than 5Mb in sizeBe certified by a commissioner of oathsHave password protection removed"
  );

  // Upload required documents
  const filePath = "automation\\Test_Documents\\Test_Dummy.pdf";
  page.on("filechooser", async (filechooser) => {
    await filechooser.setFiles([filePath]);
  });
  await page.getByText("Select File").first().click();
  await page.getByText("Select File").nth(1).click();
  await expect(page.locator("#application")).toContainText("Test_Dummy.pdf");
  await apply.continuetonextStep();
  await page.waitForTimeout(2000);

  // Step 4: Payment
  await apply.verifyPaymentDetails(idNumber);

  // Upload proof of payment
  const POPfilePath = "automation\\Test_Documents\\Test_Dummy_POP.pdf";
  page.on("filechooser", async (filechooser) => {
    await filechooser.setFiles([POPfilePath]);
  });
  await page.getByText("Select File").click();
  await expect(page.locator("small")).toContainText("Test_Dummy_POP.pdf");

  // Submit application and verify success
  await page.getByRole("button", { name: "Save & Submit Application" }).click();
  await page.waitForTimeout(2000);
  await apply.verifySuccessfulSubmission();
});
