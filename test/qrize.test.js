import Qrize from "../src/main";
import pkg from "../package.json";

const qrize = new Qrize();

test("Version", () => {
  expect(qrize.version).toBe(pkg.version);
});
