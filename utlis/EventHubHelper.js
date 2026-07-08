import { expect } from "@playwright/test";
import POManager from "../POM/POManager";


export default class EventHubHelper {
    constructor(page) {
        this.page = page;
        this.poManager = new POManager(page);
    }
    async createBookingFromFilters(bookingData) {
        const eventCardPage = this.poManager.getEventCardPage();
        const eventDetailsPage = this.poManager.getEventDetailsPage();
        await eventCardPage.getFilteredEventCards(bookingData);
        await expect(eventCardPage.allEventsCardLocator).toHaveCount(1);
        const targetEventCard = eventCardPage.allEventsCardLocator.filter({ hasText: bookingData.searchText });
        const eventTitleLocator = eventCardPage.getEventCardDetails(targetEventCard).eventTitle;
        await expect(eventTitleLocator).toContainText(bookingData.searchText);
        const bookNowLink = eventCardPage
            .getEventCardDetails(targetEventCard)
            .bookNowEvent;

        await expect(bookNowLink).toBeVisible();
        // OLD: force:true bypasses actionability checks, causing clicks before React Router handlers attach
        // await eventCardPage.getEventCardDetails(targetEventCard).bookNowEvent.click({ force: true });
        // await this.page.waitForURL(/events\/.+/); // hangs on SPA pushState (no 'load' event fires)
        // await expect(eventDetailsPage.customerNameLocator).toBeVisible();

        // FIX: Retry click + navigation — handles SPA race conditions where React Router
        // event handlers may not be attached when Playwright dispatches the click
        await expect(async () => {
            await bookNowLink.click();
            await expect(eventDetailsPage.customerNameLocator).toBeVisible({ timeout: 3000 });
        }).toPass({ timeout: 15000 });
        const clickNeeded = bookingData.quantity - 1;
        for (let i = 0; i < clickNeeded; i++) {
            await eventDetailsPage.addTicketLocator.click();
        }
        await eventDetailsPage.customerNameLocator.fill(bookingData.customerDetails.name);
        await eventDetailsPage.customerEmailLocator.fill(bookingData.customerDetails.email);
        await eventDetailsPage.customerMobileNumberLocator.fill(bookingData.customerDetails.phone);
        await eventDetailsPage.confirmBookingLocator.click();
        //Booking Confirmation 
        const bookingRef = await eventDetailsPage.bookingRefLocator.textContent();
        const ticketCount = await eventDetailsPage.bookingTicketLocator.textContent();
        const totalText = await eventDetailsPage.bookingTotalPriceLocator.textContent();
        const finalEventTitle = await eventDetailsPage.eventTitleLocator.textContent();
        const customerEmail = bookingData.customerDetails.email;
        return { eventTitle: finalEventTitle, bookingRef, ticketCount, totalText, customerEmail }




    }
    static parseStringTextToInt(stringText) {
        // Removes $ and comma and converts to number
        // return parseInt(seatText.replace(/[^0-9]/g,''));
        //const match = seatText.match(/\d+/);
        return parseInt(stringText.replace(/\D+/g, '')) // returns array of digits
    }

}
