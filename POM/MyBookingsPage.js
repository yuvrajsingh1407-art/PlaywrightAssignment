import { expect } from "@playwright/test";

export default class MyBookingsPage {
    constructor(page) {
        this.page = page;
        this.myBookingBtnLocator = page.locator("#nav-bookings");
        this.bookingCardLocator = page.locator("#booking-card");
        this.headingLocator = page.locator("h1");
        this.breadcrumbLocator = page.locator('nav.mb-6');
        this.eventSummary = page.locator(".bg-white").filter({ hasText: "Event Details" });
        this.customerSummary = page.locator(".bg-white").filter({ hasText: "Customer Details" });
        this.paymentSummary = page.locator(".bg-white").filter({ hasText: "Payment Summary" });
        this.bookingInfo = page.locator(".bg-white").filter({ hasText: "Booking Information" });




    }

    async navigateToMyBookings() {
        await expect(async () => {
            await this.myBookingBtnLocator.click();
            await expect(this.bookingCardLocator.last()).toBeVisible({ timeout: 3000 })
        }).toPass({ timeout: 10000 });


    }

    findBookingCardByRef(bookingRef) {
        return this.bookingCardLocator.filter({ hasText: bookingRef })
    }
    async openBookingDetailFromCard(card) {
        await card.getByRole("button", { name: "View Details" }).click();

    }
    getRefCardAllDetailsLocator(referenceCard) {

        return {
            refEventTitle: referenceCard.locator(".mb-1"),
            refTktCount: referenceCard.locator("span").filter({ hasText: "ticket" }),
            refTotalText: referenceCard.locator(".text-xl"),
            refConfirmText: referenceCard.locator(".ring-1"),
            refNumtext: referenceCard.locator(".rounded-lg"),

        }
    }
    getSummaryLocator() {
        return {
            // Find the span with the label, then grab its immediately following sibling span (+ span)
            customerEmail: this.customerSummary.locator('span', { hasText: 'Email' }).locator('+ span'),
            ticketsBooked: this.paymentSummary.locator('span', { exact: true, hasText: 'Tickets' }).locator('+ span'),
            totalPaid: this.paymentSummary.locator('span', { hasText: 'Total Paid' }).locator('+ span'),
            bookingId: this.bookingInfo.locator('span', { hasText: 'Booking ID' }).locator('+ span')
        }
    }

}
