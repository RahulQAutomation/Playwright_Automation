import { BasePage } from './BasePage';
import { Page } from '@playwright/test';

export class CheckoutPage extends BasePage {
  // Locators
  readonly countryInput = '[placeholder="Select Country"]';
  readonly countryDropdown = 'section.ta-results';
  readonly countryOption = (country: string) => `button.ta-item:has-text("${country}")`;
  readonly placeOrderButton = 'a:has-text("Place Order")';
  readonly emailDisplay = '*:has-text("Email")';
  readonly userEmail = '.user__name';

  constructor(page: Page) {
    super(page);
  }

  async getCheckoutPage() {
    await this.waitForElement(this.countryInput);
  }

  async selectCountry(country: string, typeDelay: number = 200) {
    await this.click(this.countryInput);
    await this.fill(this.countryInput, '');
    
    // Type first 3 characters
    const input = await this.getLocator(this.countryInput);
    await input.pressSequentially(country.slice(0, 3), { delay: typeDelay });

    // Wait for dropdown
    await this.waitForElement(this.countryDropdown);

    // Select option
    const option = await this.getLocator(this.countryOption(country));
    await option.first().waitFor({ state: 'visible', timeout: 10000 });
    await option.first().click({ force: true });

    // Verify selection
    await this.waitForTimeout(500);
  }

  async placeOrder() {
    await this.click(this.placeOrderButton);
    await this.waitForTimeout(500);
  }

  async getUserEmail(): Promise<string | null> {
    return await this.getText(this.emailDisplay);
  }

  async isCountrySelected(country: string): Promise<boolean> {
    const countryInput = await this.getLocator(this.countryInput);
    const value = await countryInput.inputValue().catch(() => '');
    return value.includes(country);
  }
}
