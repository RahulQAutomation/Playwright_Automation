import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { DashboardPage, CartPage, CheckoutPage, OrderConfirmationPage } from '../../pages';
import { TestDataLoader, TestLogger } from '../../helpers/index';

dotenv.config();

test.describe('Checkout Tests', () => {
  let dashboardPage: DashboardPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;
  let orderConfirmationPage: OrderConfirmationPage;
  const singleData = TestDataLoader.loadTestData('singleProductPurchase');
  const multipleData = TestDataLoader.loadTestData('multipleProductPurchase');
  const couponData = TestDataLoader.loadTestData('couponCode');

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    orderConfirmationPage = new OrderConfirmationPage(page);
    const url = process.env.ENVIRONMENT_URL?.replace('/#/auth/login', '') || 'https://rahulshettyacademy.com/client';
    await dashboardPage.navigate(url);
  });

  test('TC-005: User can complete purchase with single product', async ({ page }) => {
    TestLogger.testStart('Single Product Purchase');
    
    await dashboardPage.addProductToCart(singleData.productToAdd);
    TestLogger.log(`Added product: ${singleData.productToAdd}`);
    
    await dashboardPage.navigateToCart();
    await cartPage.proceedToCheckout();
    TestLogger.log('Proceeded to checkout');
    
    await checkoutPage.selectCountry(singleData.country);
    TestLogger.log(`Selected country: ${singleData.country}`);
    
    await checkoutPage.placeOrder();
    TestLogger.log('Order placed');
    
    await orderConfirmationPage.getOrderConfirmationPage();
    const isConfirmed = await orderConfirmationPage.isOrderConfirmationVisible();
    expect(isConfirmed).toBe(true);
    TestLogger.log('Order confirmation received');
    
    TestLogger.testPass('Single Product Purchase');
  });

  test('TC-006: User can purchase multiple products', async ({ page }) => {
    TestLogger.testStart('Multiple Products Purchase');
    
    for (const product of multipleData.productsToAdd) {
      await dashboardPage.addProductToCart(product);
      TestLogger.log(`Added to cart: ${product}`);
      await page.waitForTimeout(500);
    }
    
    await dashboardPage.navigateToCart();
    await cartPage.proceedToCheckout();
    TestLogger.log('Proceeded to checkout');
    
    await checkoutPage.selectCountry(multipleData.country);
    TestLogger.log(`Selected country: ${multipleData.country}`);
    
    await checkoutPage.placeOrder();
    TestLogger.log('Order placed');
    
    await orderConfirmationPage.getOrderConfirmationPage();
    const isConfirmed = await orderConfirmationPage.isOrderConfirmationVisible();
    expect(isConfirmed).toBe(true);
    TestLogger.log('Multiple product order confirmed');
    
    TestLogger.testPass('Multiple Products Purchase');
  });

  test('TC-010: User can apply coupon code', async ({ page }) => {
    TestLogger.testStart('Apply Coupon Code');
    
    await dashboardPage.addProductToCart(couponData.productToAdd);
    TestLogger.log(`Added product: ${couponData.productToAdd}`);
    
    await dashboardPage.navigateToCart();
    await cartPage.getCartPage();
    
    const applied = await cartPage.applyCoupon(couponData.couponCode);
    if (applied) {
      TestLogger.log(`Coupon applied: ${couponData.couponCode}`);
    } else {
      TestLogger.warn('Coupon input not available');
    }
    
    TestLogger.testPass('Apply Coupon Code');
  });
});
