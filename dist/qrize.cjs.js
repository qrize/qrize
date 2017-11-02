'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var qrcode = _interopDefault(require('qrcode-generator'));

var version = "0.0.1";

function simpleHttpRequest(method, url, success, failure) {
  var request = new XMLHttpRequest();
  request.open(method, url, true);
  request.send(null);
  request.onreadystatechange = function onreadystatechange() {
    if (request.readyState === 4) {
      if (request.status === 200) success(request.responseText);else if (failure) failure(request.status, request.statusText);
    }
  };
}

function get(url, success, failure) {
  simpleHttpRequest("GET", url, success, failure);
}

function getJSON(url, success, failure) {
  get(url, function (response) {
    success(JSON.parse(response));
  }, failure);
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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





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









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var _fixBabelExtend = function (O) {
  var gOPD = O.getOwnPropertyDescriptor,
      gPO = O.getPrototypeOf || function (o) {
    return o.__proto__;
  },
      sPO = O.setPrototypeOf || function (o, p) {
    o.__proto__ = p;
    return o;
  },
      construct = (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === 'object' ? Reflect.construct : function (Parent, args, Class) {
    var Constructor,
        a = [null];
    a.push.apply(a, args);
    Constructor = Parent.bind.apply(Parent, a);
    return sPO(new Constructor(), Class.prototype);
  };

  return function fixBabelExtend(Class) {
    var Parent = gPO(Class);
    return sPO(Class, sPO(function Super() {
      return construct(Parent, arguments, gPO(this).constructor);
    }, Parent));
  };
}(Object);

var BaseException = _fixBabelExtend(function (_Error) {
  inherits(BaseException, _Error);

  function BaseException(value) {
    classCallCheck(this, BaseException);

    var _this = possibleConstructorReturn(this, (BaseException.__proto__ || Object.getPrototypeOf(BaseException)).call(this));

    _this.value = value;
    return _this;
  }

  return BaseException;
}(Error));

var InvalidErrorCorrectionLevel = function (_BaseException) {
  inherits(InvalidErrorCorrectionLevel, _BaseException);

  function InvalidErrorCorrectionLevel() {
    classCallCheck(this, InvalidErrorCorrectionLevel);
    return possibleConstructorReturn(this, (InvalidErrorCorrectionLevel.__proto__ || Object.getPrototypeOf(InvalidErrorCorrectionLevel)).apply(this, arguments));
  }

  createClass(InvalidErrorCorrectionLevel, [{
    key: "message",
    get: function get() {
      return "Invalid error correction level: " + this.value + ". " + ("Should be one of these: " + Object.keys(ERROR_CORRECTION_LEVELS));
    }
  }]);
  return InvalidErrorCorrectionLevel;
}(BaseException);

var InvalidQRVersion = function (_BaseException2) {
  inherits(InvalidQRVersion, _BaseException2);

  function InvalidQRVersion() {
    classCallCheck(this, InvalidQRVersion);
    return possibleConstructorReturn(this, (InvalidQRVersion.__proto__ || Object.getPrototypeOf(InvalidQRVersion)).apply(this, arguments));
  }

  createClass(InvalidQRVersion, [{
    key: "message",
    get: function get() {
      return "Invalid version: " + this.value + ". " + "Should be an integer from 1 to 40, or 0 for auto detection";
    }
  }]);
  return InvalidQRVersion;
}(BaseException);

var InvalidElement = function (_BaseException3) {
  inherits(InvalidElement, _BaseException3);

  function InvalidElement() {
    classCallCheck(this, InvalidElement);
    return possibleConstructorReturn(this, (InvalidElement.__proto__ || Object.getPrototypeOf(InvalidElement)).apply(this, arguments));
  }

  createClass(InvalidElement, [{
    key: "message",
    get: function get() {
      return "Invalid element: " + this.value + ". Should be an instance of Element";
    }
  }]);
  return InvalidElement;
}(BaseException);

var InvalidOptions = function (_BaseException4) {
  inherits(InvalidOptions, _BaseException4);

  function InvalidOptions() {
    classCallCheck(this, InvalidOptions);
    return possibleConstructorReturn(this, (InvalidOptions.__proto__ || Object.getPrototypeOf(InvalidOptions)).apply(this, arguments));
  }

  createClass(InvalidOptions, [{
    key: "message",
    get: function get() {
      return "Invalid options. Reinitialize Qrize with valid options in order to use it's features";
    }
  }]);
  return InvalidOptions;
}(BaseException);

function validateOptions(options) {
  var element = options.element,
      version = options.version,
      level = options.level,
      cellSize = options.cellSize,
      margin = options.margin;


  if (!(element instanceof Element)) {
    throw new InvalidElement(element);
  }

  if (!(version >= 0 && version <= 40)) {
    throw new InvalidQRVersion(version);
  }

  if (!ERROR_CORRECTION_LEVELS[level]) {
    throw new InvalidErrorCorrectionLevel(level);
  }

  if (Number.isNaN(parseInt(cellSize, 10))) {
    throw new TypeError("Invalid \"cellSize\": " + cellSize + ". Should be an integer");
  }

  if (Number.isNaN(parseInt(margin, 10))) {
    throw new TypeError("Invalid \"margin\": " + margin + ". Should be an integer");
  }

  return true;
}

var Qrize = function () {
  function Qrize() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Qrize);

    this.version = version;

    this.options = {
      element: options.element,
      version: options.version || 0,
      level: options.level || "L",
      cellSize: options.cellSize || 2,
      margin: options.margin || 4 // usually 2*cellSize
    };

    this.valid = validateOptions(this.options);

    this.qr = qrcode(this.options.version, this.options.level);
  }

  createClass(Qrize, [{
    key: "prepareQR",
    value: function prepareQR(url, onSuccess, onFailure) {
      var _this = this;

      if (!this.valid) {
        throw new InvalidOptions();
      }

      Qrize.getHash(url || Qrize.getDefaultURL(), function (response) {
        var redirectorUrl = ENDPOINTS.redirector.replace("<hash>", response.hash);
        _this.qr.addData(redirectorUrl);
        _this.qr.make();
        onSuccess();
      }, onFailure);
    }
  }, {
    key: "createSvg",
    value: function createSvg(url, onFailure) {
      var _this2 = this;

      this.prepareQR(url, function () {
        _this2.options.element.innerHTML = _this2.qr.createSvgTag(_this2.options.cellSize, _this2.options.margin);
      }, onFailure);
    }
  }, {
    key: "createImg",
    value: function createImg(url, onFailure) {
      var _this3 = this;

      this.prepareQR(url, function () {
        _this3.options.element.innerHTML = _this3.qr.createImgTag(_this3.options.cellSize, _this3.options.margin);
      }, onFailure);
    }
  }, {
    key: "createTable",
    value: function createTable(url, onFailure) {
      var _this4 = this;

      this.prepareQR(url, function () {
        _this4.options.element.innerHTML = _this4.qr.createTableTag(_this4.options.cellSize, _this4.options.margin);
      }, onFailure);
    }
  }], [{
    key: "getDefaultURL",
    value: function getDefaultURL() {
      return window.location.href;
    }
  }, {
    key: "getUrl",
    value: function getUrl(hash, onSuccess, onFailure) {
      var apiUrl = ENDPOINTS.getUrl.replace("<hash>", hash);
      getJSON(apiUrl, onSuccess, onFailure);
    }
  }, {
    key: "getHash",
    value: function getHash(url, onSuccess, onFailure) {
      var encodedUrl = encodeURIComponent(url);
      var apiUrl = ENDPOINTS.getHash.replace("<url>", encodedUrl);
      getJSON(apiUrl, onSuccess, onFailure);
    }
  }]);
  return Qrize;
}();

module.exports = Qrize;
