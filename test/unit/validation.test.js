import Qrize from "../../src/main";
import {
  validateVersionOption,
  validateLevelOption,
  validateUrl,
} from "../../src/validators";

const element = document.createElement("div");

describe("element", () => {
  test("is required", () => {
    expect(() => new Qrize()).toThrow();
  });

  test("is an Element", () => {
    expect(() => new Qrize({ element: "<div></div>" })).toThrow();
  });

  test("is the only mandatory option", () => {
    expect(() => new Qrize({ element })).not.toThrow();
  });
});

describe("cellSize", () => {
  test("is a number", () => {
    expect(() => new Qrize({ element, cellSize: "string" })).toThrow();
    expect(() => new Qrize({ element, cellSize: {} })).toThrow();
    expect(() => new Qrize({ element, cellSize: true })).toThrow();
    expect(() => new Qrize({ element, cellSize: Infinity })).toThrow();
  });

  test("is greater than zero", () => {
    expect(() => new Qrize({ element, cellSize: -42 })).toThrow();
    expect(() => new Qrize({ element, cellSize: 10 })).not.toThrow();
  });
});

describe("margin", () => {
  test("is a number", () => {
    expect(() => new Qrize({ element, margin: "string" })).toThrow();
    expect(() => new Qrize({ element, margin: {} })).toThrow();
    expect(() => new Qrize({ element, margin: true })).toThrow();
    expect(() => new Qrize({ element, margin: Infinity })).toThrow();
  });

  test("is greater than zero", () => {
    expect(() => new Qrize({ element, margin: -42 })).toThrow();
    expect(() => new Qrize({ element, margin: 10 })).not.toThrow();
  });
});

describe("version", () => {
  test("is a number", () => {
    expect(() => validateVersionOption("string")).toThrow();
    expect(() => validateVersionOption({})).toThrow();
    expect(() => validateVersionOption(true)).toThrow();
    expect(() => validateVersionOption(Infinity)).toThrow();
  });

  test("is within range", () => {
    expect(() => validateVersionOption(-1)).toThrow();
    expect(() => validateVersionOption(41)).toThrow();
    expect(() => validateVersionOption(0)).not.toThrow();
    expect(() => validateVersionOption(40)).not.toThrow();
  });
});

describe("level", () => {
  test("is the one of predefined values", () => {
    expect(() => validateLevelOption(1)).toThrow();
    expect(() => validateLevelOption("A")).toThrow();
    expect(() => validateLevelOption("lol")).toThrow();
    expect(() => validateLevelOption("L")).not.toThrow();
    expect(() => validateLevelOption("M")).not.toThrow();
    expect(() => validateLevelOption("Q")).not.toThrow();
    expect(() => validateLevelOption("H")).not.toThrow();
  });
});

describe("url", () => {
  const invalidUrls = [
    "invalid-url",
    "http",
    123,
    {},
    "qrize..me",
    "qrize.me::111",
    "qrize.me#111",
  ];

  const validUrls = [
    "localhost",
    "qrize.me",
    "www.qrize.me",
    "192.168.0.1",
    "http://www.qrize.me",
    "https://www.qrize.me/params/?search=input&param=value#anchor",
    "ftp://example.com",
    "ftps://example.com",
  ];

  test("throws error if url is invalid", () => {
    invalidUrls.forEach(host =>
      expect(() => validateUrl(host)).toThrow(`Invalid "url": ${host}`)
    );
  });

  test("passes if url is valid", () => {
    validUrls.forEach(host => expect(() => validateUrl(host)).not.toThrow());
  });

  test("passes if host and port are valid", () => {
    validUrls.forEach(host =>
      expect(() => validateUrl(`${host}:8000`)).not.toThrow()
    );
  });
});
