//Shared helper function to open the Event Details page
/**
 * @param {import('@playwright/test').Page} page 
 */
export default class EventDetailsPage {
    constructor(page) {
        this.page = page;
        this.eventTitleLocator = page.locator("h1");
        this.eventTicketPriceLocator = this.page.locator(".flex.items-start", { hasText: "Price per ticket" }).locator(".text-sm")
        this.addTicketLocator = this.page.getByRole("button", { name: /\+/i });
        this.subtractTicketLocator = this.page.getByRole("button", { name: "-" });
        this.checkoutButton = this.page.getByRole("button", { name: "Checkout" });
        this.customerNameLocator = this.page.locator('#customerName');
        this.customerEmailLocator = this.page.getByLabel("Email");
        this.customerMobileNumberLocator = this.page.getByLabel("Phone Number");
        this.confirmBookingLocator = this.page.locator("#confirm-booking");
        this.bookingRefLocator = this.page.locator(".booking-ref");
        this.bookingTicketLocator = this.page.locator("div.justify-between").filter({ hasText: "Tickets" }).locator(".font-medium")
        this.bookingTotalPriceLocator = this.page.locator("div.justify-between").filter({ hasText: "Total" }).locator(".font-medium")



    }

}