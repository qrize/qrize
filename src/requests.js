export function simpleHttpRequest(method, url, success, failure) {
  const request = new XMLHttpRequest();
  request.open(method, url, true);
  request.send(null);
  request.onreadystatechange = function onreadystatechange() {
    if (request.readyState === 4) {
      if (request.status === 200) success(request.responseText);
      else if (failure) failure(request.status, request.statusText);
    }
  };
}

export function get(url, success, failure) {
  simpleHttpRequest("GET", url, success, failure);
}

export function getJSON(url, success, failure) {
  get(
    url,
    response => {
      success(JSON.parse(response));
    },
    failure
  );
}
