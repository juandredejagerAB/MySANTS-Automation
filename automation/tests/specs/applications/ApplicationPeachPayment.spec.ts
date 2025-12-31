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

  await expect(page.getByText("Step 4 /")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Payment" }).nth(1)
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Amount Due:" })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Proof of Payment" })
  ).toBeVisible();
  await expect(page.locator("#application")).toContainText(
    `Banking DetailsName: SANTSBank: First National BankBranch and Code: Menlyn 252-445Account Number: 62438872261Payment Reference: ${idNumber}`
  );

  await expect(page.getByRole("heading", { name: "Pay Now" })).toBeVisible();
  await expect(page.locator("app-payment-gateway")).toContainText(
    "For instant payment, you can pay directly through our secure payment gateway using the supported method."
  );
  await expect(page.locator("app-payment-gateway")).toContainText(
    "After completing the payment, a receipt will automatically be added to your profile."
  );
  await expect(
    page.getByRole("link", { name: "Secured by Peach Payments" })
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Online Payment" })
  ).toBeVisible();
  await page.getByRole("button", { name: "Online Payment" }).click();
  await expect(page.getByTestId("checkout-cancel-button")).toBeVisible();
  await expect(page.getByTestId("checkout-header-currency")).toBeVisible();
  await expect(page.getByTestId("checkout-header-amount")).toBeVisible();
  await expect(page.getByTestId("checkout-CNP-button")).toBeVisible();
  await expect(page.getByTestId("checkout-paybybank-ui-button")).toBeVisible();
  await page.getByTestId("checkout-paybybank-ui-button").click();
  await expect(page.getByTestId("checkout-menu-paybybank-ui")).toBeVisible();
  await page.getByTestId("checkout-CAPITECPAY-button").click();
  await page.waitForTimeout(2000);
  await expect(
    page
      .frameLocator('[data-testid="checkout-iframe"]')
      .getByTestId("capitecpay-logo")
  ).toBeVisible();
  await page
    .frameLocator('[data-testid="checkout-iframe"]')
    .getByTestId("capitecpay-submit")
    .click();
  await expect(page.getByTestId("checkout-loader-text")).toBeVisible();
  await page.waitForTimeout(2000);
  await expect(
    page
      .frameLocator('[data-testid="checkout-iframe"]')
      .locator("div")
      .filter({ hasText: /^Approve payment$/ })
      .first()
  ).toBeVisible();
  await page.waitForTimeout(20000);
  await apply.verifySuccessfulSubmission();
});
