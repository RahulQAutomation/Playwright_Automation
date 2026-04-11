import { BasePage } from './BasePage';
import { Page } from '@playwright/test';

export class CartPage extends BasePage {
  // Locators
  readonly productInCart = (productName: string) => `h3:has-text("${productName}")`;
  readonly checkoutButton = 'button:has-text("Checkout")';
  readonly deleteButton = 'button[class*="delete"]';
  readonly incrementButton = 'div.cart-item-qty-container button:has-text("+")';
  readonly decrementButton = 'div.cart-item-qty-container button:has-text("-")';
  readonly couponInput = 'input[placeholder*="Coupon"]';
  readonly applyButton = 'button:has-text("Apply")';
  readonly totalElement = 'div:has-text("Total Amount")';
  readonly emptyCartMessage = 'text="No Products in your cart"';

  constructor(page: Page) {
    super(page);
  }

  async getCartPage() {
    await this.waitForTimeout(500);
  }

  async isProductInCart(productName: string): Promise<boolean> {
    const locator = this.productInCart(productName);
    return await this.page.locator(locator).isVisible({ timeout: 3000 }).catch(() => false);
  }

  async removeProductFromCart() {
    if (await this.isVisible(this.deleteButton)) {
      await this.click(this.deleteButton);
      await this.waitForTimeout(500);
      return true;
    }
    return false;
  }

  async updateProductQuantity(increment: boolean = true) {
    const button = increment ? this.incrementButton : this.decrementButton;
    if (await this.isVisible(button)) {
      await this.click(button);
      await this.waitForTimeout(500);
      return true;
    }
    return false;
  }

  async proceedToCheckout() {
    await this.click(this.checkoutButton);
    await this.waitForTimeout(500);
  }

  async applyCoupon(couponCode: string) {
    if (await this.isVisible(this.couponInput)) {
      await this.fill(this.couponInput, couponCode);
      if (await this.isVisible(this.applyButton)) {
        await this.click(this.applyButton);
        await this.waitForTimeout(500);
        return true;
      }
    }
    return false;
  }

  async getCartTotal(): Promise<string | null> {
    if (await this.isVisible(this.totalElement)) {
      return await this.getText(this.totalElement);
    }
    return null;
  }

  async isEmptyCartVisible(): Promise<boolean> {
    return await this.isVisible(this.emptyCartMessage).catch(() => false);
  }
}
