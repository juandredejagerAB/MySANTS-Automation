import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  timeout: 130000,
  expect: {
    timeout: 100000,
  },
  testDir: "./automation/tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 2,
  reporter: [["list"], ["allure-playwright"]],
  use: {
    trace: "on-first-retry",
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
