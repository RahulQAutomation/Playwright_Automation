import { BasePage } from './BasePage';
import { Page } from '@playwright/test';

export class LoginPage extends BasePage {
  // Locators
  readonly emailInput = 'input[placeholder="email@example.com"]';
  readonly passwordInput = 'input[placeholder="enter your passsword"]';
  readonly loginButton = "//*[@id='login']";
  readonly dashboardHeading = 'text="Automation Practice"';

  constructor(page: Page) {
    super(page);
  }

  async login(email: string, password: string) {
    await this.fill(this.emailInput, email);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async isLoginPageVisible(): Promise<boolean> {
    return await this.isVisible(this.emailInput);
  }

  async isDashboardVisible(): Promise<boolean> {
    return await this.isVisible(this.dashboardHeading);
  }
}
