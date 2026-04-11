import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();


test.describe('Test group', () => {

  test('should display dashboard after cookie login', async ({ page }) => {
    await page.goto(`${process.env.ENVIRONMENT_URL}`);
    await expect(page.getByText('Automation Practice')).toBeVisible();
    // Optionally, check that login form is not visible
    await expect(page.getByRole('textbox', { name: 'email@example.com' })).toBeHidden();
  });
});
