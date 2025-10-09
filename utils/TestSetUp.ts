import { test as baseTest, expect } from '@playwright/test';
import { getExcelData, User } from './excelReader';

export { expect };

// Read users from Excel file
const users = getExcelData<User>('loginSheet.xlsx', 'Sheet1');
const { username, password } = users[0];

console.log("Loaded users from Excel:", users);

export const test = baseTest.extend({
  page: async ({ browser }, use) => {
    console.log("Launching browser...");

    const page = await browser.newPage();
    console.log("New tab created");

    // Define locators
    const usernameInput = page.locator('[name="username"]');
    const passwordInput = page.locator('[name="password"]');
    const submitButton = page.locator('[type="submit"]');
    const dashboardHeader = page.locator('h6:has-text("Dashboard")');

    // Method to perform login
    async function login(user: string, pass: string) {
      console.log(`Trying to login with user: ${user}`);
      await page.goto('https://opensource-demo.orangehrmlive.com/?lang=en');

      await usernameInput.fill(user);
      console.log("Username filled");

      await passwordInput.fill(pass);
      console.log("Password filled");

      await submitButton.click();
      console.log("Submit button clicked");

      await dashboardHeader.waitFor({ state: 'visible' });
      console.log("Login successful, Dashboard visible");
    }

    // Execute login 
    await login(username, password);

    // Use page in tests
    await use(page);

    // Close page after tests
    console.log("Closing the page...");
    await page.close();
  },
});
