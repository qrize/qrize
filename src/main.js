// @flow

import qrcode from "qrcode-generator";
import type { QrCode } from "qrcode-generator";
import { version as pkgVersion } from "../package.json";
import { getJSON, prepareCallback } from "./requests";
import * as constants from "./constants";
import { validateOptions, validateUrl } from "./validators";
import type {
  HashUrlPair,
  OnRequestSuccessCallback,
  OnRequestFailureCallback,
  QrizeOptionsInternal,
} from "./types";

type OptionalRequestCallbacks = {
  onSuccess?: OnRequestSuccessCallback,
  onFailure?: OnRequestFailureCallback,
};

export type QrizeOptions = {|
  element: Element,
  cellSize?: ?number,
  margin?: ?number,
|};

export type PublicParams = {
  url?: string,
  ...$Exact<OptionalRequestCallbacks>, // See: https://github.com/facebook/flow/issues/3534
};

export type PrepareQrParams = {
  url?: string,
  onSuccess?: (qr: QrCode, response: HashUrlPair) => void,
  onFailure?: OnRequestFailureCallback,
};

export type StaticGetUrlParams = {|
  hash: string,
  ...$Exact<OptionalRequestCallbacks>,
|};

export type StaticGetHashParams = {|
  url: string,
  ...$Exact<OptionalRequestCallbacks>,
|};

export default class Qrize {
  version: string;

  options: QrizeOptionsInternal;

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

  static getDefaultURL(): string {
    return window.location.href;
  }

  static getUrl(params: StaticGetUrlParams) {
    const { hash, onSuccess, onFailure } = params;
    const apiUrl = constants.ENDPOINTS.getUrl.replace("<hash>", hash);
    getJSON({ url: apiUrl, onSuccess, onFailure });
  }

  static getHash(params: StaticGetHashParams) {
    const { url, onSuccess, onFailure } = params;
    const encodedUrl = encodeURIComponent(url);
    const apiUrl = constants.ENDPOINTS.getHash.replace("<url>", encodedUrl);
    getJSON({ url: apiUrl, onSuccess, onFailure });
  }

  prepareQR(params: PrepareQrParams = {}) {
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
    const success: HashUrlPair => void = prepareCallback(onSuccess);
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
    const success: HashUrlPair => void = prepareCallback(onSuccess);
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
    const success: HashUrlPair => void = prepareCallback(onSuccess);
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
