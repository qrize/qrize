'use strict';

var version = "0.0.1";

var getHash = "http://qrize.me/get-hash/<url>";
var getUrl = "http://qrize.me/get-url/<hash>";
var ENDPOINTS = {
	getHash: getHash,
	getUrl: getUrl
};

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Qrize = function Qrize() {
  _classCallCheck(this, Qrize);

  this.version = version;
  this.ENDPOINTS = ENDPOINTS;
};

module.exports = Qrize;
