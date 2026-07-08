import { test, expect } from '@playwright/test';
import POManager from "../POM/POManager";
import EventHubHelper from "../utlis/EventHubHelper";

const dataSet = JSON.parse(JSON.stringify(require('../utlis/eventHubTestData.json')));

let eventTitleText;
let eventPriceText;
let eventSeatText;
test.beforeEach(async ({ page }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goToLoginPage();
    //Login
    await loginPage.login(dataSet.TestUserLoginData);
    await expect(loginPage.browseEvents).toBeVisible();

})

test("Test1", async ({ page }) => {



    //events page
    const poManager = new POManager(page);
    const eventCardPage = poManager.getEventCardPage();
    const evetDetailsPage = poManager.getEventDetailsPage();
    // const eventHubHelper = poManager.getEventHubHelper();
    await eventCardPage.navigateToEventsPage();
    await expect(eventCardPage.headingLocator).toBeVisible();
    // Filtering Using DD
    await eventCardPage.getFilteredEventCards(dataSet.bookings[0])
    await expect(eventCardPage.allEventsCardLocator.first()).toBeVisible();
    await expect(eventCardPage.allEventsCardLocator).not.toHaveCount(0);
    //Filtered Card
    const targetCard = eventCardPage.allEventsCardLocator.filter({ hasText: 'World Tech Summit' });
    await expect(targetCard).toHaveCount(1);
    await expect(targetCard).toBeVisible();
    eventTitleText = await eventCardPage.getEventCardDetails(targetCard).eventTitle.textContent();
    eventPriceText = await eventCardPage.getEventCardDetails(targetCard).eventPriceText.textContent();
    eventSeatText = await eventCardPage.getEventCardDetails(targetCard).eventSeatText.textContent();
    expect(eventTitleText).toContain('World Tech Summit');
    expect(eventPriceText).toContain('$');
    const extractedDigit = EventHubHelper.parseStringTextToInt(eventSeatText);
    expect(extractedDigit).toBeGreaterThan(0);
    await eventCardPage.getEventCardDetails(targetCard).bookNowEvent.click();
    //Event Details Page
    await expect(page).toHaveURL(/events/);
    await expect(evetDetailsPage.eventTitleLocator).toHaveText(eventTitleText);
    await expect(evetDetailsPage.eventTicketPriceLocator).toHaveText(eventPriceText);
    await page.goto('/events');

});
test('Test2', async ({ page }) => {
    const poManager = new POManager(page);
    const eventCardPage = poManager.getEventCardPage();
    await page.goto("/events");

    // Clear the search field
    await eventCardPage.searchBoxLocator.fill('');

    // Reset category to All Categories
    await eventCardPage.categoryDropdownLocator.first().selectOption('All Categories');

    // Reset city to All Cities
    await eventCardPage.categoryDropdownLocator.nth(1).selectOption('All Cities');

    await expect(eventCardPage.allEventsCardLocator.nth(2)).toBeVisible();
    const cardsCount = await eventCardPage.allEventsCardLocator.count();
    expect(cardsCount).toBeGreaterThan(2);
    const firstEventHeading = await eventCardPage.getEventCardDetails(eventCardPage.allEventsCardLocator.first()).eventTitle.textContent();
    const secondEventHeading = await eventCardPage.getEventCardDetails(eventCardPage.allEventsCardLocator.nth(1)).eventTitle.textContent();
    const lastEventHeading = await eventCardPage.getEventCardDetails(eventCardPage.allEventsCardLocator.last()).eventTitle.textContent();
    expect(firstEventHeading.trim().length).toBeGreaterThan(0);
    expect(secondEventHeading.trim().length).toBeGreaterThan(0);
    expect(lastEventHeading.trim().length).toBeGreaterThan(0);
    expect(firstEventHeading).not.toEqual(lastEventHeading);

});