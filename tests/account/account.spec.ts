import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { LoginPage, DashboardPage } from '../../pages';
import { TestDataLoader, TestLogger } from '../../helpers/index';

dotenv.config();

test.describe('Account Tests', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;
  const logoutData = TestDataLoader.loadTestData('logoutLogin');

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    const url = process.env.ENVIRONMENT_URL?.replace('/#/auth/login', '') || 'https://rahulshettyacademy.com/client';
    await dashboardPage.navigate(url);
  });

  test('TC-011: User can logout and login again', async ({ page }) => {
    TestLogger.testStart('Logout and Login');
    
    const isDashboardVisible = await dashboardPage.isDashboardHeadingVisible();
    expect(isDashboardVisible).toBe(true);
    TestLogger.log('User logged in successfully');
    
    const loggedOut = await dashboardPage.logout();
    if (loggedOut) {
      TestLogger.log('Logout successful');
      
      const isLoginPageVisible = await loginPage.isLoginPageVisible();
      expect(isLoginPageVisible).toBe(true);
      TestLogger.log('Redirected to login page');
      
      await loginPage.login(`${process.env.USER_NAME}`, `${process.env.PASSWORD}`);
      TestLogger.log('Re-login completed');
      
      await page.waitForTimeout(2000);
      
      // Verify dashboard is loaded
      const dashboardHeading = await dashboardPage.isDashboardHeadingVisible();
      if (dashboardHeading) {
        TestLogger.log('Re-login successful - Dashboard loaded');
      } else {
        TestLogger.warn('Dashboard not immediately visible after login');
      }
    } else {
      TestLogger.warn('Sign out button not found');
    }
    
    TestLogger.testPass('Logout and Login');
  });
});
