import { test, expect } from "@playwright/test";
import { ApplyPage } from "../../pages/portal/ApplyPage";

test("Accepted Applicant Redirect To Registration Fee with Application Fee", async ({
  page,
}) => {
  const apply = new ApplyPage(page);

  // Start test

  await apply.goToApplyPage();

  await page
    .getByPlaceholder("Email Address")
    .fill("applicationfeeredirect@maildrop.cc");
  await page.getByPlaceholder("Email Address").click();
  await page.getByPlaceholder("ID Number/Passport Number").click();
  await page
    .getByPlaceholder("ID Number/Passport Number")
    .fill("9404238033083");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByRole("heading", { name: "Fees Due" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Application Fee:" })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Registration Fee:" })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Amount Due:" })
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "R250.00" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "R2,500.00" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "R2,750.00" })).toBeVisible();
  await expect(page.getByText("To complete your registration")).toBeVisible();
  await expect(page.locator("abp-page")).toContainText(
    "To complete your registration and application, you need to pay the application and registration fee. Please pay all fees before"
  );
  await expect(page.getByRole("heading", { name: "Pay Now" })).toBeVisible();
  await expect(page.locator("app-payment-gateway")).toContainText(
    "For instant payment, you can pay directly through our secure payment gateway using the supported method."
  );
  await expect(page.locator("app-payment-gateway")).toContainText(
    "After completing the payment, a receipt will automatically be added to your profile."
  );
  await expect(
    page.getByRole("button", { name: "Online Payment" })
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
  await expect(
    page.getByRole("heading", { name: "Registration Fee", exact: true })
  ).toBeVisible();
  await expect(
    page.getByText("Please upload your registration Proof of Payment")
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Application Fee", exact: true })
  ).toBeVisible();
  await expect(page.locator("#application")).toContainText(
    "Do you have a separate proof of payment for your application fee? Please upload your application Proof of Payment."
  );
});
