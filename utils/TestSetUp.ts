import { test as baseTest, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MyInfoPage } from '../pages/MyInfoPage'; 

export { expect };

export const test = baseTest.extend<{
  loginPage: LoginPage;
  myInfoPage: MyInfoPage; 
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  myInfoPage: async ({ page }, use) => {
    await use(new MyInfoPage(page));
  },
});