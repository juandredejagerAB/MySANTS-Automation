import { Page, Locator, expect } from "@playwright/test";
import type { PersonalInfoData } from "../../types/datatypes";

export class ApplyPage {
  readonly page: Page;

  // Initial Application Selectors
  private readonly emailInput: Locator;
  private readonly idNumberInput: Locator;
  private readonly submitButton: Locator;

  // Step 1: Personal Information Selectors
  private readonly firstNameInput: Locator;
  private readonly preferredNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly addressLine1Input: Locator;
  private readonly provinceCombobox: Locator;
  private readonly cityCombobox: Locator;
  private readonly cityInput: Locator;
  private readonly suburbInput: Locator;
  private readonly streetNumberInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly contactNumberInput: Locator;
  private readonly termsCheckbox: Locator;
  private readonly popiConsentCheckbox: Locator;
  private readonly continueButton: Locator;
  private readonly titleCombobox: Locator;
  private readonly genderCombobox: Locator;
  private readonly raceCombobox: Locator;
  private readonly nationalityCombobox: Locator;
  private readonly homeLanguageCombobox: Locator;
  private readonly firstAddLanguageCombobox: Locator;

  // Step 2: Programme Selection Selectors
  private readonly diplomaGradeROption: Locator;
  private readonly inServiceCheckbox: Locator;
  private readonly diplomaInCheckbox: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initial Application
    this.emailInput = page.getByPlaceholder("Email Address");
    this.idNumberInput = page.getByPlaceholder("ID Number/Passport Number");
    this.submitButton = page.getByRole("button", { name: "Submit" });

    // Personal Information
    this.firstNameInput = page.getByPlaceholder("Enter First Name");
    this.preferredNameInput = page.getByPlaceholder("Enter Preferred Name");
    this.lastNameInput = page.getByPlaceholder("Enter Last Name");
    this.addressLine1Input = page.getByPlaceholder("Enter Address Line 1");
    this.provinceCombobox = page.locator("#province").getByRole("combobox");
    this.cityCombobox = page.locator("#city").getByRole("combobox");
    this.cityInput = page.locator("#city").getByRole("textbox");
    this.suburbInput = page.getByPlaceholder("Enter Suburb");
    this.streetNumberInput = page.getByPlaceholder("Enter Street Number");
    this.postalCodeInput = page.getByPlaceholder("Enter Postal Code");
    this.contactNumberInput = page.getByPlaceholder("Enter Contact Number");
    this.termsCheckbox = page.getByLabel("I agree to the provided Terms");
    this.popiConsentCheckbox = page.getByLabel(
      "I agree to the provided Application & POPI Consent"
    );
    this.continueButton = page.getByRole("button", {
      name: "Continue",
      exact: true,
    });
    this.titleCombobox = page
      .locator("#application-title")
      .getByRole("combobox");
    this.genderCombobox = page
      .locator("#application-gender")
      .getByRole("combobox");
    this.raceCombobox = page.locator("#application-race").getByRole("combobox");
    this.nationalityCombobox = page
      .locator("#application-nationality")
      .getByRole("combobox");
    this.homeLanguageCombobox = page
      .locator("#application-home-language")
      .getByRole("combobox");
    this.firstAddLanguageCombobox = page
      .locator("#application-first-additional-language")
      .getByRole("combobox");

    // Programme Selection
    this.diplomaGradeROption = page.getByText("Diploma in Grade R Teaching");
    this.inServiceCheckbox = page.getByRole("checkbox", {
      name: "Currently an in-service Grade",
    });
    this.diplomaInCheckbox = page.getByRole("checkbox", {
      name: "Doing the Diploma in Grade R",
    });
  }

  async goToApplyPage() {
    await this.page.goto("/apply");
  }

  async startApplication(email: string, idNumber: string) {
    await this.emailInput.fill(email);
    await this.idNumberInput.fill(idNumber);
    await this.submitButton.click();
  }

  async verifyInitialPage() {
    await expect(this.page.locator("h3")).toContainText("Application");
    await expect(this.page.locator("h5")).toContainText(
      "Start or Continue your application today!"
    );
  }

  async continuetonextStep() {
    await this.continueButton.click();
  }

  async fillPersonalInformation(data: PersonalInfoData) {
    const {
      firstName,
      preferredName,
      lastName,
      province,
      address,
      suburb,
      streetNumber,
      postalCode,
      contactNumber,
    } = data;

    await this.titleCombobox.click();
    await this.page
      .getByRole("option", { name: "Mr", exact: true })
      .locator("div")
      .click();
    await this.firstNameInput.fill(firstName);
    await this.preferredNameInput.fill(preferredName);
    await this.lastNameInput.fill(lastName);
    await this.genderCombobox.click();
    await this.page
      .getByRole("option", { name: "Male", exact: true })
      .locator("div")
      .click();
    await this.raceCombobox.click();
    await this.page
      .getByRole("option", { name: "Coloured" })
      .locator("div")
      .click();

    await this.nationalityCombobox.click();
    await this.page
      .getByRole("option", { name: "South Africa" })
      .locator("div")
      .click();

    await this.homeLanguageCombobox.click();
    await this.page
      .getByRole("option", { name: "English" })
      .locator("div")
      .click();

    await this.firstAddLanguageCombobox.click();
    await this.page.getByText("Sepedi").click();

    await this.addressLine1Input.fill(address);
    await this.provinceCombobox.click();
    await this.page
      .getByRole("option", { name: province })
      .locator("div")
      .click();

    //await this.page.waitForLoadState("networkidle");
    await this.cityCombobox.click();
    await this.cityInput.fill("Fourway");
    await this.page.getByText("Fourways", { exact: true }).click();
    await this.suburbInput.fill(suburb);
    await this.streetNumberInput.fill(streetNumber);
    await this.postalCodeInput.fill(postalCode);
    await this.contactNumberInput.fill(contactNumber);

    await this.termsCheckbox.check();
    await this.popiConsentCheckbox.check();
  }

  async selectProgramme() {
    await this.diplomaGradeROption.click();
    await this.continueButton.click();
  }

  async fillProgrammeDetails() {
    await this.inServiceCheckbox.check();
    await this.diplomaInCheckbox.check();
  }

  async verifyStep(stepNumber: string, pageTitle: string) {
    await expect(this.page.getByText(`Step ${stepNumber} /`)).toBeVisible();
    await expect(this.page.locator("abp-page")).toContainText(pageTitle);
  }

  async verifyPaymentDetails(idNumber: string) {
    await expect(
      this.page.getByRole("heading", { name: "Payment" }).nth(1)
    ).toBeVisible();
    await expect(
      this.page.getByRole("heading", { name: "Amount Due:" })
    ).toBeVisible();
    await expect(
      this.page.getByRole("heading", { name: "Proof of Payment" })
    ).toBeVisible();
    await expect(this.page.locator("#application")).toContainText(
      `Banking DetailsName: SANTSBank: First National BankBranch and Code: Menlyn 252-445Account Number: 62438872261Payment Reference: ${idNumber}`
    );
  }

  async verifySuccessfulSubmission() {
    await expect(this.page.locator("h3")).toContainText(
      "Application Submitted Successfully"
    );
    await expect(this.page.locator("app-application-successful")).toContainText(
      "Thank you for your application! We have successfully received your submission."
    );
    await expect(this.page.locator("app-application-successful")).toContainText(
      "Keep an eye on your email inbox for updates regarding your application status."
    );
    await expect(
      this.page.getByRole("button", { name: "Back to Website" })
    ).toBeVisible();
    await expect(
      this.page.getByRole("img", { name: "SANTS logo" })
    ).toBeVisible();
  }

  async verifyPeachPaymentGateway() {
    await expect(
      this.page.getByRole("heading", { name: "Pay Now" })
    ).toBeVisible();
    await expect(this.page.locator("app-payment-gateway")).toContainText(
      "For instant payment, you can pay directly through our secure payment gateway using the supported method."
    );
    await expect(this.page.locator("app-payment-gateway")).toContainText(
      "After completing the payment, a receipt will automatically be added to your profile."
    );
    await expect(
      this.page.getByRole("link", { name: "Secured by Peach Payments" })
    ).toBeVisible();
  }

  async verifyPeachPaymentOptions() {
    await expect(this.page.getByTestId("checkout-cancel-button")).toBeVisible();
    await expect(
      this.page.getByTestId("checkout-header-currency")
    ).toBeVisible();
    await expect(this.page.getByTestId("checkout-header-amount")).toBeVisible();
    await expect(this.page.getByTestId("checkout-CNP-button")).toBeVisible();
    await expect(
      this.page.getByTestId("checkout-paybybank-ui-button")
    ).toBeVisible();
  }

  async processCardPayment() {
    await this.page.getByRole("button", { name: "Online Payment" }).click();
    await this.page.waitForTimeout(2000);

    await this.verifyPeachPaymentOptions();
    await this.page.getByTestId("checkout-CNP-button").click();

    const cardFrame = this.page.frameLocator('[data-testid="checkout-iframe"]');

    // Fill card details
    await cardFrame
      .frameLocator('iframe[name="card\\.number"]')
      .getByPlaceholder("Card Number")
      .fill("4200000000000109");

    await cardFrame
      .getByPlaceholder("MM / YY", { exact: true })
      .fill("06 / 29");

    await cardFrame.getByPlaceholder("Card Holder").fill("tester");

    await cardFrame
      .frameLocator('iframe[name="card\\.cvv"]')
      .getByPlaceholder("CVV")
      .fill("123");

    // Submit payment and wait for processing
    await cardFrame.getByLabel("Pay now").click();
    await this.page.waitForTimeout(20000);
  }
}
