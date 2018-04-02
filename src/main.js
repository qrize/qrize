// @flow

import qrcode from "qrcode-generator";
import { version as pkgVersion } from "../package.json";
import { getJSON, prepareCallback } from "./requests";
import * as constants from "./constants";
import { validateOptions, validateUrl } from "./validators";

export type QrizeOptions = {
  element: Element,
  cellSize?: ?number,
  margin?: ?number,
};

export type PublicParams = {
  url?: string,
  onSuccess?: ?({ hash: string, url: string }) => void,
  onFailure?: ?(status: number, responseText: string) => void,
};

export default class Qrize {
  version: string;

  options: {
    element: Element,
    cellSize: number,
    margin: number,
    version: number,
    level: $Keys<typeof constants.ERROR_CORRECTION_LEVELS>,
  };

  constructor(options: QrizeOptions) {
    this.version = pkgVersion;
    // 'level' is hardcoded,
    // as URLs we code have the same length always
    this.options = {
      element: options.element,
      cellSize: options.cellSize || 2,
      margin: options.margin || 0,
      version: 0,
      level: "L",
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
    const actualUrl = url || Qrize.getDefaultURL();
    validateUrl(actualUrl);
    const success = prepareCallback(onSuccess);
    Qrize.getHash({
      url: actualUrl,
      onSuccess: response => {
        const redirectorUrl = constants.ENDPOINTS.redirector.replace(
          "<hash>",
          response.hash
        );
        const qr = qrcode(this.options.version, this.options.level);
        qr.addData(redirectorUrl);
        qr.make();
        success(qr, { hash: response.hash, url: response.url });
      },
      onFailure,
    });
  }

  createSvg(params: PublicParams = {}) {
    const { url, onSuccess, onFailure } = params;
    const success = prepareCallback(onSuccess);
    this.prepareQR({
      url,
      onSuccess: (qr, response) => {
        this.options.element.innerHTML = qr.createSvgTag(
          this.options.cellSize,
          this.options.margin
        );
        success({ hash: response.hash, url: response.url });
      },
      onFailure,
    });
    return this;
  }

  createImg(params: PublicParams = {}) {
    const { url, onSuccess, onFailure } = params;
    const success = prepareCallback(onSuccess);
    this.prepareQR({
      url,
      onSuccess: (qr, response) => {
        this.options.element.innerHTML = qr.createImgTag(
          this.options.cellSize,
          this.options.margin
        );
        success({ hash: response.hash, url: response.url });
      },
      onFailure,
    });
    return this;
  }

  createTable(params: PublicParams = {}) {
    const { url, onSuccess, onFailure } = params;
    const success = prepareCallback(onSuccess);
    this.prepareQR({
      url,
      onSuccess: (qr, response) => {
        this.options.element.innerHTML = qr.createTableTag(
          this.options.cellSize,
          this.options.margin
        );
        success({ hash: response.hash, url: response.url });
      },
      onFailure,
    });
    return this;
  }
}
