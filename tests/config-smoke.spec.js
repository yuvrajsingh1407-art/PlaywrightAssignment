// ### Page Fixture vs Browser Context
// **Page Fixture:** gives you one ready-to-use page for the test.
// **Browser Context:** is a separate browser session container that can create its own pages.
// A fresh browser context starts with **isolated state**.
import { test, expect } from "@playwright/test";
import EventHubHelper from "../utlis/navigation";

test("Event Hub", async ({ page }) => {
    const eventHubHelper = new EventHubHelper(page)
    await eventHubHelper.goToLoginPage();
    await expect(page).toHaveTitle(/EventHub/i);
    await expect(page.getByPlaceholder("you@email.com")).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible();
});

test("Page Fixture and Browser Contest", async ({ page, browser }) => {
    const eventHubHelper = new EventHubHelper(page)
    await eventHubHelper.goToLoginPage();
    await page.getByPlaceholder("you@email.com").fill('beginner@sample.com');
    const isolatedContext = await browser.newContext();
    const isolatedPage = await isolatedContext.newPage();
    await isolatedPage.goto('/login');
    await expect(isolatedPage.getByPlaceholder("you@email.com")).toBeEmpty();
    await isolatedContext.close();




})