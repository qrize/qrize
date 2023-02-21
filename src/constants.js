// @flow

export const API_ROOT = "https://qrize.me/f/p/r";

export const ENDPOINTS = {
  getHash: `${API_ROOT}/?url=<url>`,
  getUrl: `${API_ROOT}/?hash=<hash>`,
  redirector: `${API_ROOT}/<hash>`,
};

export const ERROR_CORRECTION_LEVELS = {
  L: 1, // 7%
  M: 2, // 15%
  Q: 3, // 25%
  H: 4, // 30%
};
