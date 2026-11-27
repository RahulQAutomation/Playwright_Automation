import {test,expect} from '@playwright/test';
import { TestLogger } from '../../helpers/index';

test("Login From", async ({page})=>{

await page.goto("https://playwright-playground.com/forms/login");
await expect(page).toHaveURL("https://playwright-playground.com/forms/login");
await page.getByLabel("username").fill("TedBuckland");
await page.getByLabel("password").fill("Alligator3");
await page.getByRole("button",{name:"Login"}).click();
await TestLogger.testPass("test pass");

});

test('download file', async ({page})=>{

    await page.goto('https://playwright-playground.com/forms/file-download');
    const downloadpromise = page.waitForEvent('download');
    await page.getByRole('link', {name: 'Download sample report'}).click();
    const download = await downloadpromise
    await expect(download.suggestedFilename()).toBe('sample-report.txt');
    await page.pause();

});