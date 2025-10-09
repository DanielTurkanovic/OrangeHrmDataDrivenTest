import { test, expect } from '../utils/TestSetUp';

test('Check Dashboard after login', async ({ page }) => {
  await expect(page.locator('img[alt="client brand banner"]')).toBeVisible();
});

