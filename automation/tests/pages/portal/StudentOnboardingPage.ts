import { Page, Locator, FrameLocator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Console } from "console";
import { NavBar } from "../components/NavBar";

export class StudentOnboardingPage extends BasePage {
  // Navigation and Search
  private nav = new NavBar(this.page);
  private readonly searchInput: Locator;
  private readonly advancedFiltersLink: Locator;
  private readonly statusFilter: Locator;
  private readonly refreshButton: Locator;
  private readonly admittedChip: Locator;

  // Student Details
  private readonly idElement: Locator;
  private readonly emailElement: Locator;

  // Administration
  private readonly actionsButton: Locator;
  private readonly loginAsUserButton: Locator;

  // Step 1: Code of Conduct
  private readonly stepIndicator1: Locator;
  private readonly stepIndicator2: Locator;
  private readonly stepIndicator3: Locator;
  private readonly stepIndicator4: Locator;
  private readonly stepIndicator5: Locator;
  private readonly stepIndicator6: Locator;
  private readonly codeOfConductButton: Locator;
  private readonly acceptButton: Locator;
  private readonly nextbutton: Locator;

  // Step 2: Student Declaration
  private readonly idInput: Locator;
  private readonly cityInput: Locator;
  private readonly declarationCheckbox: Locator;

  // Step 3: Tuition Fees
  private readonly tuitionFeesCheckbox: Locator;

  // Step 4: Address
  private readonly addressLine1: Locator;
  private readonly provinceCombobox: Locator;
  private readonly cityCombobox: Locator;
  private readonly suburbInput: Locator;
  private readonly streetNumberInput: Locator;
  private readonly postalCodeInput: Locator;

  // Step 5: Delivery Address
  private readonly paxiFrame: FrameLocator;
  private readonly paxiPointButton: Locator;
  private readonly confirmButton: Locator;
  private readonly PaxiSelectedPoint: Locator;

  // Step 6: Language
  private readonly homeLanguageSelect: Locator;
  private readonly firstAddLanguageSelect: Locator;
  private readonly homeLanguageSwitch: Locator;
  private readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);

    // Initialize Navigation locators
    this.searchInput = page.getByPlaceholder("Search");
    this.advancedFiltersLink = page.getByRole("link", {
      name: "Advanced filters",
    });
    this.statusFilter = page.locator("#studentStatusFilter");
    this.refreshButton = page.getByRole("button", { name: "Refresh" });
    this.admittedChip = page
      .locator(
        "datatable-body-cell:nth-child(8) > .datatable-body-cell-label > app-chip > .rounded-2"
      )
      .first();

    // Initialize Student Details locators
    this.idElement = page.locator(
      "app-personal-info > form > app-input-text:nth-child(7) > app-labelled-text > p > span"
    );
    this.emailElement = page.locator(
      "#contact-details > div:nth-child(1) > div.col-sm-6.col-md-6 > app-input-text > app-labelled-text > p > span"
    );

    // Initialize Administration locators
    this.actionsButton = page.getByRole("button", { name: " Actions" });
    this.loginAsUserButton = page.getByRole("button", {
      name: "Log in with this user",
    });

    // Initialize Step locators
    this.stepIndicator1 = page.locator(
      ".baby-step.bg-secondary.text-white#baby-step-1"
    );
    this.stepIndicator2 = page.locator(
      ".baby-step.bg-secondary.text-white#baby-step-2"
    );
    this.stepIndicator3 = page.locator(
      ".baby-step.bg-secondary.text-white#baby-step-3"
    );
    this.stepIndicator4 = page.locator(
      ".baby-step.bg-secondary.text-white#baby-step-4"
    );
    this.stepIndicator5 = page.locator(
      ".baby-step.bg-secondary.text-white#baby-step-5"
    );
    this.stepIndicator6 = page.locator(
      ".baby-step.bg-secondary.text-white#baby-step-6"
    );
    this.codeOfConductButton = page
      .getByRole("button", { name: "Accept" })
      .first();
    this.acceptButton = page.getByRole("button", { name: "Accept" }).nth(1);
    this.nextbutton = page.getByRole("button", { name: "Next" });
    this.idInput = page.getByRole("textbox", {
      name: "ID or Passport Number *",
    });
    this.cityInput = page.getByRole("textbox", { name: "Signed at *" });
    this.declarationCheckbox = page.getByRole("checkbox", {
      name: "I accept the declaration *",
    });
    this.tuitionFeesCheckbox = page.getByRole("checkbox", {
      name: "I accept the tuition fees *",
    });
    this.addressLine1 = page.getByPlaceholder("Enter Address Line 1");
    this.provinceCombobox = page.locator("#province").getByRole("combobox");
    this.cityCombobox = page.locator("#city").getByRole("textbox");
    this.suburbInput = page.getByPlaceholder("Enter Suburb");
    this.streetNumberInput = page.getByPlaceholder("Enter Street Number");
    this.postalCodeInput = page.getByPlaceholder("Enter Postal Code");
    this.paxiFrame = page.frameLocator("app-paxi-address iframe");
    this.paxiPointButton = this.paxiFrame
      .locator("#P0107")
      .getByRole("button", { name: "Choose this point" });
    this.confirmButton = page.getByRole("button", { name: "Confirm" });
    this.homeLanguageSelect = page
      .locator("#homeLanguage")
      .getByRole("combobox");
    this.firstAddLanguageSelect = page
      .locator("#firstAdditionalLanguage")
      .getByRole("combobox");

    this.homeLanguageSwitch = page.getByRole("checkbox", {
      name: "I would rather take a Home",
    });
    this.submitButton = page.getByRole("button", { name: "Finish" });
    this.PaxiSelectedPoint = page.locator("#selected-paxi-point");
  }

  async searchAdmittedStudent(searchText: string) {
    await this.nav.goToStudents();
    await this.searchInput.click();
    await this.searchInput.fill(searchText);
    await this.advancedFiltersLink.click();
    await this.statusFilter.selectOption({ label: "Admitted" });
    await this.refreshButton.click();
    await expect(this.admittedChip).toContainText("Admitted");
    await this.admittedChip.click();
  }

  async getStudentDetails(): Promise<{ id: string; email: string }> {
    const idText = await this.idElement.textContent();
    const id = idText?.trim();
    if (!id) throw new Error("ID was not found on the page.");

    const emailText = await this.emailElement.textContent();
    const email = emailText?.match(/\S+@maildrop\.cc/)?.[0];
    if (!email) throw new Error("Email was not found on the page.");
    expect(email).toContain("@maildrop.cc");

    console.log(`Extracted ID: ${id}, Email: ${email}`);

    return { id, email };
  }

  async loginAsStudent(email: string) {
    await this.nav.goToUsers();
    await this.searchInput.fill(email);
    await this.page.waitForTimeout(2000);
    await this.actionsButton.click();
    await this.loginAsUserButton.click();
  }

  async completeStep1() {
    await expect(this.stepIndicator1).toBeVisible();
    await expect(this.page.locator("app-acknowledgements")).toContainText(
      "Let’s get you going by completing the next few steps."
    );
    await this.codeOfConductButton.click();
    await this.acceptButton.click();
    await this.nextbutton.click();
  }

  async completeStep2(id: string, city: string) {
    await expect(this.stepIndicator2).toBeVisible();
    await expect(this.page.getByRole("heading")).toContainText(
      "Student Declaration"
    );
    await this.idInput.fill(id);
    await this.cityInput.fill(city);
    await this.declarationCheckbox.check();
    await this.nextbutton.click();
  }

  async completeStep3() {
    await expect(this.stepIndicator3).toBeVisible();
    await expect(this.page.getByRole("heading")).toContainText(
      "Tuition Fee Acceptance"
    );
    await this.tuitionFeesCheckbox.check();
    await this.page.waitForTimeout(1000);
    await this.nextbutton.click();
    await this.page.waitForTimeout(2000);
  }

  async completeStep4(provinceOption: string) {
    await expect(this.stepIndicator4).toBeVisible();
    await this.addressLine1.fill("1234 Test Ave");
    await this.provinceCombobox.click();
    await this.page.waitForTimeout(1000);
    await this.page
      .getByRole("option", { name: provinceOption })
      .locator("div")
      .click();
    await this.page.waitForTimeout(1000);
    await this.cityCombobox.click();
    await this.cityCombobox.fill("Fourway");
    await this.page.waitForTimeout(2000);
    await this.page.getByText("Fourways").click();
    await this.suburbInput.fill("JHB");
    await this.streetNumberInput.fill("1234");
    await this.postalCodeInput.fill("2001");
    await this.nextbutton.click();
    await this.page.waitForTimeout(4000);
  }

  async completeStep5() {
    await expect(this.stepIndicator5).toBeVisible();
    await expect(this.page.getByRole("heading")).toContainText(
      "Delivery Address"
    );
    await this.page.waitForTimeout(4000);
    await this.paxiPointButton.click();
    await this.page.waitForTimeout(2000);
    await expect(this.PaxiSelectedPoint).toBeVisible();
    await this.page.waitForTimeout(2000);
    await this.nextbutton.click();
    await this.page.waitForTimeout(2000);
    await this.confirmButton.click();
  }

  async completeStep6() {
    await expect(this.stepIndicator6).toBeVisible();
    await expect(this.page.getByRole("heading")).toContainText(
      "Language Choices"
    );

    await this.homeLanguageSelect.click();
    await this.page.getByLabel("Options list").getByText("English").click();
    await expect(
      this.page.getByText("First Additional Language *")
    ).toBeVisible();
    await this.homeLanguageSwitch.check();
    await expect(this.page.getByText("Home Language 2 *")).toBeVisible();
    await expect(
      this.page.getByText("First Additional Language *")
    ).toBeHidden();
    await this.homeLanguageSwitch.uncheck();
    await expect(this.page.getByText("Home Language 2 *")).toBeHidden();
    await expect(
      this.page.getByText("First Additional Language *")
    ).toBeVisible();
    await this.firstAddLanguageSelect.click();
    await this.page.getByText("IsiXhosa").click();
    await this.submitButton.click();
  }

  async verifyDashboard() {
    await expect(
      this.page.getByRole("heading", { name: "Dashboard" })
    ).toBeVisible();
  }
}
