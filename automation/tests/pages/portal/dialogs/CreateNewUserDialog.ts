import { Page, Locator } from "@playwright/test";

export class CreateUserDialog {
  readonly dialog: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailAddressInput: Locator;
  readonly createButton: Locator;
  readonly cancelButton: Locator;

  constructor(private page: Page) {
    this.dialog = this.page.getByRole("heading", { name: "New User" });
    this.firstNameInput = this.page.getByPlaceholder("Enter First Name");
    this.lastNameInput = this.page.getByPlaceholder("Enter Last Name");
    this.emailAddressInput = this.page.getByPlaceholder("example@mail.com");
    this.createButton = this.page.getByRole("button", { name: "Create" });
    this.cancelButton = this.page.getByRole("button", { name: "Cancel" });
  }

  /** Wait until the “Create User” popup appears */
  async waitForOpen(timeout = 5000) {
    await this.dialog.waitFor({ state: "visible", timeout });
  }

  /** Fill in the new user’s details */
  async fillForm(data: {
    firstName: string;
    lastName: string;
    emailAddress: string;
  }) {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailAddressInput.fill(data.emailAddress);
  }

  /** Click “Save User”, wait for the network call, and ensure the dialog closes */
  async create() {
    this.createButton.click();
    await this.dialog.waitFor({ state: "hidden", timeout: 30000 });
  }

  /** Optional: cancel out of the Create User dialog */
  async cancel() {
    await this.cancelButton.click();
    await this.dialog.waitFor({ state: "hidden", timeout: 3000 });
  }
}
