@Playright/test : This is the test Runner File , this what we use for e2e testing. It includes the actual Playwright test runner, fixture support, page object integration, and built-in assertions (`expect`). It automatically installs the browser automation library under the hood.
playwright` (The Library Only):** This is just the bare-metal automation library. It has no built-in test runner or assertions. Use this if you are scraping data, automating workflows, or routing Playwright through a different test runner like Jest, Mocha, or Cucumber.

---
### Page Fixture vs Browser Context
- **Page Fixture:** gives you one ready-to-use page for the test.
- **Browser Context:** is a separate browser session container that can create its own pages.
- A fresh browser context starts with **isolated state**.