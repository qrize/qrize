module.exports = {
  testMatch: ["**/test/e2e/**/*.test.js"],
  globalSetup: "./test/e2e/setup/setup.js",
  globalTeardown: "./test/e2e/setup/teardown.js",
  testEnvironment: "./test/e2e/setup/puppeteer_environment.js",
};
