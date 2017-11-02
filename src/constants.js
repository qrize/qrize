export const ENDPOINTS = {
  getHash: "http://qrize.me/get-hash/<url>",
  getUrl: "http://qrize.me/get-url/<hash>",
  redirector: "http://qrize.me/<hash>"
};

export const ERROR_CORRECTION_LEVELS = {
  L: 1, // 7%
  M: 2, // 15%
  Q: 3, // 25%
  H: 4 // 30%
};
