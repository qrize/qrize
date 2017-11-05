import Qrize from "../src/main";
import { validateVersionOption, validateLevelOption } from "../src/validators";

const element = document.createElement("div");

describe("element", () => {
  test("is required", () => {
    expect(() => new Qrize()).toThrow();
  });

  test("should be an Element", () => {
    expect(() => new Qrize({ element: "<div></div>" })).toThrow();
  });

  test("should be the only mandatory option", () => {
    expect(() => new Qrize({ element })).not.toThrow();
  });
});

describe("cellSize", () => {
  test("should be a number", () => {
    expect(() => new Qrize({ element, cellSize: "string" })).toThrow();
    expect(() => new Qrize({ element, cellSize: {} })).toThrow();
    expect(() => new Qrize({ element, cellSize: true })).toThrow();
    expect(() => new Qrize({ element, cellSize: Infinity })).toThrow();
  });

  test("should be greater than zero", () => {
    expect(() => new Qrize({ element, cellSize: -42 })).toThrow();
    expect(() => new Qrize({ element, cellSize: 10 })).not.toThrow();
  });
});

describe("margin", () => {
  test("should be a number", () => {
    expect(() => new Qrize({ element, margin: "string" })).toThrow();
    expect(() => new Qrize({ element, margin: {} })).toThrow();
    expect(() => new Qrize({ element, margin: true })).toThrow();
    expect(() => new Qrize({ element, margin: Infinity })).toThrow();
  });

  test("should be greater than zero", () => {
    expect(() => new Qrize({ element, margin: -42 })).toThrow();
    expect(() => new Qrize({ element, margin: 10 })).not.toThrow();
  });
});

describe("version", () => {
  test("should be a number", () => {
    expect(() => validateVersionOption("string")).toThrow();
    expect(() => validateVersionOption({})).toThrow();
    expect(() => validateVersionOption(true)).toThrow();
    expect(() => validateVersionOption(Infinity)).toThrow();
  });

  test("should be within range", () => {
    expect(() => validateVersionOption(-1)).toThrow();
    expect(() => validateVersionOption(41)).toThrow();
    expect(() => validateVersionOption(0)).not.toThrow();
    expect(() => validateVersionOption(40)).not.toThrow();
  });
});

describe("level", () => {
  test("should be the one of predefined values", () => {
    expect(() => validateLevelOption(1)).toThrow();
    expect(() => validateLevelOption("A")).toThrow();
    expect(() => validateLevelOption("lol")).toThrow();
    expect(() => validateLevelOption("L")).not.toThrow();
    expect(() => validateLevelOption("M")).not.toThrow();
    expect(() => validateLevelOption("Q")).not.toThrow();
    expect(() => validateLevelOption("H")).not.toThrow();
  });
});
