import { test as baseTest, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

export { expect };

// Define a custom test fixture that includes the LoginPage
export const test = baseTest.extend<{
  loginPage: LoginPage;
}>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});