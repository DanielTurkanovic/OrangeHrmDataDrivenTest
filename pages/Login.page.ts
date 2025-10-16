import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly dashboardHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[name="username"]');
    this.passwordInput = page.locator('[name="password"]');
    this.submitButton = page.locator('[type="submit"]');
    this.dashboardHeader = page.locator('h6:has-text("Dashboard")');
  }

  async login(username: string, password: string) {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/?lang=en');
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
    await this.dashboardHeader.waitFor({ state: 'visible' });
  }
}
