const chalk = require("chalk");
const rimraf = require("rimraf");
const os = require("os");
const path = require("path");

const DIR = path.join(os.tmpdir(), "jest_puppeteer_global_setup");

module.exports = async function teardown() {
  console.log(chalk.green("Teardown Puppeteer"));
  await global.__BROWSER__.close();
  rimraf.sync(DIR);

  console.log(chalk.green("Teardown HTTP server"));
  global.__SERVER__.close();
};
