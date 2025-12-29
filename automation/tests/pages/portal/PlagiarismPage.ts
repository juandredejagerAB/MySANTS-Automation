import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class PlagiarismPage extends BasePage {
  private readonly headingLocator: Locator;
  private readonly containerLocator: Locator;
  private readonly PlagiarismDropdown: Locator;
  private readonly PlagiarismText: Locator;
  private readonly cancelButton: Locator;

  constructor(page: Page) {
    super(page);
    this.headingLocator = page.getByRole("heading", {
      name: "Plagiarism Scales",
    });
    this.containerLocator = page.locator("app-plagiarism-scales");
    this.PlagiarismDropdown = page.getByRole("combobox");
    this.PlagiarismText = page.getByRole("textbox", {
      name: "Enter Extent of irregularity",
    });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });
  }

  async verifyPageVisible(): Promise<void> {
    await expect(this.headingLocator).toBeVisible();
  }

  async verifyContainerContains(text: string): Promise<void> {
    await expect(this.containerLocator).toContainText(text);
  }

  async openRowActionsByRowName(rowName: string): Promise<void> {
    await this.page
      .getByRole("row", { name: `${rowName} Actions` })
      .getByLabel("Actions")
      .click();
  }

  async clickView(): Promise<void> {
    await this.page.getByRole("button", { name: "View" }).click();
  }

  async verifyPlagiarismScaleInfoVisible() {
    await expect(
      this.page.getByRole("heading", { name: "Plagiarism Scale Information" })
    ).toBeVisible();
  }

  async verifyFormContains() {
    await expect(this.PlagiarismDropdown).toBeVisible();
    await expect(this.PlagiarismText).toBeVisible();
  }

  async cancelDialog(): Promise<void> {
    await this.cancelButton.click();
  }
}
