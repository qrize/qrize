import Qrize from "../src/main";
import pkg from "../package.json";

let qrize;
let element;
let xhrMockObject;

beforeEach(() => {
  element = document.createElement("div");
  qrize = new Qrize({ element });

  const xhrMockClass = () => {
    xhrMockObject = {
      status: 200,
      readyState: 4,
      responseText: '{"hash":"8jLDWGQ","url":"http://qrize.me"}',
      open: jest.fn(),
      send: jest.fn(),
      onreadystatechange: null
    };
    return xhrMockObject;
  };

  global.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass);
});

test("has version", () => {
  expect(qrize.version).toBe(pkg.version);
});

describe("createSvg", () => {
  test("fetches hash and builds svg", () => {
    qrize.createSvg("http://qrize.me");
    xhrMockObject.onreadystatechange();
    expect(element.innerHTML).toMatchSnapshot();
  });
});

describe("createImg", () => {
  test("fetches hash and builds img", () => {
    qrize.createImg("http://qrize.me");
    xhrMockObject.onreadystatechange();
    expect(element.innerHTML).toMatchSnapshot();
  });
});

describe("createTable", () => {
  test("fetches hash and builds table", () => {
    qrize.createTable("http://qrize.me");
    xhrMockObject.onreadystatechange();
    expect(element.innerHTML).toMatchSnapshot();
  });
});

describe("getUrl", () => {
  test("fetches url", done => {
    Qrize.getUrl("8jLDWGQ", response => {
      expect(response).toMatchSnapshot();
      done();
    });
    xhrMockObject.onreadystatechange();
  });
});

describe("getHash", () => {
  test("fetches hash", done => {
    Qrize.getHash("http://qrize.me", response => {
      expect(response).toMatchSnapshot();
      done();
    });
    xhrMockObject.onreadystatechange();
  });
});

describe("prepareQR", () => {
  test("should call onFailure callback if API responded with error", () => {
    const onSuccess = jest.fn();
    const onFailure = jest.fn();
    qrize.prepareQR("invalid-url", onSuccess, onFailure);

    xhrMockObject.readyState = 3;
    xhrMockObject.onreadystatechange();
    expect(onSuccess.mock.calls.length).toBe(0);
    expect(onFailure.mock.calls.length).toBe(0);

    xhrMockObject.readyState = 4;
    xhrMockObject.status = 400;
    xhrMockObject.onreadystatechange();
    expect(onSuccess.mock.calls.length).toBe(0);
    expect(onFailure.mock.calls.length).toBe(1);
  });

  test("uses current page url as default", () => {
    // mock window.location.href
    // See: https://github.com/facebook/jest/issues/890
    Object.defineProperty(window.location, "href", {
      writable: true,
      value: "http://example.com"
    });

    Qrize.getHash = jest.fn();
    qrize.prepareQR();
    expect(Qrize.getHash.mock.calls[0][0]).toBe("http://example.com");
  });
});
