import { test, expect } from '../utils/TestSetUp';

test('Check Dashboard after login', async ({ loginPage, page }) => {
  await expect(page.locator('img[alt="client brand banner"]')).toBeVisible();
  await expect(loginPage.dashboardHeader).toBeVisible();
});



