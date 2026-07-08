import { test, expect } from '@playwright/test';
import POManager from "../POM/POManager";
import EventHubHelper from "../utlis/EventHubHelper";
const dataSet = JSON.parse(JSON.stringify(require('../utlis/eventHubTestData.json')));
const completedBookings = [];

test.beforeEach(async ({ page }) => {
    // 1. Login using POManager
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goToLoginPage();
    await loginPage.login(dataSet.TestUserLoginData); // Pass the whole object!
    await expect(loginPage.browseEvents).toBeVisible();
})

test(`Book multiple events to build history`, async ({ page }) => {
    // 2. Navigate to events page
    const poManager = new POManager(page);
    const eventCardPage = poManager.getEventCardPage();
    const myBookingsPage = poManager.getMyBookingsPage();



    // 3. EventHubHelper to create booking
    const eventHubHelper = new EventHubHelper(page);

    // Loop through all bookings defined in the JSON
    for (const booking of dataSet.bookings) {
        // A. Navigate to events page (reset state for each new booking)
        await eventCardPage.navigateToEventsPage();

        // B. Call the helper to find, book, and pay (updates the DOM)
        const bookingDetails = await eventHubHelper.createBookingFromFilters(booking);
        console.log("Booking Successful! Here are the details:");
        console.log(bookingDetails);
        completedBookings.push(bookingDetails);
        expect(bookingDetails.eventTitle).toEqual(booking.expectedFullTitle);
    }
    const booking1 = completedBookings[0];
    const booking2 = completedBookings[1];
    expect(booking2.bookingRef).not.toEqual(booking1.bookingRef);
    expect(booking2.eventTitle).not.toEqual(booking1.eventTitle);
    expect(EventHubHelper.parseStringTextToInt(booking2.ticketCount)).toEqual(dataSet.bookings[1].quantity);
    await myBookingsPage.navigateToMyBookings();
    const booking1Card = myBookingsPage.findBookingCardByRef(booking1.bookingRef);
    const booking2Card = myBookingsPage.findBookingCardByRef(booking2.bookingRef);
    await expect(booking1Card).toBeVisible();
    await expect(booking2Card).toBeVisible();
});
test('Test2', async ({ page }) => {
    const poManager = new POManager(page);
    const myBookingsPage = poManager.getMyBookingsPage();
    await myBookingsPage.navigateToMyBookings();
    //Step 1 & 2
    await expect(myBookingsPage.headingLocator).toBeVisible();
    const myBookingsRefrenceCard = [];
    for (const bookingInfo of completedBookings) {
        const referenceCard = myBookingsPage.findBookingCardByRef(bookingInfo.bookingRef);
        myBookingsRefrenceCard.push(referenceCard);
        await expect(referenceCard).toBeVisible();
        const refCardDetails = myBookingsPage.getRefCardAllDetailsLocator(referenceCard);
        await expect(refCardDetails.refConfirmText).toHaveText("confirmed");
        // Check ticket count is visible
        await expect(refCardDetails.refTktCount).toContainText(`${bookingInfo.ticketCount} ticket`);

        // const tktCountText = await refCardDetails.refTktCount.textContent();
        // expect(EventHubHelper.parseStringTextToInt(tktCountText)).toEqual(EventHubHelper.parseStringTextToInt(bookingInfo.ticketCount))
        await expect(refCardDetails.refEventTitle).toHaveText(bookingInfo.eventTitle)
        await expect(refCardDetails.refTotalText).toHaveText(bookingInfo.totalText)
    }

    //Step 3 & 4 using loop
    for (const card of myBookingsRefrenceCard) {
        const bookingRef = await myBookingsPage.getRefCardAllDetailsLocator(card).refNumtext.textContent();
        const matchedBooking = completedBookings.find(b => b.bookingRef === bookingRef);
        await myBookingsPage.openBookingDetailFromCard(card);
        await expect(myBookingsPage.breadcrumbLocator).toContainText(bookingRef);
        // Assert the h1 heading equals the first eventTitle
        await expect(myBookingsPage.headingLocator).toHaveText(matchedBooking.eventTitle);
        await expect(myBookingsPage.getSummaryLocator().customerEmail).toHaveText(matchedBooking.customerEmail);
        await expect(myBookingsPage.getSummaryLocator().ticketsBooked).toContainText(matchedBooking.ticketCount);
        await expect(myBookingsPage.getSummaryLocator().totalPaid).toContainText(matchedBooking.totalText);

        // Assert Booking Information shows a numeric Booking ID value
        const bookingIdText = await myBookingsPage.getSummaryLocator().bookingId.textContent();
        expect(bookingIdText).toMatch(/#\d+/);

        // --- THE FIX: We must navigate BACK to the bookings list before the next loop iteration! ---
        await myBookingsPage.navigateToMyBookings();
    }
})