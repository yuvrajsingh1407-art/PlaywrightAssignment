import { test, expect } from '@playwright/test';
import EventHubHelper from "../utlis/navigation";
import EventCardsPage from '../utlis/EventCardsPage';
const TestUserData = {
    email: "domidi1455@heavty.com",
    password: "Eventhub@123",
}

const eventsTestData = {
    searchKey: 'World',
    category: 'Conference',
    city: 'Hyderabad'
};
let eventTitleText;
let eventPriceText;
let eventSeatText;
test.beforeEach(async ({ page }) => {
    const eventHubHelper = new EventHubHelper(page);
    await eventHubHelper.goToLoginPage();
    //Login
    await eventHubHelper.login(TestUserData);
    await expect(eventHubHelper.browseEvents).toBeVisible();

})

test("Test1", async ({ page }) => {



    //events page
    const eventCardPage = new EventCardsPage(page);
    await eventCardPage.navigateToEventsPage();
    await expect(eventCardPage.headingLocator).toBeVisible();
    // Filtering Using DD
    await eventCardPage.getFilteredEventCards(eventsTestData)
    await expect(eventCardPage.eventCardsLocator.first()).toBeVisible();
    await expect(eventCardPage.eventCardsLocator).not.toHaveCount(0);
    //Filtered Card
    const targetCard = eventCardPage.eventCardsLocator.filter({ hasText: 'World Tech Summit' });
    await expect(targetCard).toHaveCount(1);
    await expect(targetCard).toBeVisible();
    eventTitleText = await eventCardPage.getEventCardDetails(targetCard).eventTitle.textContent();
    eventPriceText = await eventCardPage.getEventCardDetails(targetCard).eventPriceText.textContent();
    eventSeatText = await eventCardPage.getEventCardDetails(targetCard).eventSeatText.textContent();
    expect(eventTitleText).toContain('World Tech Summit');
    expect(eventPriceText).toContain('$');
    const extractedDigit = eventCardPage.parseSeatCount(eventSeatText)
    expect(extractedDigit).toBeGreaterThan(0);
    await eventCardPage.getEventCardDetails(targetCard).bookNowEvent.click();
    //Event Details Page
    await expect(page).toHaveURL(/events/);
    await expect(eventCardPage.eventDetailsPageEventTitleLocator).toHaveText(eventTitleText);
    await expect(eventCardPage.eventDetailsPageTicketPriceLocator).toHaveText(eventPriceText);
    await page.goto('/events');

});
test('Test2', async ({ page }) => {
    const eventCardPage = new EventCardsPage(page);
    await page.goto("/events");

    // Clear the search field
    await eventCardPage.searchBoxLocator.fill('');

    // Reset category to All Categories
    await eventCardPage.categoryDropdownLocator.first().selectOption('All Categories');

    // Reset city to All Cities
    await eventCardPage.categoryDropdownLocator.nth(1).selectOption('All Cities');

    await expect(eventCardPage.eventCardsLocator.nth(2)).toBeVisible();
    const cardsCount = await eventCardPage.eventCardsLocator.count();
    expect(cardsCount).toBeGreaterThan(2);
    const firstEventHeading = await eventCardPage.getEventCardDetails(eventCardPage.eventCardsLocator.first()).eventTitle.textContent();
    const secondEventHeading = await eventCardPage.getEventCardDetails(eventCardPage.eventCardsLocator.nth(1)).eventTitle.textContent();
    const lastEventHeading = await eventCardPage.getEventCardDetails(eventCardPage.eventCardsLocator.last()).eventTitle.textContent();
    expect(firstEventHeading.trim().length).toBeGreaterThan(0);
    expect(secondEventHeading.trim().length).toBeGreaterThan(0);
    expect(lastEventHeading.trim().length).toBeGreaterThan(0);
    expect(firstEventHeading).not.toEqual(lastEventHeading);

});