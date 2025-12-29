import { signOut } from "../../../utils/auth-utils";
import { test, expect } from "../../fixtures/authFixture";
import { ModulesPage } from "../../pages/portal/ModulesPage";

test("Modules Menu Item", async ({ page, admin }, testInfo) => {
  const modulesPage = new ModulesPage(page);

  // Navigate to Modules
  await modulesPage.navigateToModules();
  await modulesPage.verifyModulesList();

  // Test New Module Form
  await modulesPage.openNewModuleForm();
  await modulesPage.verifyNewModuleForm();
  await modulesPage.closeModals();

  // Search and verify specific module
  await modulesPage.searchModule("B-ALI");
  await modulesPage.verifySearchResults("1");

  // Check module details
  await modulesPage.openModuleDetails("B-ALI");
  await modulesPage.verifyModuleDetails();

  // Test Lecturer and Marker functionality
  await modulesPage.addLecturer();
  await modulesPage.closeModals();
  await modulesPage.addMarker();
  await modulesPage.closeModals();

  await signOut(page);
});
