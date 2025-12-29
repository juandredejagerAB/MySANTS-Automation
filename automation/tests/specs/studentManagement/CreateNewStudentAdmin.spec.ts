import { getGlobals } from "../../../utils/getGlobals";
import { generateRandomStudentInfo } from "../../../utils/studentDataGenerator";
import { signOut } from "../../../utils/auth-utils";
import { test, expect } from "../../fixtures/authFixture";
import { StudentsPage } from "../../pages/portal/StudentsPage";

test("Create New Student", async ({ page, admin }, testInfo) => {
  const globals = getGlobals(testInfo);
  const { idNumber, firstName, surname, email } = generateRandomStudentInfo();
  const students = new StudentsPage(page);

  console.log({ idNumber, firstName, surname, email });

  await students.createStudentFlow({
    title: "Mr",
    firstName,
    lastName: surname,
    idNumber,
    gender: "Male",
    race: "Coloured",
    nationality: "South Africa",
    email,
    contactNumber: "0821111111",
    programme: "Bachelor of Education in Foundation Phase Teaching",
    academicPeriod: globals.addstudentPeriod,
  });

  await expect(
    page.getByRole("heading", { name: `${firstName} ${surname}` })
  ).toBeVisible();

  await students.goToUsers();
  await students.searchUser(email);

  await expect(await students.getUsersTableFooterText()).toContain("1 total");
  await expect(students.userRowByEmail(email)).toBeVisible();

  await signOut(page);
});
