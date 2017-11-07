# qrize

[![Build Status](https://travis-ci.org/qrize/qrize.svg?branch=master)](https://travis-ci.org/qrize/qrize)
[![Coverage Status](https://coveralls.io/repos/github/qrize/qrize/badge.svg?branch=master)](https://coveralls.io/github/qrize/qrize?branch=master)

JavaScript client for [qrize.me](http://qrize.me) API


## How to install?

To install qrize with Yarn, run:

```sh
yarn add qrize
```

To install qrize with npm, run:

```sh
npm install --save qrize
```

If you don’t want to use npm to manage client packages, qrize package also provides single-file distributions, which is hosted on a CDN:

```html
<script src="https://unpkg.com/qrize/dist/qrize.umd.js"></script>
```

## How to use?

```js
import Qrize from "qrize";

const qrize = new Qrize({
  element: document.getElementById("qr-target"),
  cellSize: 5
});
qrize.createImg();
```

That's it. Element with id `#qr-target` will contain `<img>` tag representing a QR code that leads to current location (`window.location.href`). You can set any custom URL. Instead of `<img>` tag you can draw the QR code using `<svg>` or even `<table>`. See [API](#user-content-api) section for details.

If you use UMD package, `Qrize` constuctor will be available globally.

## API



## LICENSE

MIT

QR Code is registered trademark of [DENSO WAVE INCORPORATED](http://www.denso-wave.com/en/).

http://www.qrcode.com/en/faq.html#patentH2Title
