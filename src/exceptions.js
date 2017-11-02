import { ERROR_CORRECTION_LEVELS } from "./constants";

class BaseException extends Error {
  constructor(value) {
    super();
    this.value = value;
  }
}

export class InvalidErrorCorrectionLevel extends BaseException {
  get message() {
    return (
      `Invalid error correction level: ${this.value}. ` +
      `Should be one of these: ${Object.keys(ERROR_CORRECTION_LEVELS)}`
    );
  }
}

export class InvalidQRVersion extends BaseException {
  get message() {
    return (
      `Invalid version: ${this.value}. ` +
      `Should be an integer from 1 to 40, or 0 for auto detection`
    );
  }
}

export class InvalidElement extends BaseException {
  get message() {
    return `Invalid element: ${this.value}. Should be an instance of Element`;
  }
}

export class InvalidOptions extends BaseException {
  get message() {
    return `Invalid options. Reinitialize Qrize with valid options in order to use it's features`;
  }
}
