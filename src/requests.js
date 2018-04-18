// @flow

import type { HashUrlPair, OnRequestFailureCallback } from "./types";

type RequestParams = {|
  url: string,
  onSuccess?: (json: string) => void,
  onFailure?: OnRequestFailureCallback,
|};

type ExtendedRequestParams = {
  ...RequestParams,
  method: "GET" | "POST",
};

type JsonRequestParams = {
  ...RequestParams,
  onSuccess?: HashUrlPair => void,
};

type PreparedCallbackFunction = (...Array<mixed>) => void;

export function prepareCallback(callback: mixed): PreparedCallbackFunction {
  return typeof callback === "function" ? callback : () => {};
}

export function simpleHttpRequest({
  method,
  url,
  onSuccess,
  onFailure,
}: ExtendedRequestParams) {
  const success = prepareCallback(onSuccess);
  const failure = prepareCallback(onFailure);
  const request = new XMLHttpRequest();
  request.open(method, url, true);
  request.send(null);
  request.onreadystatechange = function onReadyStateChange() {
    if (request.readyState === 4) {
      if (request.status === 200) success(request.responseText);
      else failure(request.status, request.responseText);
    }
  };
}

export function get({ url, onSuccess, onFailure }: RequestParams) {
  simpleHttpRequest({
    method: "GET",
    url,
    onSuccess,
    onFailure,
  });
}

export function getJSON({ url, onSuccess, onFailure }: JsonRequestParams) {
  const success = prepareCallback(onSuccess);
  get({
    url,
    onSuccess: response => success(JSON.parse(response)),
    onFailure,
  });
}
