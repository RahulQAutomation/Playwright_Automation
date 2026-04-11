import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string) {
    await this.page.goto(url);
  }

  async click(selector: string) {
    await this.page.locator(selector).click();
  }

  async fill(selector: string, value: string) {
    await this.page.locator(selector).fill(value);
  }

  async getText(selector: string): Promise<string | null> {
    return await this.page.locator(selector).textContent();
  }

  async isVisible(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isVisible();
  }

  async waitForElement(selector: string, timeout: number = 5000) {
    await this.page.locator(selector).waitFor({ state: 'visible', timeout });
  }

  async waitForTimeout(ms: number) {
    await this.page.waitForTimeout(ms);
  }

  async getLocator(selector: string): Promise<Locator> {
    return this.page.locator(selector);
  }
}
