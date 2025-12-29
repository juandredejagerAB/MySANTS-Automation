import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Button } from "../components/buttons";
import { NavBar } from "../components/NavBar";
import type { StudentData } from "../../types/datatypes";

export class StudentsPage extends BasePage {
  private nav = new NavBar(this.page);
  readonly studentPageHeading: Locator;
  readonly createStudentButton: Locator;
  readonly searchInput: Locator;
  readonly downloadCsvButton: Button;
  readonly studentTable: Locator;

  constructor(page: Page) {
    super(page);
    this.studentPageHeading = page.getByRole("heading", { name: "Students" });
    this.createStudentButton = page.getByRole("button", { name: " New" });
    this.searchInput = page.getByPlaceholder("Search");
    this.downloadCsvButton = Button.byName(page, "Export");
    this.studentTable = page.getByRole("table");
  }

  async goToViaMenu(): Promise<void> {
    await this.nav.goToStudents();
    await this.studentPageHeading.waitFor();
    await this.studentTable.waitFor();
  }

  async goToViaLink(): Promise<void> {
    await this.page.goto("/students");
  }

  async clickNewStudent(): Promise<void> {
    await this.createStudentButton.click();
  }

  async waitForCreateStudentHeading(): Promise<void> {
    await this.page.getByRole("heading", { name: "Create Student" }).waitFor();
  }

  async selectTitle(title: string): Promise<void> {
    await this.page.locator("#title").getByRole("combobox").click();
    await this.page
      .getByRole("option", { name: title, exact: true })
      .locator("div")
      .click();
  }

  async fillFirstName(name: string): Promise<void> {
    await this.page.getByPlaceholder("Enter First Name").fill(name);
  }

  async fillLastName(name: string): Promise<void> {
    await this.page.getByPlaceholder("Enter Last Name").fill(name);
  }

  async fillIdNumber(id: string): Promise<void> {
    await this.page.getByPlaceholder("ID Number").fill(id);
  }

  async selectGender(gender: string): Promise<void> {
    await this.page.locator("#gender").getByRole("combobox").click();
    await this.page
      .getByRole("option", { name: gender, exact: true })
      .locator("div")
      .click();
  }

  async selectRace(race: string): Promise<void> {
    await this.page.locator("#race").getByRole("combobox").click();
    await this.page.getByRole("option", { name: race }).locator("div").click();
  }

  async selectNationality(country: string): Promise<void> {
    await this.page
      .locator("#application-nationality")
      .getByRole("textbox")
      .click();
    await this.page.getByText(country).click();
  }

  async fillEmail(email: string): Promise<void> {
    await this.page.getByPlaceholder("example@mail.com").fill(email);
  }

  async fillContactNumber(num: string): Promise<void> {
    await this.page.getByPlaceholder("Enter Contact Number").fill(num);
  }

  async selectProgramme(programmeName: string): Promise<void> {
    await this.page.locator("#programme-id").getByRole("textbox").click();
    await this.page.getByLabel("Options list").getByText(programmeName).click();
  }

  async selectAcademicPeriod(periodName: string): Promise<void> {
    await this.page.locator("#academic-period-id").getByRole("textbox").click();
    await this.page.getByRole("option", { name: periodName }).click();
  }

  async submit(): Promise<void> {
    await this.page.getByRole("button", { name: "Submit" }).click();
  }

  async waitForStudentDetails(): Promise<void> {
    await this.page.getByRole("heading", { name: "Student Details" }).waitFor();
  }

  async studentNameHeadingText(): Promise<string | null> {
    const h = await this.page
      .getByRole("heading")
      .filter({ hasText: / / })
      .textContent();
    return h;
  }

  async goToUsers(): Promise<void> {
    await this.nav.goToUsers();
  }

  async searchUser(email: string): Promise<void> {
    await this.page.getByPlaceholder("Search").click();
    await this.page.getByPlaceholder("Search").fill(email);
    await this.page.waitForTimeout(4000);
  }

  async getUsersTableFooterText(): Promise<string | null> {
    await this.page.waitForTimeout(4000);
    return this.page.locator("datatable-footer").textContent();
  }

  userRowByEmail(email: string) {
    return this.page
      .locator("datatable-body-cell:nth-child(3)")
      .filter({ hasText: email });
  }

  async createStudentFlow(data: StudentData) {
    const {
      title,
      firstName,
      lastName,
      idNumber,
      gender,
      race,
      nationality,
      email,
      contactNumber,
      programme,
      academicPeriod,
    } = data;

    await this.goToViaMenu();
    await this.clickNewStudent();
    await this.waitForCreateStudentHeading();

    await this.selectTitle(title);
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillIdNumber(idNumber);
    await this.selectGender(gender);
    await this.selectRace(race);
    await this.selectNationality(nationality);
    await this.fillEmail(email);
    await this.fillContactNumber(contactNumber);
    await this.selectProgramme(programme);
    await this.selectAcademicPeriod(academicPeriod);
    await this.submit();
    await this.page.waitForTimeout(10000);
    await this.waitForStudentDetails();
  }
}
