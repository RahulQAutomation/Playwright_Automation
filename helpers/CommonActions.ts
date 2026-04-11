import { Page } from '@playwright/test';

export class CommonActions {
  static async navigateTo(page: Page, url: string) {
    await page.goto(url);
    await page.waitForLoadState('domcontentloaded');
  }

  static async waitForElement(page: Page, selector: string, timeout: number = 5000) {
    await page.locator(selector).waitFor({ state: 'visible', timeout });
  }

  static async verifyElementVisibility(page: Page, selector: string): Promise<boolean> {
    try {
      return await page.locator(selector).isVisible({ timeout: 3000 });
    } catch {
      return false;
    }
  }

  static async getElementText(page: Page, selector: string): Promise<string | null> {
    return await page.locator(selector).textContent();
  }

  static async fillInput(page: Page, selector: string, text: string) {
    await page.locator(selector).fill(text);
  }

  static async clickElement(page: Page, selector: string) {
    await page.locator(selector).click();
  }

  static async waitForNavigation(page: Page) {
    await page.waitForLoadState('domcontentloaded');
  }

  static async takeScreenshot(page: Page, fileName: string) {
    const screenshotPath = `./screenshots/${fileName}.png`;
    await page.screenshot({ path: screenshotPath });
  }

  static async retryAction(
    action: () => Promise<any>,
    retries: number = 3,
    delay: number = 1000
  ): Promise<any> {
    for (let i = 0; i < retries; i++) {
      try {
        return await action();
      } catch (error) {
        if (i === retries - 1) throw error;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
}
