import { BasePage } from './BasePage';
import { Page } from '@playwright/test';

export class DashboardPage extends BasePage {
  // Locators
  readonly cartIcon = '[routerlink="/dashboard/cart"]';
  readonly productCards = '.card-body';
  readonly productName = '.card-body b';
  readonly addToCartButton = 'button:has-text("Add To Cart")';
  readonly searchInput = 'input[placeholder*="Search"]';
  readonly ordersLink = '[routerlink="/dashboard/myorders"]';
  readonly productsLink = '[routerlink="/dashboard/products"]';
  readonly dashboardLink = '[routerlink="/dashboard"]';
  readonly signOutButton = 'button:has-text("Sign Out")';
  readonly dashboardHeading = 'text="Automation Practice"';

  constructor(page: Page) {
    super(page);
  }

  async getDashboard() {
    await this.page.locator(this.productCards).first().waitFor({ state: 'visible' });
  }

  async getAllProductNames(): Promise<string[]> {
    await this.page.locator(this.productName).first().waitFor({ state: 'visible' });
    return await this.page.locator(this.productName).allTextContents();
  }

  async getProductCount(): Promise<number> {
    return await this.page.locator(this.productCards).count();
  }

  async addProductToCart(productName: string) {
    const productCard = this.page.locator(this.productCards).filter({
      has: this.page.locator(`b:has-text("${productName}")`),
    });
    await productCard.waitFor();
    await productCard.locator(this.addToCartButton).click();
  }

  async navigateToCart() {
    await this.click(this.cartIcon);
    await this.waitForTimeout(500);
  }

  async navigateToOrders() {
    if (await this.isVisible(this.ordersLink)) {
      await this.click(this.ordersLink);
      await this.waitForTimeout(1000);
      return true;
    }
    return false;
  }

  async navigateToDashboard() {
    if (await this.isVisible(this.dashboardLink)) {
      await this.click(this.dashboardLink);
      await this.waitForTimeout(500);
    }
  }

  async navigateToProducts() {
    if (await this.isVisible(this.productsLink)) {
      await this.click(this.productsLink);
      await this.waitForTimeout(500);
    }
  }

  async logout() {
    if (await this.isVisible(this.signOutButton)) {
      await this.click(this.signOutButton);
      await this.page.waitForLoadState('domcontentloaded');
      return true;
    }
    return false;
  }

  async isDashboardHeadingVisible(): Promise<boolean> {
    return await this.isVisible(this.dashboardHeading);
  }

  async isCartIconVisible(): Promise<boolean> {
    return await this.isVisible(this.cartIcon);
  }
}
