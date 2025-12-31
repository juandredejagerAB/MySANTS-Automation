import {
  test as base,
  expect as baseExpect,
  BrowserContext,
  Page,
} from "@playwright/test";
import { LoginPage } from "../pages/portal/LoginPage.ts";
import { environmentSecrets } from "../../../config.ts";
import { inferEnv } from "../../utils/inferEnv.ts";

type Env = keyof typeof environmentSecrets;

export const test = base.extend<{
  env: Env;
  context: BrowserContext;
  page: Page;
  admin: { username: string; password: string };
  notranscriptStudent: { username: string; password: string };
  willStudent: { username: string; password: string };
  marker: { username: string; password: string };
  assessor: { username: string; password: string };
  acceptCookies: boolean;
}>({
  acceptCookies: [true, { option: true }],
  env: async ({}, use, testInfo) => {
    const inferredEnv = inferEnv(testInfo.project.name);
    await use(inferredEnv);
  },

  context: async ({ browser }, use) => {
    const context = await browser.newContext({
      permissions: [],
      geolocation: { latitude: 0, longitude: 0 },
    });
    await use(context);
    await context.close();
  },

  page: async ({ context }, use) => {
    const page = await context.newPage();
    await use(page);
  },

  admin: async ({ page, env, acceptCookies }, use) => {
    const creds = environmentSecrets[env];
    const login = new LoginPage(page, acceptCookies);
    await login.loginAs(creds.adminUsername, creds.adminPassword);
    await use({ username: creds.adminUsername, password: creds.adminPassword });
  },

  notranscriptStudent: async ({ page, env, acceptCookies }, use) => {
    const creds = environmentSecrets[env];
    const login = new LoginPage(page, acceptCookies); // pass the flag
    await login.loginAs(creds.notranscriptStudent, creds.adminPassword);
    await use({
      username: creds.notranscriptStudent,
      password: creds.adminPassword,
    });
  },

  willStudent: async ({ page, env, acceptCookies }, use) => {
    const creds = environmentSecrets[env];
    const login = new LoginPage(page, acceptCookies); // pass the flag
    await login.loginAs(creds.willStudent, creds.adminPassword); // passsword01
    await use({
      username: creds.willStudent,
      password: creds.adminPassword,
    });
  },

  marker: async ({ page, env, acceptCookies }, use) => {
    const creds = environmentSecrets[env];
    const login = new LoginPage(page, acceptCookies); // pass the flag
    await login.loginAs(creds.markerUser, creds.adminPassword);
    await use({
      username: creds.markerUser,
      password: creds.adminPassword,
    });
  },

  assessor: async ({ page, env, acceptCookies }, use) => {
    const creds = environmentSecrets[env];
    const login = new LoginPage(page, acceptCookies); // pass the flag
    await login.loginAs(creds.assessorUser, creds.adminPassword);
    await use({
      username: creds.assessorUser,
      password: creds.adminPassword,
    });
  },
});

export const expect = baseExpect;
