const timeout = 5000;

describe(
  "Qrize",
  () => {
    let page;
    beforeAll(async () => {
      page = await global.__BROWSER__.newPage();
      await page.goto("http://127.0.0.1:8080/sandbox.html");
    }, timeout);

    test("page loading", async () => {
      const text = await page.evaluate(() => document.body.textContent);
      expect(text).toContain("Get QR");
    });

    test("should get IMG", async () => {
      const selector = "#target-img img";
      await page.waitForSelector(selector);
      const element = await page.$eval(selector, e => e.outerHTML);
      expect(element).toMatchSnapshot();
    });

    test("should get SVG", async () => {
      const selector = "#target-svg svg";
      await page.waitForSelector(selector);
      const element = await page.$eval(selector, e => e.outerHTML);
      expect(element).toMatchSnapshot();
    });

    test("should get TABLE", async () => {
      const selector = "#target-table table";
      await page.waitForSelector(selector);
      const element = await page.$eval(selector, e => e.outerHTML);
      expect(element).toMatchSnapshot();
    });
  },
  timeout
);
