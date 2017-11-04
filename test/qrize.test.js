import Qrize from "../src/main";
import pkg from "../package.json";

let qrize;
let element;

beforeEach(() => {
  element = document.createElement("div");
  qrize = new Qrize({ element });
});

test("has version", () => {
  expect(qrize.version).toBe(pkg.version);
});
