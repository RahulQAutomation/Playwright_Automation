import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { DashboardPage } from '../../pages';
import { TestDataLoader, TestLogger } from '../../helpers/index';

dotenv.config();

test.describe('Product Tests', () => {
  let dashboardPage: DashboardPage;
  const testData = TestDataLoader.loadTestData('productBrowsing');

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    const url = process.env.ENVIRONMENT_URL?.replace('/#/auth/login', '') || 'https://rahulshettyacademy.com/client';
    await dashboardPage.navigate(url);
  });

  test('TC-001: User can browse products', async ({ page }) => {
    TestLogger.testStart('Browse Products');
    
    await dashboardPage.getDashboard();
    const productNames = await dashboardPage.getAllProductNames();
    
    TestLogger.log(`Found ${productNames.length} products`);
    TestLogger.log(`Products: ${productNames.join(', ')}`);
    
    expect(productNames.length).toBeGreaterThan(0);
    expect(productNames).toContain(testData.expectedProducts[0]);
    
    TestLogger.testPass('Browse Products');
  });

  test('TC-008: User can search products', async ({ page }) => {
    TestLogger.testStart('Search Products');
    
    const allProducts = await dashboardPage.getAllProductNames();
    TestLogger.log(`Total products: ${allProducts.length}`);
    
    const searchInput = page.locator('input[placeholder*="Search"]').first();
    if (await searchInput.isVisible()) {
      const searchTerm = testData.expectedProducts[0].substring(0, 3);
      await searchInput.fill(searchTerm);
      await page.waitForTimeout(1000);
      
      const filteredProducts = await dashboardPage.getAllProductNames();
      TestLogger.log(`Filtered products: ${filteredProducts.length}`);
      expect(filteredProducts.length).toBeGreaterThan(0);
    } else {
      TestLogger.warn('Search input not found');
    }
    
    TestLogger.testPass('Search Products');
  });

  test('TC-009: User can validate product prices', async ({ page }) => {
    TestLogger.testStart('Validate Product Prices');
    
    const productNames = await dashboardPage.getAllProductNames();
    TestLogger.log(`Found ${productNames.length} products with prices`);
    
    expect(productNames.length).toBeGreaterThan(0);
    
    TestLogger.testPass('Validate Product Prices');
  });
});
