import {test,expect} from '@playwright/test';
import { TestLogger } from '../../helpers/index';

test("pratice test", async ({page})=>{

await page.goto("https://playwright-playground.com/forms/login");
await expect(page).toHaveURL("https://playwright-playground.com/forms/login");
await page.getByLabel("username").fill("TedBuckland");
await page.getByLabel("password").fill("Alligator3");
await page.getByRole("button",{name:"Login"}).click();
await TestLogger.testPass("test pass");
await page.pause();
});