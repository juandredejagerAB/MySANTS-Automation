import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { NavBar } from "../components/NavBar";
import { Button } from "../components/buttons";

export class SchoolsPage extends BasePage {
  private readonly nav: NavBar;

  // Page elements
  private readonly pageHeading: Locator;
  private readonly newSchoolButton: Button;
  private readonly searchInput: Locator;
  private readonly table: Locator;

  // Add New School Dialog
  private readonly schoolNameInput: Locator;
  private readonly emisNumberInput: Locator;
  private readonly typeDropdown: Locator;
  private readonly sectorDropdown: Locator;
  private readonly emailInput: Locator;
  private readonly officeContactInput: Locator;
  private readonly representativeContactInput: Locator;
  private readonly altContactInput: Locator;
  private readonly provinceDropdown: Locator;
  private readonly cityDropdown: Locator;
  private readonly suburbInput: Locator;
  private readonly addressLine1Input: Locator;
  private readonly addressLine2Input: Locator;
  private readonly streetNumberInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly submitButton: Button;

  constructor(page: Page) {
    super(page);
    this.nav = new NavBar(page);
    this.pageHeading = page.getByRole("heading", { name: "Schools" });
    this.newSchoolButton = Button.byName(page, "New School");
    this.searchInput = page.locator('input[placeholder="Search"]');
    this.table = page.locator("datatable-body");

    // Form fields
    this.schoolNameInput = page.getByPlaceholder("Enter School Name");
    this.emisNumberInput = page.getByPlaceholder("Enter EMIS Number");
    this.typeDropdown = page.locator('label:has-text("Type")').locator("..").getByRole("combobox");
    this.sectorDropdown = page.locator('label:has-text("Sector")').locator("..").getByRole("combobox");
    this.emailInput = page.getByPlaceholder("Enter School Email");
    this.officeContactInput = page.getByPlaceholder("Enter Office Contact Number");
    this.representativeContactInput = page.getByPlaceholder("Enter Representative Contact Number");
    this.altContactInput = page.getByPlaceholder("Enter Alternative Contact Number");
    this.provinceDropdown = page.locator('label:has-text("Province")').locator("..").getByRole("combobox");
    this.cityDropdown = page.locator('label:has-text("City")').locator("..").getByRole("combobox");
    this.suburbInput = page.getByPlaceholder("Enter Suburb");
    this.addressLine1Input = page.getByPlaceholder("Enter Address Line 1");
    this.addressLine2Input = page.getByPlaceholder("Enter Address Line 2");
    this.streetNumberInput = page.getByPlaceholder("Enter Street Number");
    this.postalCodeInput = page.getByPlaceholder("Enter Postal Code");
    this.submitButton = Button.byName(page, "Submit");
  }

  async navigate(): Promise<void> {
    await this.nav.goToSchools();
    await this.verifyPage();
  }

  async verifyPage(): Promise<void> {
    await expect(this.pageHeading).toBeVisible();
  }

  async addNewSchool(): Promise<void> {
    await this.newSchoolButton.click();
    await expect(this.page.locator("text=Add New School")).toBeVisible();

    await this.schoolNameInput.fill("Automation Test School");
    await this.emisNumberInput.fill("999999999");
    await this.typeDropdown.selectOption("Main stream");
    await this.sectorDropdown.selectOption("Public");

    await this.emailInput.fill("automation.school@test.com");
    await this.officeContactInput.fill("0215551234");
    await this.representativeContactInput.fill("0845551234");
    await this.altContactInput.fill("0825559876");

    await this.provinceDropdown.selectOption("Western Cape");
    await this.cityDropdown.selectOption("Cape Town");
    await this.suburbInput.fill("Century City");
    await this.addressLine1Input.fill("1 Test Street");
    await this.addressLine2Input.fill("Automation Block");
    await this.streetNumberInput.fill("12");
    await this.postalCodeInput.fill("7441");

    await this.submitButton.click();
  }

  async verifySchoolAdded(): Promise<void> {
    await expect(this.table).toContainText("Automation Test School");
  }

  async searchForSchool(): Promise<void> {
    await this.searchInput.fill("Automation Test School");
    await expect(this.table).toContainText("Automation Test School");
  }
}