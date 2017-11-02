import qrcode from "qrcode-generator";
import { version as pkgVersion } from "../package.json";
import { getJSON } from "./requests";
import { InvalidOptions } from "./exceptions";
import * as constants from "./constants";
import validateOptions from "./validators";

export default class Qrize {
  constructor(options = {}) {
    this.version = pkgVersion;

    this.options = {
      element: options.element,
      version: options.version || 0,
      level: options.level || "L",
      cellSize: options.cellSize || 2,
      margin: options.margin || 4 // usually 2*cellSize
    };

    this.valid = validateOptions(this.options);

    this.qr = qrcode(this.options.version, this.options.level);
  }

  static getDefaultURL() {
    return window.location.href;
  }

  static getUrl(hash, onSuccess, onFailure) {
    const apiUrl = constants.ENDPOINTS.getUrl.replace("<hash>", hash);
    getJSON(apiUrl, onSuccess, onFailure);
  }

  static getHash(url, onSuccess, onFailure) {
    const encodedUrl = encodeURIComponent(url);
    const apiUrl = constants.ENDPOINTS.getHash.replace("<url>", encodedUrl);
    getJSON(apiUrl, onSuccess, onFailure);
  }

  prepareQR(url, onSuccess, onFailure) {
    if (!this.valid) {
      throw new InvalidOptions();
    }

    Qrize.getHash(
      url || Qrize.getDefaultURL(),
      response => {
        const redirectorUrl = constants.ENDPOINTS.redirector.replace(
          "<hash>",
          response.hash
        );
        this.qr.addData(redirectorUrl);
        this.qr.make();
        onSuccess();
      },
      onFailure
    );
  }

  createSvg(url, onFailure) {
    this.prepareQR(
      url,
      () => {
        this.options.element.innerHTML = this.qr.createSvgTag(
          this.options.cellSize,
          this.options.margin
        );
      },
      onFailure
    );
  }

  createImg(url, onFailure) {
    this.prepareQR(
      url,
      () => {
        this.options.element.innerHTML = this.qr.createImgTag(
          this.options.cellSize,
          this.options.margin
        );
      },
      onFailure
    );
  }

  createTable(url, onFailure) {
    this.prepareQR(
      url,
      () => {
        this.options.element.innerHTML = this.qr.createTableTag(
          this.options.cellSize,
          this.options.margin
        );
      },
      onFailure
    );
  }
}
