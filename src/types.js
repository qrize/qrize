// @flow

import type ErrorCorrectionLevel from "qrcode-generator";

export type HashUrlPair = { hash: string, url: string };

export type OnRequestSuccessCallback = HashUrlPair => void;

export type OnRequestFailureCallback = (
  status: number,
  responseText: string
) => void;

export type QrizeOptionsInternal = {
  element: Element,
  cellSize: number,
  margin: number,
  version: 0,
  level: ErrorCorrectionLevel,
};
