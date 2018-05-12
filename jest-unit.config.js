module.exports = {
  verbose: true,
  testMatch: ["**/test/unit/**/*.test.js"],
  collectCoverageFrom: ["src/**/*.js"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  testURL: "http://example.com",
};
