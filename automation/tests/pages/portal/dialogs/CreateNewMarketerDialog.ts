import { Page, Locator } from "@playwright/test";
import { CreateUserDialog } from "./CreateNewUserDialog";

export class CreateMarketerDialog {
  readonly dialog: Locator;
  readonly userDropdown: Locator;
  readonly searchInput: Locator;
  readonly newUserButton: Locator;
  readonly marketerFirstNameInput: Locator;
  readonly marketerLastNameInput: Locator;
  readonly marketerEmailAddressInput: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;

  constructor(private page: Page) {
    this.dialog = this.page.getByRole("heading", { name: "New Marketer" });
    this.newUserButton = this.page.locator("#marketer-form i");
    this.marketerFirstNameInput =
      this.page.getByPlaceholder("Enter First Name");
    this.marketerLastNameInput = this.page.getByPlaceholder("Enter Last Name");
    this.marketerEmailAddressInput =
      this.page.getByPlaceholder("example@mail.com");
    this.saveButton = this.page.getByRole("button", { name: "Save" });
    this.cancelButton = this.page.getByRole("button", { name: "Cancel" });
    this.userDropdown = this.page.locator("#marker-person-id span").first();
    this.searchInput = this.page.locator("textbox");
  }
  /** Wait until the “Create Marketer” dialog is visible on screen */
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

  async fillNewUserMarketerDetails(data: {
    marketerFirstName: string;
    marketerLastName: string;
    marketerEmailAddress: string;
  }) {
    await this.marketerFirstNameInput.fill(data.marketerFirstName);
    await this.marketerLastNameInput.fill(data.marketerLastName);
    await this.marketerEmailAddressInput.fill(data.marketerEmailAddress);
  }

  /** Click “Save” and wait for the network call (assumes a POST) and for the dialog to close */
  async save() {
    await this.saveButton.click();
    await this.dialog.waitFor({ state: "hidden", timeout: 5000 });
  }

  async cancel() {
    await this.cancelButton.click();
    await this.dialog.waitFor({ state: "hidden", timeout: 3000 });
  }
}
