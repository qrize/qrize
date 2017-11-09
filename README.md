# qrize

[![Build Status](https://travis-ci.org/qrize/qrize.svg?branch=master)](https://travis-ci.org/qrize/qrize)
[![Coverage Status](https://coveralls.io/repos/github/qrize/qrize/badge.svg?branch=master)](https://coveralls.io/github/qrize/qrize?branch=master)

JavaScript client for generating **tiny** QR codes of your web pages.

## Why qrize?

`qrize` integrates with URL shortener service, giving you tiny QR codes no matter how long a URL is.

Compare these QR codes that lead to the same [long address](https://www.amazon.com/b/ref=s9_acss_bw_en_BGG15eve_d_1_9_w?_encoding=UTF8&node=25&pf_rd_m=ATVPDKIKX0DER&pf_rd_s=merchandised-search-top-3&pf_rd_r=5NYMKAJQQQB3H3J1XTES&pf_rd_r=5NYMKAJQQQB3H3J1XTES&pf_rd_t=101&pf_rd_p=c0b03f4d-c947-45e3-9b66-2bd220509181&pf_rd_p=c0b03f4d-c947-45e3-9b66-2bd220509181&pf_rd_i=283155) (313 symbols):

| Regular QR code :hankey:                                                            | QR code you get with qrize :+1:                                                                |
|-------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| ![Regular QR code](https://raw.githubusercontent.com/qrize/qrize/assets/big_qr.gif) | ![QR code you get with qrize](https://raw.githubusercontent.com/qrize/qrize/assets/qrized1.gif) |

Having QR codes smaller makes it more reader-friendly, saves space on page and is awesome. Visit [qrize.me](http://qrize.me) for general information.


## How to install?

To install qrize with Yarn, run:

```sh
yarn add qrize
```

To install qrize with npm, run:

```sh
npm install --save qrize
```

If you don’t want to use npm to manage client packages, `qrize` package also provides single-file distributions, which is hosted on a CDN:

```html
<script src="https://unpkg.com/qrize/dist/qrize.umd.js"></script>
```

## How to use?

```js
import Qrize from "qrize";

const qrize = new Qrize({
  element: document.getElementById("qr-target")
});
qrize.createImg();
```

That's it. The element with id `#qr-target` will contain `<img>` tag representing a QR code that leads to current location (`window.location.href`). You can set any custom URL. Instead of `<img>` tag you can draw the QR code using `<svg>` or `<table>`. See [API](#user-content-api) section for details.

If you use UMD package from CDN, `Qrize` constuctor is available globally.

## API

`Qrize` constuctor takes an options object as a parameter and these are available properties:

| Name     | Type        | Required | Description                                                                                                                                            |
|----------|-------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| element  | DOM Element | yes      | Container element for the generated QR code.                                                                                                           |
| cellSize | Number      | no       | Size of each grid cell in pixels. Default: `2`.                                                                                                        |
| margin   | Number      | no       | Margin size around the QR code in pixels. Note that you might want to leave some space around your QR code in order to make it readable. Default: `0`. |

Instantiated object returned by `new Qrize()` has three methods with pretty straightforward purposes:

- `createImg()`
- `createSvg()`
- `createTable()`

Each method can take (not requred) an options object with following parameters:

| Name      | Type     | Required | Description                                                                                           |
|-----------|----------|----------|-------------------------------------------------------------------------------------------------------|
| url       | String   | no       | A URL that QR code will lead to. Defaults to a current page address. Default: `window.location.href`. |
| onSuccess | Function | no       | A callback that will be called after successful QR code build.                                        |
| onFailure | Function | no       | A callback that will be called after attempt to build a QR code has been failed.                      |

There are also static `Qrize` methods that communicate with `qrize.me` API directly:

- `getHash()` - get unique hash id of the given URL. Options properties:

| Name      | Type     | Required | Description                                                                                                                              |
|-----------|----------|----------|------------------------------------------------------------------------------------------------------------------------------------------|
| url       | String   | yes      | A URL you want to get a hash id of.                                                                                                      |
| onSuccess | Function | no       | A callback that will be called on successful API response. Is invoked with an object that has two properties: `hash` and provided `url`. |
| onFailure | Function | no       | A callback that will be called if request failed. Is invoked with two arguments: error status code and error message.                    |

- `getUrl()` - get URL of the given hash id. Params

| Name      | Type     | Required | Description                                                                                                                              |
|-----------|----------|----------|------------------------------------------------------------------------------------------------------------------------------------------|
| hash      | String   | yes      | A hash id you want to get a URL of.                                                                                                      |
| onSuccess | Function | no       | A callback that will be called on successful API response. Is invoked with an object that has two properties: `url` and provided `hash`. |
| onFailure | Function | no       | A callback that will be called if request failed. Is invoked with two arguments: error status code and error message.                    |

You probably won't need them, but if you will you can use them like this:

```js
import Qrize from "qrize";

Qrize.getHash({
  url: 'http://example.com',
  onSuccess({ hash }) {
    console.log(hash);
  }
})

Qrize.getUrl({
  url: '8jLDWGQ',
  onSuccess({ url }) {
    console.log(url);
  }
})
```

## LICENSE

MIT

QR Code is registered trademark of [DENSO WAVE INCORPORATED](http://www.denso-wave.com/en/).

http://www.qrcode.com/en/faq.html#patentH2Title
