import { test as setup, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
const authfile = "LoginData\loginCookie.json";

setup('login test', async ({ page }) => {

  await page.goto(`${process.env.ENVIRONMENT_URL}`);
  await page.getByRole('textbox', { name: 'email@example.com' }).click();
  await page.getByRole('textbox', { name: 'email@example.com' }).fill(`${process.env.USER_NAME}`);
  await page.getByRole('textbox', { name: 'enter your passsword' }).click();
  await page.getByRole('textbox', { name: 'enter your passsword' }).fill(`${process.env.PASSWORD}`);
  await page.locator("//*[@id='login']").click();
  await page.waitForLoadState('domcontentloaded');
  await expect(page.getByText('Automation Practice')).toBeVisible();
  await page.context().storageState({ path: authfile });
});