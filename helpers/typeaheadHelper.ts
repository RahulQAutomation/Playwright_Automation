import { Page, Locator, expect } from '@playwright/test';

/**
 * Selects a value from an Angular/Typeahead dropdown input.
 * @param page Playwright Page object
 * @param inputSelector Selector for the input field (string or Locator)
 * @param value The value to select (e.g., "India")
 * @param typeDelay Delay between keystrokes (default: 200ms)
 */
export async function selectFromTypeahead(
  page: Page,
  inputSelector: string | Locator,
  value: string,
  typeDelay = 200
) {
  const input = typeof inputSelector === 'string' ? page.locator(inputSelector) : inputSelector;
  await input.click();
  await input.fill(''); // Clear any previous value
  await input.pressSequentially(value.slice(0, 3), { delay: typeDelay }); // e.g., 'Ind'

  // Wait for dropdown to appear
  const dropdown = page.locator('section.ta-results');
  await expect(dropdown).toBeVisible({ timeout: 10000 });

  // Wait for the specific option to be visible and click it
  const option = dropdown.locator('button.ta-item:has-text("India")');
  await option.first().waitFor({ state: 'visible', timeout: 10000 });
  await option.first().click({ force: true });

  // Ensure the input field now shows the selected value
  await expect(input).toHaveValue(new RegExp(value), { timeout: 10000 });
}