import LoginPage from "./LoginPage";
import EventCardsPage from "./EventCardPage";
import EventDetailsPage from "./EventDetailsPage";
import MyBookingsPage from "./MyBookingsPage";

export default class PoManager {

    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.eventCardPage = new EventCardsPage(page);
        this.EventDetailsPage = new EventDetailsPage(page);
        this.myBookingsPage = new MyBookingsPage(page);

    }
    getLoginPage() {
        return this.loginPage;
    }
    getEventCardPage() {
        return this.eventCardPage;
    }
    getEventDetailsPage() {
        return this.EventDetailsPage;
    }
    getMyBookingsPage() {
        return this.myBookingsPage;
    }
}