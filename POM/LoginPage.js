import { expect } from '@playwright/test';
//Shared helper function to open the EventHub login page
/**
 * Shared helper function to open the EventHub login page
 * @param {import('@playwright/test').Page} page 
 */
export default class LoginPage {
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
    async login(loginData) {
        await this.emailInput.fill(loginData.email);
        await this.passwordInput.fill(loginData.password);
        await this.loginButton.click();
    }

}