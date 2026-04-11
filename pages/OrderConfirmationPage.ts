import { BasePage } from './BasePage';
import { Page } from '@playwright/test';

export class OrderConfirmationPage extends BasePage {
  // Locators
  readonly orderConfirmationMessage = '.hero-primary';
  readonly orderIdLabel = '.order-summary label:has-text("Order Id")';
  readonly productInOrder = (productName: string) =>
    `td.line-item.product-info-column.m-3:has-text("${productName}")`;
  readonly ordersPageContainer = '.order-history';
  readonly orderItems = '.order-item';
  readonly viewOrderButton = 'button:has-text("View")';

  constructor(page: Page) {
    super(page);
  }

  async getOrderConfirmationPage() {
    await this.waitForElement(this.orderConfirmationMessage);
  }

  async isOrderConfirmationVisible(): Promise<boolean> {
    return await this.isVisible(this.orderConfirmationMessage);
  }

  async getOrderConfirmationMessage(): Promise<string | null> {
    return await this.getText(this.orderConfirmationMessage);
  }

  async isProductInOrder(productName: string): Promise<boolean> {
    const locator = this.productInOrder(productName);
    return await this.page.locator(locator).isVisible({ timeout: 3000 }).catch(() => false);
  }

  async getOrderId(): Promise<string | null> {
    if (await this.isVisible(this.orderIdLabel)) {
      return await this.getText(this.orderIdLabel);
    }
    return null;
  }

  async getOrderItemCount(): Promise<number> {
    return await this.page.locator(this.orderItems).count();
  }

  async isOrdersPageLoaded(): Promise<boolean> {
    return await this.isVisible(this.ordersPageContainer).catch(() => false);
  }

  async viewOrderDetails() {
    if (await this.isVisible(this.viewOrderButton)) {
      await this.click(this.viewOrderButton);
      await this.waitForTimeout(500);
      return true;
    }
    return false;
  }
}
