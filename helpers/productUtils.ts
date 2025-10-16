import { Page } from '@playwright/test';

// Get all product names on the page
export async function getAllProductNames(page: Page): Promise<string[]> {
  await page.waitForSelector('.card-body b');
  return await page.locator('.card-body b').allTextContents();
}

// Add product to cart by name
export async function addProductToCart(page: Page, productName: string): Promise<void> {
  const productCard = page.locator('.card-body').filter({ has: page.locator(`b:has-text("${productName}")`) });
  await productCard.waitFor();
  await productCard.locator('button:has-text("Add To Cart")').click();
}