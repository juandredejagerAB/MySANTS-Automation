import { test } from "../../fixtures/authFixture";
import { SchoolsPage } from "../../pages/portal/Schools";
import { signOut } from "../../../utils/auth-utils";

test("Admin Creates New School", async ({ page, admin }) => {
  const schools = new SchoolsPage(page);

  await schools.navigate();
  await schools.addNewSchool();
  await schools.verifySchoolAdded();
  await schools.searchForSchool();

  await signOut(page);
});
