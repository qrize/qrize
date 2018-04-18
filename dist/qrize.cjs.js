'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var qrcode = _interopDefault(require('qrcode-generator'));

var version = "0.4.0";

//      


function prepareCallback(callback) {
  return typeof callback === "function" ? callback : function () {};
}

function simpleHttpRequest(_ref) {
  var method = _ref.method,
      url = _ref.url,
      onSuccess = _ref.onSuccess,
      onFailure = _ref.onFailure;

  var success = prepareCallback(onSuccess);
  var failure = prepareCallback(onFailure);
  var request = new XMLHttpRequest();
  request.open(method, url, true);
  request.send(null);
  request.onreadystatechange = function onReadyStateChange() {
    if (request.readyState === 4) {
      if (request.status === 200) success(request.responseText);else failure(request.status, request.responseText);
    }
  };
}

function get(_ref2) {
  var url = _ref2.url,
      onSuccess = _ref2.onSuccess,
      onFailure = _ref2.onFailure;

  simpleHttpRequest({
    method: "GET",
    url: url,
    onSuccess: onSuccess,
    onFailure: onFailure
  });
}

function getJSON(_ref3) {
  var url = _ref3.url,
      onSuccess = _ref3.onSuccess,
      onFailure = _ref3.onFailure;

  var success = prepareCallback(onSuccess);
  get({
    url: url,
    onSuccess: function onSuccess(response) {
      return success(JSON.parse(response));
    },
    onFailure: onFailure
  });
}

//      

var ENDPOINTS = {
  getHash: "https://qrize.me/get-hash/<url>",
  getUrl: "https://qrize.me/get-url/<hash>",
  redirector: "https://qrize.me/<hash>"
};

var ERROR_CORRECTION_LEVELS = {
  L: 1, // 7%
  M: 2, // 15%
  Q: 3, // 25%
  H: 4 // 30%
};

//      

function isNumber(value) {
  return !Number.isNaN(parseInt(value, 10));
}

function isInteger(value) {
  return isNumber(value) && !(value % 1);
}

var urlRegExp = {
  scheme: /((?:http|ftp)s?:\/\/)/,
  domain: /(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)/,
  ip: /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/,
  port: /(?::\d+)/,
  query: /(?:\/?|[/?]\S+)/,
  composed: /.*/
};

urlRegExp.composed = new RegExp("^" + urlRegExp.scheme.source + "?" + ("(?:" + urlRegExp.domain.source + "|localhost|" + urlRegExp.ip.source + ")") + (urlRegExp.port.source + "?") + (urlRegExp.query.source + "$"), "i");

function validateUrl(url) {
  if (!urlRegExp.composed.test(url)) {
    throw new Error("Invalid \"url\": " + url);
  }
}

function validateElementOption(element) {
  if (!(element instanceof Element)) {
    throw new TypeError("Invalid \"element\": " + element + ". Must be an instance of Element");
  }
}

function validateCellSizeOption(cellSize) {
  if (!isNumber(cellSize)) {
    throw new TypeError("Invalid \"cellSize\": " + cellSize + ". Must be a number");
  }

  if (cellSize < 0) {
    throw new RangeError("Invalid \"cellSize\": " + cellSize + ". Must be greater than zero");
  }
}

function validateMarginOption(margin) {
  if (!isNumber(margin)) {
    throw new TypeError("Invalid \"margin\": " + margin + ". Must be a number");
  }

  if (margin < 0) {
    throw new RangeError("Invalid \"margin\": " + margin + ". Must be greater than zero");
  }
}

function validateVersionOption(version) {
  if (!isInteger(version)) {
    throw new TypeError("Invalid \"version\": " + version + ". Must be an integer");
  }

  if (!(version >= 0 && version <= 40)) {
    throw new RangeError("Invalid \"version\": " + version + ". Must be between 0 and 40");
  }
}

function validateLevelOption(level) {
  if (!ERROR_CORRECTION_LEVELS[level]) {
    var validValues = Object.keys(ERROR_CORRECTION_LEVELS).join(", ");
    throw new Error("Invalid error correction level: " + level + ". " + ("Should be one of these: " + validValues));
  }
}

function validateOptions(options) {
  validateElementOption(options.element);
  validateCellSizeOption(options.cellSize);
  validateMarginOption(options.margin);
  validateVersionOption(options.version);
  validateLevelOption(options.level);
  return true;
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

//      

var Qrize = function () {
  function Qrize(options) {
    classCallCheck(this, Qrize);

    this.version = version;
    // 'level' is hardcoded,
    // as URLs we code have the same length always
    this.options = {
      element: options.element,
      cellSize: options.cellSize || 2,
      margin: options.margin || 0,
      version: 0,
      level: "L"
    };

    // throws errors if invalid
    validateOptions(this.options);
  }

  createClass(Qrize, [{
    key: "prepareQR",
    value: function prepareQR() {
      var _this = this;

      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var url = params.url,
          onSuccess = params.onSuccess,
          onFailure = params.onFailure;

      var actualUrl = url || Qrize.getDefaultURL();
      validateUrl(actualUrl);
      var success = prepareCallback(onSuccess);
      Qrize.getHash({
        url: actualUrl,
        onSuccess: function onSuccess(response) {
          var redirectorUrl = ENDPOINTS.redirector.replace("<hash>", response.hash);
          var qr = qrcode(_this.options.version, _this.options.level);
          qr.addData(redirectorUrl);
          qr.make();
          success(qr, { hash: response.hash, url: response.url });
        },
        onFailure: onFailure
      });
    }
  }, {
    key: "createSvg",
    value: function createSvg() {
      var _this2 = this;

      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var url = params.url,
          onSuccess = params.onSuccess,
          onFailure = params.onFailure;

      var success = prepareCallback(onSuccess);
      this.prepareQR({
        url: url,
        onSuccess: function onSuccess(qr, response) {
          _this2.options.element.innerHTML = qr.createSvgTag(_this2.options.cellSize, _this2.options.margin);
          success({ hash: response.hash, url: response.url });
        },
        onFailure: onFailure
      });
      return this;
    }
  }, {
    key: "createImg",
    value: function createImg() {
      var _this3 = this;

      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var url = params.url,
          onSuccess = params.onSuccess,
          onFailure = params.onFailure;

      var success = prepareCallback(onSuccess);
      this.prepareQR({
        url: url,
        onSuccess: function onSuccess(qr, response) {
          _this3.options.element.innerHTML = qr.createImgTag(_this3.options.cellSize, _this3.options.margin);
          success({ hash: response.hash, url: response.url });
        },
        onFailure: onFailure
      });
      return this;
    }
  }, {
    key: "createTable",
    value: function createTable() {
      var _this4 = this;

      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var url = params.url,
          onSuccess = params.onSuccess,
          onFailure = params.onFailure;

      var success = prepareCallback(onSuccess);
      this.prepareQR({
        url: url,
        onSuccess: function onSuccess(qr, response) {
          _this4.options.element.innerHTML = qr.createTableTag(_this4.options.cellSize, _this4.options.margin);
          success({ hash: response.hash, url: response.url });
        },
        onFailure: onFailure
      });
      return this;
    }
  }], [{
    key: "getDefaultURL",
    value: function getDefaultURL() {
      return window.location.href;
    }
  }, {
    key: "getUrl",
    value: function getUrl(params) {
      var hash = params.hash,
          onSuccess = params.onSuccess,
          onFailure = params.onFailure;

      var apiUrl = ENDPOINTS.getUrl.replace("<hash>", hash);
      getJSON({ url: apiUrl, onSuccess: onSuccess, onFailure: onFailure });
    }
  }, {
    key: "getHash",
    value: function getHash(params) {
      var url = params.url,
          onSuccess = params.onSuccess,
          onFailure = params.onFailure;

      var encodedUrl = encodeURIComponent(url);
      var apiUrl = ENDPOINTS.getHash.replace("<url>", encodedUrl);
      getJSON({ url: apiUrl, onSuccess: onSuccess, onFailure: onFailure });
    }
  }]);
  return Qrize;
}();

module.exports = Qrize;
