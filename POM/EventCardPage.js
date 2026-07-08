import { expect } from "@playwright/test";
export default class EventCardPage {
    constructor(page) {
        this.page = page;
        this.eventsPageLocator = page.locator("#nav-events");
        this.allEventsCardLocator = page.locator("#event-card");
        this.headingLocator = page.getByText('Upcoming Events', { exact: true });
        this.searchBoxLocator = page.getByPlaceholder("Search events, venues…");
        this.categoryDropdownLocator = page.getByRole('combobox');


    }

    async navigateToEventsPage() {
        await this.eventsPageLocator.click();
        await expect(this.headingLocator).toBeVisible();
    }

    async getFilteredEventCards(bookingTestData) {
        await this.searchBoxLocator.fill(bookingTestData.searchText);
        //Categories Dd
        const categoryDd = this.categoryDropdownLocator.first();
        await categoryDd.selectOption(bookingTestData.category);
        //City dd
        const cityDd = this.categoryDropdownLocator.nth(1);
        await cityDd.selectOption(bookingTestData.city);
    }

    getEventCardDetails(cardLocator) {
        return {
            bookNowEvent: cardLocator.getByRole('link', { name: 'Book Now' }),
            eventTitle: cardLocator.locator("h3"),
            eventPriceText: cardLocator.locator("p.text-lg"),
            eventSeatText: cardLocator.locator('p+span.text-xs'),
        };
    }

}