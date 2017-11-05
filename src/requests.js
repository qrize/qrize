export function prepareCallback(callback) {
  return typeof callback === "function" ? callback : () => {};
}

export function simpleHttpRequest(method, url, onSuccess, onFailure) {
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

export function get(url, onSuccess, onFailure) {
  simpleHttpRequest("GET", url, onSuccess, onFailure);
}

export function getJSON(url, onSuccess, onFailure) {
  const success = prepareCallback(onSuccess);
  get(url, response => success(JSON.parse(response)), onFailure);
}
