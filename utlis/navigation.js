import {expect} from '@playwright/test';
//Shared helper function to open the EventHub login page
/**
 * Shared helper function to open the EventHub login page
 * @param {import('@playwright/test').Page} page 
 */

export async function openLoginPage(page) {
    await page.goto("https://eventhub.rahulshettyacademy.com");
    await expect(page.locator("h1.text-xl.font-bold")).toHaveText("Sign in to EventHub");
    
    
}