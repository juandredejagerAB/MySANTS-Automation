import { test, expect } from "../../fixtures/authFixture";

test.use({ acceptCookies: false });
test("Cookie Policy Page", async ({ page, admin }, testInfo) => {
  await page.getByRole("link", { name: "Cookie Policy" }).click();
  await page.waitForTimeout(5000);
  await page.getByRole("button", { name: "Accept" }).click();
  await expect(page.locator("h1")).toContainText("Cookie Policy");
  await expect(page.locator("abp-cookie-policy")).toContainText(
    'This cookie policy explains how cookies and similar technologies are used by MySANTS ("we", "our", or "us") on our websites and other online services, including applications, portals, or other services that use cookies.'
  );
  await expect(page.locator("abp-cookie-policy")).toContainText(
    "What are cookies and why do we use them?"
  );
  await expect(page.locator("abp-cookie-policy")).toContainText(
    "Cookies are small text files stored in your browser’s memory by our websites. They are commonly used to support various functions on our websites."
  );
  await expect(page.locator("abp-cookie-policy")).toContainText(
    "Cookies perform useful tasks, such as telling us which pages you visited the most, understanding how effective our website has been to you, and improving our communication with you about our products and services."
  );
  await expect(page.locator("abp-cookie-policy")).toContainText(
    "We do not use cookies to collect information that directly identifies you as an individual. However, some information collected by cookies may be treated as personal data (such as your browsing history or your device information)."
  );
  await expect(page.locator("abp-cookie-policy")).toContainText(
    "Types of Cookies We Use"
  );
  await expect(page.locator("abp-cookie-policy")).toContainText(
    "Depending on the purpose of the cookie, it may be a session or persistent cookie:"
  );
  await expect(page.getByRole("list")).toContainText(
    "Persistent Cookies: These are retained on your device until you either erase them or your browser erases them when the cookie reaches its expiration date."
  );
  await expect(page.getByRole("list")).toContainText(
    "Session Cookies: These are temporary and expire once you close your browser or once your session ends."
  );
  await expect(page.locator("abp-cookie-policy")).toContainText(
    "What type of cookies do we use?"
  );
  await expect(page.locator("abp-cookie-policy")).toContainText(
    'We only use "Strictly Necessary" cookies on our website to improve user experience. These cookies are required for our websites to function effectively.'
  );
});
