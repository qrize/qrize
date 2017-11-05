import { ERROR_CORRECTION_LEVELS } from "./constants";

function isNumber(value) {
  return !Number.isNaN(parseInt(value, 10));
}

function isInteger(value) {
  return isNumber(value) && !(value % 1);
}

export function validateElementOption(element) {
  if (!(element instanceof Element)) {
    throw new TypeError(
      `Invalid "element": ${element}. Must be an instance of Element`
    );
  }
}

export function validateCellSizeOption(cellSize) {
  if (!isNumber(cellSize)) {
    throw new TypeError(`Invalid "cellSize": ${cellSize}. Must be a number`);
  }

  if (cellSize < 0) {
    throw new RangeError(
      `Invalid "cellSize": ${cellSize}. Must be greater than zero`
    );
  }
}

export function validateMarginOption(margin) {
  if (!isNumber(margin)) {
    throw new TypeError(`Invalid "margin": ${margin}. Must be a number`);
  }

  if (margin < 0) {
    throw new RangeError(
      `Invalid "margin": ${margin}. Must be greater than zero`
    );
  }
}

export function validateVersionOption(version) {
  if (!isInteger(version)) {
    throw new TypeError(`Invalid "version": ${version}. Must be an integer`);
  }

  if (!(version >= 0 && version <= 40)) {
    throw new RangeError(
      `Invalid "version": ${version}. Must be between 0 and 40`
    );
  }
}

export function validateLevelOption(level) {
  if (!ERROR_CORRECTION_LEVELS[level]) {
    const validValues = Object.keys(ERROR_CORRECTION_LEVELS).join(", ");
    throw new Error(
      `Invalid error correction level: ${this.value}. ` +
        `Should be one of these: ${validValues}`
    );
  }
}

export function validateOptions(options) {
  validateElementOption(options.element);
  validateCellSizeOption(options.cellSize);
  validateMarginOption(options.margin);
  validateVersionOption(options.version);
  validateLevelOption(options.level);
  return true;
}
