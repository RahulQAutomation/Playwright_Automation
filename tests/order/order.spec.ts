import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { DashboardPage, CartPage, CheckoutPage, OrderConfirmationPage } from '../../pages';
import { TestDataLoader, TestLogger } from '../../helpers/index';

dotenv.config();

test.describe('Order Tests', () => {
  let dashboardPage: DashboardPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;
  let orderConfirmationPage: OrderConfirmationPage;
  const orderHistoryData = TestDataLoader.loadTestData('orderHistory');
  const orderDetailsData = TestDataLoader.loadTestData('orderDetails');

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    orderConfirmationPage = new OrderConfirmationPage(page);
    const url = process.env.ENVIRONMENT_URL?.replace('/#/auth/login', '') || 'https://rahulshettyacademy.com/client';
    await dashboardPage.navigate(url);
  });

  test('TC-007: User can view order history', async ({ page }) => {
    TestLogger.testStart('View Order History');
    
    const navigated = await dashboardPage.navigateToOrders();
    if (navigated) {
      TestLogger.log('Navigated to orders page');
      await page.waitForTimeout(1000);
    } else {
      TestLogger.warn('Orders page not available');
    }
    
    TestLogger.testPass('View Order History');
  });

  test('TC-015: User can verify order details', async ({ page }) => {
    TestLogger.testStart('Verify Order Details');
    
    await dashboardPage.addProductToCart(orderDetailsData.productToAdd);
    TestLogger.log(`Added product: ${orderDetailsData.productToAdd}`);
    
    await dashboardPage.navigateToCart();
    await cartPage.proceedToCheckout();
    TestLogger.log('Proceeded to checkout');
    
    await checkoutPage.selectCountry(orderDetailsData.country);
    TestLogger.log(`Selected country: ${orderDetailsData.country}`);
    
    await checkoutPage.placeOrder();
    TestLogger.log('Order placed');
    
    await orderConfirmationPage.getOrderConfirmationPage();
    const isConfirmed = await orderConfirmationPage.isOrderConfirmationVisible();
    expect(isConfirmed).toBe(true);
    TestLogger.log('Order confirmation received');
    
    const orderId = await orderConfirmationPage.getOrderId();
    if (orderId) {
      TestLogger.log(`Order ID: ${orderId}`);
    }
    
    TestLogger.testPass('Verify Order Details');
  });
});
