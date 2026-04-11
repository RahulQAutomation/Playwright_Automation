import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { getAllProductNames, addProductToCart } from '../../helpers/productUtils';
import { selectFromTypeahead } from '../../helpers/typeaheadHelper';
dotenv.config();

// test.use({ storageState: 'LoginDataloginCookie.json' });

test('end-to-end: user can buy a selected product and view all available products', async ({ page }) => {
  await page.goto(process.env.ENVIRONMENT_URL?.replace('/#/auth/login', '') || 'https://rahulshettyacademy.com/client');

  const productNames = await getAllProductNames(page);
  console.log('Available products:', productNames);

  const userSelectedProduct = productNames[0]; // Change as needed

  await addProductToCart(page, userSelectedProduct);

  await page.locator('[routerlink="/dashboard/cart"]').click();
  await expect(page.locator(`h3:has-text("${userSelectedProduct}")`)).toBeVisible();

  await page.locator('button:has-text("Checkout")').click();

  // --- Country selection using helper ---
  await selectFromTypeahead(page, '[placeholder="Select Country"]', 'India');

  // Ensure the input field now shows the selected value
  await expect(page.locator('[placeholder="Select Country"]')).toHaveValue(/India/);

  await page.locator('a:has-text("Place Order")').click();

  await expect(page.locator('.hero-primary')).toHaveText(/Thank\s?you for the order\.?/);
  // This targets the cell that contains both the product name and quantity
  await expect(
    page.locator('td.line-item.product-info-column.m-3', { hasText: userSelectedProduct })
  ).toBeVisible();
});
