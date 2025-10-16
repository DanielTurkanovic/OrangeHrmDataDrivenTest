import { test as baseTest, expect } from '@playwright/test';
import { getExcelData, User } from './excelReader';
import { LoginPage } from '../pages/Login.page';

export { expect };

const users = getExcelData<User>('loginSheet.xlsx', 'Sheet1');
const { username, password } = users[0];

export const test = baseTest.extend<{
  loginPage: LoginPage;
}>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    
    // Using user from Excel data
    await loginPage.login(username, password);
    
    await use(loginPage);
  },
});