import qrcode from "qrcode-generator";
import { version as pkgVersion } from "../package.json";
import { getJSON, prepareCallback } from "./requests";
import * as constants from "./constants";
import { validateOptions } from "./validators";

export default class Qrize {
  constructor(options = {}) {
    this.version = pkgVersion;

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
  }

  static getDefaultURL() {
    return window.location.href;
  }

  static getUrl(params) {
    const { hash, onSuccess, onFailure } = params;
    const apiUrl = constants.ENDPOINTS.getUrl.replace("<hash>", hash);
    getJSON({ url: apiUrl, onSuccess, onFailure });
  }

  static getHash(params) {
    const { url, onSuccess, onFailure } = params;
    const encodedUrl = encodeURIComponent(url);
    const apiUrl = constants.ENDPOINTS.getHash.replace("<url>", encodedUrl);
    getJSON({ url: apiUrl, onSuccess, onFailure });
  }

  prepareQR(params = {}) {
    const { url, onSuccess, onFailure } = params;
    const success = prepareCallback(onSuccess);
    Qrize.getHash({
      url: url || Qrize.getDefaultURL(),
      onSuccess: response => {
        const redirectorUrl = constants.ENDPOINTS.redirector.replace(
          "<hash>",
          response.hash
        );
        const qr = qrcode(this.options.version, this.options.level);
        qr.addData(redirectorUrl);
        qr.make();
        success(qr);
      },
      onFailure
    });
  }

  createSvg(params = {}) {
    const { url, onSuccess, onFailure } = params;
    const success = prepareCallback(onSuccess);
    this.prepareQR({
      url,
      onSuccess: qr => {
        this.options.element.innerHTML = qr.createSvgTag(
          this.options.cellSize,
          this.options.margin
        );
        success();
      },
      onFailure
    });
    return this;
  }

  createImg(params = {}) {
    const { url, onSuccess, onFailure } = params;
    const success = prepareCallback(onSuccess);
    this.prepareQR({
      url,
      onSuccess: qr => {
        this.options.element.innerHTML = qr.createImgTag(
          this.options.cellSize,
          this.options.margin
        );
        success();
      },
      onFailure
    });
    return this;
  }

  createTable(params = {}) {
    const { url, onSuccess, onFailure } = params;
    const success = prepareCallback(onSuccess);
    this.prepareQR({
      url,
      onSuccess: qr => {
        this.options.element.innerHTML = qr.createTableTag(
          this.options.cellSize,
          this.options.margin
        );
        success();
      },
      onFailure
    });
    return this;
  }
}
