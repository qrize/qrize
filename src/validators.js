// @flow

import type { ErrorCorrectionLevel, TypeNumber } from "qrcode-generator";
import { ERROR_CORRECTION_LEVELS } from "./constants";
import type { QrizeOptionsInternal } from "./types";

function isNumber(value) {
  return !Number.isNaN(parseInt(value, 10));
}

function isInteger(value) {
  return isNumber(value) && !(value % 1);
}

const urlRegExp: {
  scheme: RegExp,
  domain: RegExp,
  ip: RegExp,
  port: RegExp,
  query: RegExp,
  composed: RegExp,
} = {
  scheme: /((?:http|ftp)s?:\/\/)/,
  domain: /(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)/,
  ip: /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/,
  port: /(?::\d+)/,
  query: /(?:\/?|[/?]\S+)/,
  composed: /.*/,
};

urlRegExp.composed = new RegExp(
  `^${urlRegExp.scheme.source}?` +
    `(?:${urlRegExp.domain.source}|localhost|${urlRegExp.ip.source})` +
    `${urlRegExp.port.source}?` +
    `${urlRegExp.query.source}$`,
  "i"
);

export function validateUrl(url: string) {
  if (!urlRegExp.composed.test(url)) {
    throw new Error(`Invalid "url": ${url}`);
  }
}

export function validateElementOption(element: Element) {
  if (!(element instanceof Element)) {
    throw new TypeError(
      `Invalid "element": ${element}. Must be an instance of Element`
    );
  }
}

export function validateCellSizeOption(cellSize: number) {
  if (!isNumber(cellSize)) {
    throw new TypeError(`Invalid "cellSize": ${cellSize}. Must be a number`);
  }

  if (cellSize < 0) {
    throw new RangeError(
      `Invalid "cellSize": ${cellSize}. Must be greater than zero`
    );
  }
}

export function validateMarginOption(margin: number) {
  if (!isNumber(margin)) {
    throw new TypeError(`Invalid "margin": ${margin}. Must be a number`);
  }

  if (margin < 0) {
    throw new RangeError(
      `Invalid "margin": ${margin}. Must be greater than zero`
    );
  }
}

export function validateVersionOption(version: TypeNumber) {
  if (!isInteger(version)) {
    throw new TypeError(`Invalid "version": ${version}. Must be an integer`);
  }

  if (!(version >= 0 && version <= 40)) {
    throw new RangeError(
      `Invalid "version": ${version}. Must be between 0 and 40`
    );
  }
}

export function validateLevelOption(level: ErrorCorrectionLevel) {
  if (!ERROR_CORRECTION_LEVELS[level]) {
    const validValues = Object.keys(ERROR_CORRECTION_LEVELS).join(", ");
    throw new Error(
      `Invalid error correction level: ${level}. ` +
        `Should be one of these: ${validValues}`
    );
  }
}

export function validateOptions(options: QrizeOptionsInternal) {
  validateElementOption(options.element);
  validateCellSizeOption(options.cellSize);
  validateMarginOption(options.margin);
  validateVersionOption(options.version);
  validateLevelOption(options.level);
  return true;
}
