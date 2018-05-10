const timeout = 5000;

describe(
  "/ (Home Page)",
  () => {
    let page;
    beforeAll(async () => {
      page = await global.__BROWSER__.newPage();
      await page.goto("https://google.com");
    }, timeout);

    it("should load without error", async () => {
      const text = await page.evaluate(() => document.body.textContent);
      expect(text).toContain("google");
    });
  },
  timeout
);
