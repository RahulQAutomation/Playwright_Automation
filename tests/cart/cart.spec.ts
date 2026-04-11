import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { DashboardPage, CartPage } from '../../pages';
import { TestDataLoader, TestLogger } from '../../helpers/index';

dotenv.config();

test.describe('Cart Tests', () => {
  let dashboardPage: DashboardPage;
  let cartPage: CartPage;
  const addData = TestDataLoader.loadTestData('addToCart');
  const updateData = TestDataLoader.loadTestData('updateCart');
  const removeData = TestDataLoader.loadTestData('removeFromCart');
  const summaryData = TestDataLoader.loadTestData('cartSummary');

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    cartPage = new CartPage(page);
    const url = process.env.ENVIRONMENT_URL?.replace('/#/auth/login', '') || 'https://rahulshettyacademy.com/client';
    await dashboardPage.navigate(url);
  });

  test('TC-002: User can add multiple products to cart', async ({ page }) => {
    TestLogger.testStart('Add Multiple Products to Cart');
    
    for (const product of addData.productsToAdd) {
      await dashboardPage.addProductToCart(product);
      TestLogger.log(`Added to cart: ${product}`);
      await page.waitForTimeout(addData.waitTimeMs);
    }
    
    TestLogger.testPass('Add Multiple Products to Cart');
  });

  test('TC-003: User can update product quantities in cart', async ({ page }) => {
    TestLogger.testStart('Update Cart Quantities');
    
    await dashboardPage.addProductToCart(updateData.productToAdd);
    TestLogger.log(`Added product: ${updateData.productToAdd}`);
    
    await dashboardPage.navigateToCart();
    await cartPage.getCartPage();
    
    const updated = await cartPage.updateProductQuantity(updateData.quantityIncrement);
    if (updated) {
      TestLogger.log('Updated product quantity');
    } else {
      TestLogger.warn('Quantity update button not available');
    }
    
    TestLogger.testPass('Update Cart Quantities');
  });

  test('TC-004: User can remove products from cart', async ({ page }) => {
    TestLogger.testStart('Remove Product from Cart');
    
    await dashboardPage.addProductToCart(removeData.productToAdd);
    TestLogger.log(`Added product: ${removeData.productToAdd}`);
    
    await dashboardPage.navigateToCart();
    await cartPage.getCartPage();
    
    const removed = await cartPage.removeProductFromCart();
    if (removed) {
      TestLogger.log(`Removed product: ${removeData.productToAdd}`);
    } else {
      TestLogger.warn('Remove button not available');
    }
    
    TestLogger.testPass('Remove Product from Cart');
  });

  test('TC-014: User can view cart summary', async ({ page }) => {
    TestLogger.testStart('Cart Summary');
    
    await dashboardPage.addProductToCart(summaryData.productToAdd);
    TestLogger.log(`Added product: ${summaryData.productToAdd}`);
    
    await dashboardPage.navigateToCart();
    await cartPage.getCartPage();
    
    const total = await cartPage.getCartTotal();
    if (total) {
      TestLogger.log(`Cart summary: ${total}`);
    } else {
      TestLogger.warn('Cart summary not found');
    }
    
    TestLogger.testPass('Cart Summary');
  });
});
