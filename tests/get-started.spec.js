import { test, expect } from '@playwright/test';
import EventHubHelper from "../utlis/navigation";

test('EventHub', async ({ page }) => {
    const eventHubHelper = new EventHubHelper(page)
    await eventHubHelper.goToLoginPage();
    await expect(page.locator("h1.text-xl.font-bold")).toHaveText("Sign in to EventHub")
    // Playwright actions return promises; 'await' ensures they resolve to prevent timing issues and flaky behavior
    await expect(page.getByPlaceholder("you@email.com")).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible();
});
test("Login", async ({ page }) => {
    const eventHubHelper = new EventHubHelper(page);
    await eventHubHelper.goToLoginPage();
    await expect(page.getByLabel("Password")).toBeVisible();
    expect(page.url()).toContain("/login");


});