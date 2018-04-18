import Qrize from "../../src/main";
import pkg from "../../package.json";

let qrize;
let element;
let xhrMockObject;
let spyGetHash;

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
      onreadystatechange: null,
    };
    return xhrMockObject;
  };

  global.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass);
  spyGetHash = jest.spyOn(Qrize, "getHash");
});

afterEach(() => {
  spyGetHash.mockReset();
  spyGetHash.mockRestore();
});

test("has version", () => {
  expect(qrize.version).toBe(pkg.version);
});

describe("createSvg", () => {
  test("fetches hash and builds svg", () => {
    qrize.createSvg({ url: "http://qrize.me" });
    xhrMockObject.onreadystatechange();
    expect(element.innerHTML).toMatchSnapshot();
  });

  test("uses current page url as default", () => {
    qrize.createSvg();
    expect(Qrize.getHash.mock.calls[0][0].url).toBe("http://example.com/");
  });

  test("passes correct parameters to onSuccess callback", () => {
    const onSuccess = jest.fn();
    qrize.createSvg({ onSuccess });

    xhrMockObject.onreadystatechange();
    expect(onSuccess.mock.calls[0][0].hash).toBe("8jLDWGQ");
    expect(onSuccess.mock.calls[0][0].url).toBe("http://qrize.me");
  });
});

describe("createImg", () => {
  test("fetches hash and builds img", () => {
    qrize.createImg({ url: "http://qrize.me" });
    xhrMockObject.onreadystatechange();
    expect(element.innerHTML).toMatchSnapshot();
  });

  test("uses current page url as default", () => {
    qrize.createImg();
    expect(Qrize.getHash.mock.calls[0][0].url).toBe("http://example.com/");
  });

  test("passes correct parameters to onSuccess callback", () => {
    const onSuccess = jest.fn();
    qrize.createImg({ onSuccess });

    xhrMockObject.onreadystatechange();
    expect(onSuccess.mock.calls[0][0].hash).toBe("8jLDWGQ");
    expect(onSuccess.mock.calls[0][0].url).toBe("http://qrize.me");
  });
});

describe("createTable", () => {
  test("fetches hash and builds table", () => {
    qrize.createTable({ url: "http://qrize.me" });
    xhrMockObject.onreadystatechange();
    expect(element.innerHTML).toMatchSnapshot();
  });

  test("uses current page url as default", () => {
    qrize.createTable();
    expect(Qrize.getHash.mock.calls[0][0].url).toBe("http://example.com/");
  });

  test("passes correct parameters to onSuccess callback", () => {
    const onSuccess = jest.fn();
    qrize.createTable({ onSuccess });

    xhrMockObject.onreadystatechange();
    expect(onSuccess.mock.calls[0][0].hash).toBe("8jLDWGQ");
    expect(onSuccess.mock.calls[0][0].url).toBe("http://qrize.me");
  });
});

describe("getUrl", () => {
  test("fetches url", done => {
    Qrize.getUrl({
      hash: "8jLDWGQ",
      onSuccess: response => {
        expect(response).toMatchSnapshot();
        done();
      },
    });
    xhrMockObject.onreadystatechange();
  });
});

describe("getHash", () => {
  test("fetches hash", done => {
    Qrize.getHash({
      url: "http://qrize.me",
      onSuccess: response => {
        expect(response).toMatchSnapshot();
        done();
      },
    });
    xhrMockObject.onreadystatechange();
  });
});

describe("prepareQR", () => {
  test("calls onFailure callback if API responded with error", () => {
    const onSuccess = jest.fn();
    const onFailure = jest.fn();
    qrize.prepareQR({ url: "http://qrize.me/error", onSuccess, onFailure });

    xhrMockObject.readyState = 3;
    xhrMockObject.onreadystatechange();
    expect(onSuccess.mock.calls.length).toBe(0);
    expect(onFailure.mock.calls.length).toBe(0);

    xhrMockObject.readyState = 4;
    xhrMockObject.status = 500;
    xhrMockObject.onreadystatechange();
    expect(onSuccess.mock.calls.length).toBe(0);
    expect(onFailure.mock.calls.length).toBe(1);
  });

  test("uses current page url as default", () => {
    qrize.prepareQR();
    expect(Qrize.getHash.mock.calls[0][0].url).toBe("http://example.com/");
  });
});

describe("reuse", () => {
  test("doesn't throw error on reuse", () => {
    qrize.createSvg({ url: "http://qrize.me" });
    xhrMockObject.onreadystatechange();
    expect(() => {
      qrize.createSvg({ url: "http://qrize.me" });
      xhrMockObject.onreadystatechange();
    }).not.toThrow();
  });

  test("rebuilds QR code normally", () => {
    qrize.createImg({ url: "http://qrize.me" });
    xhrMockObject.onreadystatechange();
    expect(element.innerHTML).toMatchSnapshot();
    qrize.createImg({
      url: "https://twitter.com/BoredElonMusk/status/611549517322715136",
    });
    xhrMockObject.onreadystatechange();
    expect(element.innerHTML).toMatchSnapshot();
  });
});
