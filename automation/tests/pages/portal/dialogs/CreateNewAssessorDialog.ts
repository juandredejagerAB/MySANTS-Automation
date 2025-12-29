import { Page, Locator, expect } from "@playwright/test";
import { CreateUserDialog } from "./CreateNewUserDialog";

export class CreateAssessorDialog {
  readonly dialog: Locator;
  readonly userDropdown: Locator;
  readonly searchInput: Locator;
  readonly newUserButton: Locator;
  readonly FirstNameInput: Locator;
  readonly LastNameInput: Locator;
  readonly EmailAddressInput: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  readonly AssessorNameHeading: Locator;
  readonly AssessorStatusChip: Locator;
  readonly BackButton: Locator;

  constructor(private page: Page) {
    this.dialog = this.page.getByRole("heading", { name: "New Assessor" });
    this.newUserButton = this.page.locator("#assessor-form i");
    this.FirstNameInput = this.page.getByPlaceholder("Enter First Name");
    this.LastNameInput = this.page.getByPlaceholder("Enter Last Name");
    this.EmailAddressInput = this.page.getByPlaceholder("example@mail.com");
    this.saveButton = this.page.getByRole("button", { name: "Save" });
    this.cancelButton = this.page.getByRole("button", { name: "Cancel" });
    this.userDropdown = this.page.locator("#assessor-person-id span").first();
    this.searchInput = this.page.locator("textbox");
    this.AssessorNameHeading = this.page.locator("div:nth-child(2) > h3");
    this.AssessorStatusChip = this.page.locator("app-chip");
    this.BackButton = this.page.locator(".back-arrow.pe-3.mt-2");
  }
  async waitForOpen() {
    await this.dialog.waitFor({ state: "visible", timeout: 5000 });
  }

  async selectUserFromDropdown(userEmailAddress: string) {
    await this.searchInput.fill(userEmailAddress);
    await this.userDropdown.selectOption({ label: userEmailAddress });
  }

  async addNewUser() {
    await this.newUserButton.click();
    const userDialog = new CreateUserDialog(this.page);
    await userDialog.waitForOpen();
    return userDialog;
  }

  async fillNewUserAssessorDetails(data: {
    FirstName: string;
    LastName: string;
    EmailAddress: string;
  }) {
    await this.FirstNameInput.fill(data.FirstName);
    await this.LastNameInput.fill(data.LastName);
    await this.EmailAddressInput.fill(data.EmailAddress);
  }

  async save() {
    await this.saveButton.click();
    await this.dialog.waitFor({ state: "hidden", timeout: 5000 });
  }

  async cancel() {
    await this.cancelButton.click();
    await this.dialog.waitFor({ state: "hidden", timeout: 3000 });
  }

  async verifyassessorcreation(data: {
    FirstName: string;
    LastName: string;
    EmailAddress: string;
  }) {
    await expect(this.AssessorNameHeading).toContainText(
      data.FirstName + " " + data.LastName
    );
    await expect(this.AssessorStatusChip).toContainText("Orientation");
    await this.BackButton.click();
  }
}
