'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var qrcode = _interopDefault(require('qrcode-generator'));

var version = "0.0.1";

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

var ENDPOINTS = {
  getHash: "http://qrize.me/get-hash/<url>",
  getUrl: "http://qrize.me/get-url/<hash>",
  redirector: "http://qrize.me/<hash>"
};

var ERROR_CORRECTION_LEVELS = {
  L: 1, // 7%
  M: 2, // 15%
  Q: 3, // 25%
  H: 4 // 30%
};

function isNumber(value) {
  return !Number.isNaN(parseInt(value, 10));
}

function isInteger(value) {
  return isNumber(value) && !(value % 1);
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
    throw new Error("Invalid error correction level: " + this.value + ". " + ("Should be one of these: " + validValues));
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

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





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

var Qrize = function () {
  function Qrize() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Qrize);

    this.version = version;

    // 'version' and 'level' are hardcoded,
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

    this.qr = qrcode(this.options.version, this.options.level);
  }

  createClass(Qrize, [{
    key: "prepareQR",
    value: function prepareQR() {
      var _this = this;

      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var url = params.url,
          onSuccess = params.onSuccess,
          onFailure = params.onFailure;

      var success = prepareCallback(onSuccess);
      Qrize.getHash({
        url: url || Qrize.getDefaultURL(),
        onSuccess: function onSuccess(response) {
          var redirectorUrl = ENDPOINTS.redirector.replace("<hash>", response.hash);
          _this.qr.addData(redirectorUrl);
          _this.qr.make();
          success();
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
        onSuccess: function onSuccess() {
          _this2.options.element.innerHTML = _this2.qr.createSvgTag(_this2.options.cellSize, _this2.options.margin);
          success();
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
        onSuccess: function onSuccess() {
          _this3.options.element.innerHTML = _this3.qr.createImgTag(_this3.options.cellSize, _this3.options.margin);
          success();
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
        onSuccess: function onSuccess() {
          _this4.options.element.innerHTML = _this4.qr.createTableTag(_this4.options.cellSize, _this4.options.margin);
          success();
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
