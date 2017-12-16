import json from "rollup-plugin-json";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import uglify from "rollup-plugin-uglify";
import { minify } from "uglify-es";
import pkg from "./package.json";

export default [
  // browser-friendly UMD build
  {
    input: "src/main.js",
    output: {
      file: pkg.browser,
      format: "umd",
    },
    name: "Qrize",
    plugins: [
      json(),
      resolve(),
      commonjs(),
      babel({
        exclude: ["node_modules/*"],
        plugins: ["external-helpers"],
      }),
      uglify({}, minify),
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // the `targets` option which can specify `dest` and `format`)
  {
    input: "src/main.js",
    external: Object.keys(pkg.dependencies),
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
    plugins: [
      json(),
      babel({
        exclude: ["node_modules/*"],
        plugins: ["external-helpers"],
      }),
    ],
  },
];
