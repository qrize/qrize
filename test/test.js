const Qrize = require("..");
const pkg = require("../package.json");
const assert = require("assert");

const qrize = new Qrize();

assert.equal(qrize.version, pkg.version, "Wrong version property");
