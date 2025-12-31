import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  timeout: 230000,
  expect: {
    timeout: 200000,
  },
  testDir: "./automation/tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 0 : 0,
  workers: process.env.CI ? 1 : 1,
  reporter: [["list"], ["allure-playwright"]],
  use: {
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "DEV - Chrome",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://app-sants-web-dev.azurewebsites.net",
      },
    },
    {
      name: "UAT - Chrome",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://app-sants-web-uat.azurewebsites.net",
      },
    },
    {
      name: "PROD - Chrome",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://mysants.sants.co.za/",
      },
      testMatch: [
        "**/sitedefault/AdminLogin.spec.ts",
        "**/sitedefault/CookiePolicyPage.spec.ts",
        "**/sitedefault/Footer.spec.ts",
      ],
    },
    {
      name: "STG - Chrome",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://app-sants-web-stg.azurewebsites.net",
      },
    },
  ],
});
