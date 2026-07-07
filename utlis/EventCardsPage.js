export default class EventCardsPage {
    constructor(page) {
        this.page = page;
        this.browseEventsLocator = page.locator("#nav-events");
        this.eventCardsLocator = page.locator("#event-card");
        this.headingLocator = page.getByText('Upcoming Events', { exact: true });
        this.searchBoxLocator = page.getByPlaceholder("Search events, venues…");
        this.categoryDropdownLocator = page.getByRole('combobox');
        this.eventDetailsPageEventTitleLocator = page.locator("h1");
        this.eventDetailsPageTicketPriceLocator = this.page.locator(".flex.items-start", { hasText: "Price per ticket" }).locator(".text-sm")

    }

    async navigateToEventsPage() {
        await this.browseEventsLocator.click();
    }

    async getFilteredEventCards(eventsTestData) {
        await this.searchBoxLocator.fill(eventsTestData.searchKey);
        //Categories Dd
        const categoryDd = this.categoryDropdownLocator.first();
        await categoryDd.selectOption(eventsTestData.category);
        //City dd
        const cityDd = this.categoryDropdownLocator.nth(1);
        await cityDd.selectOption(eventsTestData.city);
    }
    parseSeatCount(seatText) {
        // Removes $ and comma and converts to number
        // return parseInt(seatText.replace(/[^0-9]/g,''));
        //const match = seatText.match(/\d+/);
        return parseInt(seatText.replace(/\D+/g, '')) // returns array of digits
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