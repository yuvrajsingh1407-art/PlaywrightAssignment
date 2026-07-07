import { expect } from '@playwright/test';
//Shared helper function to open the EventHub login page
/**
 * Shared helper function to open the EventHub login page
 * @param {import('@playwright/test').Page} page 
 */
export default class EventHubHelper {
    constructor(page) {
        this.page = page;
        //login locators
        this.emailInput = page.locator('#email');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-btn');
        //dashboard locators
        this.browseEvents = page.getByRole('link', { name: /Browse Events/i }).first();

    }
    async goToLoginPage() {
        await this.page.goto("/");

    }
    async login(TestUserData) {
        await this.emailInput.fill(TestUserData.email);
        await this.passwordInput.fill(TestUserData.password);
        await this.loginButton.click();
    }

}