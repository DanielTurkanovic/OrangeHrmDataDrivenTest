import { test, expect } from '../utils/TestSetUp';
import { getExcelData } from '../utils/excelReader'; 

interface LoginData {
  username: string;
  password: string;
  expectedResult: string;
}

const excelData = getExcelData<LoginData>('loginSheet.xlsx', 'Sheet1');

for (const data of excelData) {
  test(`Login Test for: ${data.username}`, async ({ loginPage, page }) => {
    
    await loginPage.login(data.username, data.password);

    if (data.expectedResult === 'dashboard') {
      // Positivan scenario (dashboard)
      await expect(page.locator('img[alt="client brand banner"]')).toBeVisible();
      await expect(loginPage.dashboardHeader).toBeVisible();
      await expect(page).toHaveURL(/dashboard/);
    } else {
      // Negativan scenario (error message)
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toHaveText(data.expectedResult);
    }
  });
}