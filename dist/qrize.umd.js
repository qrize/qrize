(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.qrize = factory());
}(this, (function () { 'use strict';

var version = "0.0.1";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Qrize = function Qrize() {
  _classCallCheck(this, Qrize);

  this.version = version;
};

return Qrize;

})));
