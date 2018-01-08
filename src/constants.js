export const ENDPOINTS = {
  getHash: "https://qrize.me/get-hash/<url>",
  getUrl: "https://qrize.me/get-url/<hash>",
  redirector: "https://qrize.me/<hash>",
};

export const ERROR_CORRECTION_LEVELS = {
  L: 1, // 7%
  M: 2, // 15%
  Q: 3, // 25%
  H: 4, // 30%
};
