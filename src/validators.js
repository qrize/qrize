import {
  InvalidErrorCorrectionLevel,
  InvalidQRVersion,
  InvalidElement
} from "./exceptions";
import * as constants from "./constants";

export default function validateOptions(options) {
  const { element, version, level, cellSize, margin } = options;

  if (!(element instanceof Element)) {
    throw new InvalidElement(element);
  }

  if (!(version >= 0 && version <= 40)) {
    throw new InvalidQRVersion(version);
  }

  if (!constants.ERROR_CORRECTION_LEVELS[level]) {
    throw new InvalidErrorCorrectionLevel(level);
  }

  if (Number.isNaN(parseInt(cellSize, 10))) {
    throw new TypeError(
      `Invalid "cellSize": ${cellSize}. Should be an integer`
    );
  }

  if (Number.isNaN(parseInt(margin, 10))) {
    throw new TypeError(`Invalid "margin": ${margin}. Should be an integer`);
  }

  return true;
}
