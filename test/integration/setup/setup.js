const chalk = require("chalk");
const puppeteer = require("puppeteer");
const fs = require("fs");
const mkdirp = require("mkdirp");
const os = require("os");
const path = require("path");
const httpServer = require("http-server");

const DIR = path.join(os.tmpdir(), "jest_puppeteer_global_setup");

module.exports = async function setup() {
  console.log(chalk.green("\nSetup HTTP server"));
  const server = httpServer.createServer({ cache: -1 });
  server.listen(8080);
  global.__SERVER__ = server;

  console.log(chalk.green("Setup Puppeteer"));
  const browser = await puppeteer.launch({});
  global.__BROWSER__ = browser;
  mkdirp.sync(DIR);
  fs.writeFileSync(path.join(DIR, "wsEndpoint"), browser.wsEndpoint());
};
