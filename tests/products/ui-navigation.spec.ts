import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { DashboardPage } from '../../pages';
import { TestDataLoader, TestLogger } from '../../helpers/index';

dotenv.config();

test.describe('UI and Navigation Tests', () => {
  let dashboardPage: DashboardPage;
  const navigationData = TestDataLoader.loadTestData('dashboardNavigation');
  const responsiveData = TestDataLoader.loadTestData('responsiveUI');

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    const url = process.env.ENVIRONMENT_URL?.replace('/#/auth/login', '') || 'https://rahulshettyacademy.com/client';
    await dashboardPage.navigate(url);
  });

  test('TC-012: User can navigate dashboard sections', async ({ page }) => {
    TestLogger.testStart('Dashboard Navigation');
    
    await dashboardPage.navigateToProducts();
    TestLogger.log('Navigated to Products');
    
    await dashboardPage.navigateToDashboard();
    TestLogger.log('Navigated back to Dashboard');
    
    const cardCount = await dashboardPage.getProductCount();
    expect(cardCount).toBeGreaterThan(0);
    TestLogger.log(`Dashboard loaded with ${cardCount} products`);
    
    TestLogger.testPass('Dashboard Navigation');
  });

  test('TC-013: Verify responsive UI elements', async ({ page }) => {
    TestLogger.testStart('Responsive UI Elements');
    
    const isCartIconVisible = await dashboardPage.isCartIconVisible();
    expect(isCartIconVisible).toBe(true);
    TestLogger.log('Cart icon visible');
    
    const cardCount = await dashboardPage.getProductCount();
    expect(cardCount).toBeGreaterThan(0);
    TestLogger.log(`Product cards visible: ${cardCount}`);
    
    const isDashboardHeadingVisible = await dashboardPage.isDashboardHeadingVisible();
    expect(isDashboardHeadingVisible).toBe(true);
    TestLogger.log('Dashboard heading visible');
    
    TestLogger.testPass('Responsive UI Elements');
  });
});
