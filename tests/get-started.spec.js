import { test, expect } from '@playwright/test';
import { openLoginPage } from "../utlis/navigation";

test('EventHub', async ({ page }) => {
    await openLoginPage(page);
    // Playwright actions return promises; 'await' ensures they resolve to prevent timing issues and flaky behavior
    await expect(page.getByPlaceholder("you@email.com")).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible();
});
test("Login", async ({ page }) => {
    await openLoginPage(page);
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.url()).toContain("/login");

});