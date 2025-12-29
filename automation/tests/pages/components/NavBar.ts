import { Page, Locator } from "@playwright/test";

export class NavBar {
  // Personal Menu
  private readonly notificationCentreLink: Locator;
  private readonly myInfoLink: Locator;
  private readonly myAccountLink: Locator;

  // Programme Menu
  private readonly myProgrammeDropdown: Locator;
  private readonly academicProgressLink: Locator;
  private readonly enrolmentsLink: Locator;
  private readonly myModulesLink: Locator;
  private readonly transcriptCodesLink: Locator;

  // Applications
  private readonly applicationsDropdown: Locator;
  private readonly myApplicationsLink: Locator;
  private readonly catApplicationsLink: Locator;
  private readonly reviewersLink: Locator;
  private readonly studentsLink: Locator;

  // Logistics
  private readonly logisticsDropdown: Locator;
  private readonly forecastLink: Locator;
  private readonly shipmentFailuresLink: Locator;
  private readonly materialCombinationsLink: Locator;

  // Finance
  private readonly financeDropdown: Locator;
  private readonly billingLink: Locator;
  private readonly proofOfPaymentsLink: Locator;

  // Programmes
  private readonly programmesDropdown: Locator;
  private readonly modulesLink: Locator;
  private readonly programmeManagementLink: Locator;
  private readonly deferralRequestsLink: Locator;
  private readonly departmentUnitsLink: Locator;
  private readonly plagirismscaleslink: Locator;

  // Assessments
  private readonly assessmentsDropdown: Locator;
  private readonly submissionsLink: Locator;

  // WIL
  private readonly wilDropdown: Locator;
  private readonly wilAssessorsLink: Locator;
  private readonly myPlacementsLink: Locator;
  private readonly placementsLink: Locator;
  private readonly schoolsLink: Locator;
  private readonly assessorClaimsLink: Locator;
  private readonly myClaimsLink: Locator;
  private readonly markersLink: Locator;

  // Marketing
  private readonly marketingDropdown: Locator;
  private readonly marketersLink: Locator;

  // Communications
  private readonly communicationsDropdown: Locator;
  private readonly messageSetupLink: Locator;

  // Account Settings
  private readonly accountSettingsDropdown: Locator;
  private readonly passwordResetLink: Locator;

  // Administration
  private readonly administrationDropdown: Locator;
  private readonly identityManagementDropdown: Locator;
  private readonly organizationUnitsLink: Locator;
  private readonly rolesLink: Locator;
  private readonly usersLink: Locator;
  private readonly claimTypesLink: Locator;
  private readonly securityLogsLink: Locator;

  // OpenId
  private readonly openIdDropdown: Locator;
  private readonly openIdApplicationsLink: Locator;
  private readonly scopesLink: Locator;

  // Language Management
  private readonly languageManagementDropdown: Locator;
  private readonly languagesLink: Locator;
  private readonly languageTextsLink: Locator;

  // System Settings
  private readonly userManagementLink: Locator;
  private readonly documentsLink: Locator;
  private readonly textTemplatesLink: Locator;
  private readonly auditLogsLink: Locator;
  private readonly settingsLink: Locator;
  private readonly semesterConfigLink: Locator;
  private readonly messageActivitiesLink: Locator;
  private readonly enquiriesLink: Locator;

  constructor(private page: Page) {
    // Initialize Personal Menu
    this.notificationCentreLink = page.getByRole("link", {
      name: "Notification Centre",
    });
    this.myInfoLink = page.getByRole("link", { name: "My Info" });
    this.myAccountLink = page.getByRole("link", { name: "My Account" });

    // Initialize Programme Menu
    this.myProgrammeDropdown = page
      .locator("app-navbar a")
      .filter({ hasText: "My Programme" });
    this.academicProgressLink = page.getByRole("link", {
      name: "Academic Progress",
    });
    this.enrolmentsLink = page.getByRole("link", { name: "Enrolments" });
    this.myModulesLink = page.getByRole("link", { name: "My Modules" });
    this.transcriptCodesLink = page.getByRole("link", {
      name: "Transcript Codes",
    });

    // Initialize Applications Menu
    this.applicationsDropdown = page
      .locator("a")
      .filter({ hasText: /^Applications$/ })
      .first();
    this.myApplicationsLink = page.getByRole("link", {
      name: "My Applications",
    });
    this.catApplicationsLink = page.getByRole("link", {
      name: "CAT Applications",
    });
    this.reviewersLink = page.getByRole("link", { name: "Reviewers" });
    this.studentsLink = page.getByRole("link", { name: "Students" });

    // Initialize Logistics Menu
    this.logisticsDropdown = page
      .locator("app-navbar a")
      .filter({ hasText: "Logistics" });
    this.forecastLink = page.getByRole("link", { name: "Forecast" });
    this.shipmentFailuresLink = page.getByRole("link", {
      name: "Shipment Failures",
    });
    this.materialCombinationsLink = page.getByRole("link", {
      name: "Material Combinations",
    });

    // Initialize Finance Menu
    this.financeDropdown = page
      .locator("app-navbar a")
      .filter({ hasText: "Finance" });
    this.billingLink = page.getByRole("link", { name: "Billing" });
    this.proofOfPaymentsLink = page.getByRole("link", {
      name: "Proof Of Payments",
    });

    // Initialize Programmes Menu
    this.programmesDropdown = page
      .locator("app-navbar a")
      .filter({ hasText: "Programmes" });
    this.modulesLink = page.getByRole("link", { name: "Modules" });
    this.programmeManagementLink = page.getByRole("link", {
      name: "Programme Management",
    });
    this.deferralRequestsLink = page.getByRole("link", {
      name: "Deferral Requests",
    });
    this.departmentUnitsLink = page.getByRole("link", {
      name: "Department Units",
    });
    this.plagirismscaleslink = page.getByRole("link", {
      name: "Plagiarism Scales",
    });

    // Initialize Assessments Menu
    this.assessmentsDropdown = page
      .locator("app-navbar a")
      .filter({ hasText: "Assessments" });
    this.submissionsLink = page.getByRole("link", { name: "Submissions" });

    // Initialize WIL Menu
    this.wilDropdown = page
      .locator("app-navbar a")
      .filter({ hasText: /^WIL$/ });
    this.wilAssessorsLink = page.getByRole("link", { name: "WIL Assessors" });
    this.myPlacementsLink = page.getByRole("link", { name: "My Placements" });
    this.placementsLink = page.getByRole("link", {
      name: "Placements",
      exact: true,
    });
    this.schoolsLink = page.getByRole("link", { name: "Schools" });
    this.assessorClaimsLink = page.getByRole("link", {
      name: "Assessor Claims",
    });
    this.myClaimsLink = page.getByRole("link", { name: "My Claims" });
    this.markersLink = page.getByRole("link", { name: "Markers" });

    // Initialize Marketing Menu
    this.marketingDropdown = page
      .locator("app-navbar a")
      .filter({ hasText: "Marketing" });
    this.marketersLink = page.getByRole("link", { name: "Marketers" });

    // Initialize Communications Menu
    this.communicationsDropdown = page
      .locator("app-navbar a")
      .filter({ hasText: "Communications" });
    this.messageSetupLink = page.getByRole("link", { name: "Message Setup" });

    // Initialize Account Settings Menu
    this.accountSettingsDropdown = page
      .locator("app-navbar a")
      .filter({ hasText: "Account Settings" });
    this.passwordResetLink = page.getByRole("link", { name: "Password Reset" });

    // Initialize Administration Menu
    this.administrationDropdown = page
      .locator("app-navbar a")
      .filter({ hasText: "Administration" });
    this.identityManagementDropdown = page
      .locator("app-navbar a")
      .filter({ hasText: "Identity Management" });
    this.organizationUnitsLink = page.getByRole("link", {
      name: "Organization Units",
    });
    this.rolesLink = page.getByRole("link", { name: "Roles" });
    this.usersLink = page.getByRole("link", { name: "Users" });
    this.claimTypesLink = page.getByRole("link", { name: "Claim Types" });
    this.securityLogsLink = page.getByRole("link", { name: "Security Logs" });

    // Initialize OpenId Menu
    this.openIdDropdown = page
      .locator("app-navbar a")
      .filter({ hasText: "OpenId" });
    this.openIdApplicationsLink = page.getByRole("link", {
      name: "Applications",
    });
    this.scopesLink = page.getByRole("link", { name: "Scopes" });

    // Initialize Language Management Menu
    this.languageManagementDropdown = page
      .locator("app-navbar a")
      .filter({ hasText: "Language Management" });
    this.languagesLink = page.getByRole("link", { name: "Languages" });
    this.languageTextsLink = page.getByRole("link", { name: "Language Texts" });

    // Initialize System Settings Menu
    this.userManagementLink = page.getByRole("link", {
      name: "User Management",
    });
    this.documentsLink = page.getByRole("link", { name: "Documents" });
    this.textTemplatesLink = page.getByRole("link", { name: "Text Templates" });
    this.auditLogsLink = page.getByRole("link", { name: "Audit Logs" });
    this.settingsLink = page.getByRole("link", { name: "Settings" });
    this.semesterConfigLink = page.getByRole("link", {
      name: "Semester Config",
    });
    this.messageActivitiesLink = page.getByRole("link", {
      name: "Message Activities",
    });
    this.enquiriesLink = page.getByRole("link", { name: "Enquiries" });
  }

  // Personal Menu Navigation
  async goToNotificationCentre() {
    await this.notificationCentreLink.click();
  }

  async goToMyInfo() {
    await this.myInfoLink.click();
  }

  async goToMyAccount() {
    await this.myAccountLink.click();
  }

  // Programme Menu Navigation
  async goToAcademicProgress() {
    await this.myProgrammeDropdown.click();
    await this.academicProgressLink.click();
  }

  async goToEnrolments() {
    await this.myProgrammeDropdown.click();
    await this.enrolmentsLink.click();
  }

  async goToMyModules() {
    await this.myProgrammeDropdown.click();
    await this.myModulesLink.click();
  }

  async goToTranscriptCodes() {
    await this.myProgrammeDropdown.click();
    await this.transcriptCodesLink.click();
  }

  // Applications Navigation
  async goToMyApplications() {
    await this.applicationsDropdown.click();
    await this.myApplicationsLink.click();
  }

  async goToCatApplications() {
    await this.applicationsDropdown.click();
    await this.catApplicationsLink.click();
  }

  async goToReviewers() {
    await this.applicationsDropdown.click();
    await this.reviewersLink.click();
  }

  async goToStudents() {
    await this.studentsLink.click();
  }

  // Logistics Navigation
  async goToForecast() {
    await this.logisticsDropdown.click();
    await this.forecastLink.click();
  }

  async goToShipmentFailures() {
    await this.logisticsDropdown.click();
    await this.shipmentFailuresLink.click();
  }

  async goToMaterialCombinations() {
    await this.logisticsDropdown.click();
    await this.materialCombinationsLink.click();
  }

  // Finance Navigation
  async goToBilling() {
    await this.financeDropdown.click();
    await this.billingLink.click();
  }

  async goToProofOfPayments() {
    await this.financeDropdown.click();
    await this.proofOfPaymentsLink.click();
  }

  // Programmes Navigation
  async goToModules() {
    await this.programmesDropdown.click();
    await this.modulesLink.click();
  }

  async goToProgrammeManagement() {
    await this.programmesDropdown.click();
    await this.programmeManagementLink.click();
  }

  async goToDeferralRequests() {
    await this.programmesDropdown.click();
    await this.deferralRequestsLink.click();
  }

  async goToDepartmentUnits() {
    await this.programmesDropdown.click();
    await this.departmentUnitsLink.click();
  }

  // Assessments Navigation
  async goToSubmissions() {
    await this.assessmentsDropdown.click();
    await this.submissionsLink.click();
  }

  // WIL Navigation
  async goToWilAssessors() {
    await this.wilDropdown.click();
    await this.wilAssessorsLink.click();
  }

  async goToMyPlacements() {
    await this.wilDropdown.click();
    await this.myPlacementsLink.click();
  }

  async goToPlacements() {
    await this.wilDropdown.click();
    await this.placementsLink.click();
  }

  async goToSchools() {
    await this.wilDropdown.click();
    await this.schoolsLink.click();
  }

  async goToAssessorClaims() {
    await this.wilDropdown.click();
    await this.assessorClaimsLink.click();
  }

  async goToMyClaims() {
    await this.wilDropdown.click();
    await this.myClaimsLink.click();
  }

  async goToMarkers() {
    await this.wilDropdown.click();
    await this.markersLink.click();
  }

  // Marketing Navigation
  async goToMarketers() {
    await this.marketingDropdown.click();
    await this.marketersLink.click();
  }

  // Communications Navigation
  async goToMessageSetup() {
    await this.communicationsDropdown.click();
    await this.messageSetupLink.click();
  }

  // Account Settings Navigation
  async goToPasswordReset() {
    await this.accountSettingsDropdown.click();
    await this.passwordResetLink.click();
  }

  // Administration Navigation
  async goToOrganizationUnits() {
    await this.administrationDropdown.click();
    await this.identityManagementDropdown.click();
    await this.organizationUnitsLink.click();
  }

  async goToRoles() {
    await this.administrationDropdown.click();
    await this.identityManagementDropdown.click();
    await this.rolesLink.click();
  }

  async goToUsers() {
    await this.administrationDropdown.click();
    await this.identityManagementDropdown.click();
    await this.usersLink.click();
  }

  async goToClaimTypes() {
    await this.administrationDropdown.click();
    await this.identityManagementDropdown.click();
    await this.claimTypesLink.click();
  }

  async goToSecurityLogs() {
    await this.administrationDropdown.click();
    await this.identityManagementDropdown.click();
    await this.securityLogsLink.click();
  }

  // OpenId Navigation
  async goToOpenIdApplications() {
    await this.openIdDropdown.click();
    await this.openIdApplicationsLink.click();
  }

  async goToScopes() {
    await this.openIdDropdown.click();
    await this.scopesLink.click();
  }

  // Language Management Navigation
  async goToLanguages() {
    await this.languageManagementDropdown.click();
    await this.languagesLink.click();
  }

  async goToLanguageTexts() {
    await this.languageManagementDropdown.click();
    await this.languageTextsLink.click();
  }

  // System Settings Navigation
  async goToUserManagement() {
    await this.userManagementLink.click();
  }

  async goToDocuments() {
    await this.documentsLink.click();
  }

  async goToTextTemplates() {
    await this.textTemplatesLink.click();
  }

  async goToAuditLogs() {
    await this.auditLogsLink.click();
  }

  async goToSettings() {
    await this.settingsLink.click();
  }

  async goToSemesterConfig() {
    await this.administrationDropdown.click();
    await this.semesterConfigLink.click();
  }

  async goToMessageActivities() {
    await this.messageActivitiesLink.click();
  }

  async goToEnquiries() {
    await this.enquiriesLink.click();
  }
  async goToPlagiarismScales() {
    await this.programmesDropdown.click();
    await this.plagirismscaleslink.click();
  }
}
