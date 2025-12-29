import { test, expect } from "@playwright/test";
import { getGlobals } from "../../../utils/getGlobals";
import { ApplyPage } from "../../pages/portal/ApplyPage";

test("Accepted Applicant Redirect To Registration Fee", async ({
  page,
}, testInfo) => {
  const apply = new ApplyPage(page);
  const globals = getGlobals(testInfo);

  // Start test
  await apply.goToApplyPage();

  await expect(page.locator("h3")).toContainText("Application");
  await expect(page.locator("h5")).toContainText(
    "Start or Continue your application today!"
  );
  await page
    .getByPlaceholder("Email Address")
    .fill("autonhannahking1732599681156@maildrop.cc");
  await page
    .getByPlaceholder("ID Number/Passport Number")
    .fill("8205214143080");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.locator("h3")).toContainText("Registration Fee");
  await expect(
    page.getByRole("heading", { name: "Amount Due:" })
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "R2,500.00" })).toBeVisible();
  await expect(page.getByText("To complete your registration")).toBeVisible();
  await expect(page.locator("abp-page")).toContainText(
    "To complete your registration, you need to pay the registration fee. You can choose one of the following options:"
  );
  await expect(page.getByRole("heading", { name: "Pay Now" })).toBeVisible();
  await expect(page.locator("app-payment-gateway")).toContainText(
    "For instant payment, you can pay directly through our secure payment gateway using the supported method."
  );
  await expect(page.locator("app-payment-gateway")).toContainText(
    "After completing the payment, a receipt will automatically be added to your profile."
  );
  await expect(
    page.getByRole("button", { name: /Online Payment|Completed/ })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Secured by Peach Payments" })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Proof of Payment" })
  ).toBeVisible();
  await expect(page.locator("#application")).toContainText(
    "Please upload your proof of payment after making the payment to the bank account below."
  );
  await expect(
    page.getByRole("heading", { name: "Banking Details" })
  ).toBeVisible();
  await expect(page.getByText("Name: SANTS")).toBeVisible();
  await expect(page.getByText("Bank: First National Bank")).toBeVisible();
  await expect(page.getByText("Branch and Code: Menlyn 252-")).toBeVisible();
  await expect(page.getByText("Account Number:")).toBeVisible();

  // Expect the registration fee heading to be available
  await expect(
    page.locator("#application > div.my-3 > div > div.my-5 > h4")
  ).toBeVisible();

  await expect(
    page.getByText("Please upload your registration Proof of Payment")
  ).toBeVisible();
});
