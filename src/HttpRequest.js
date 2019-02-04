class HttpRequest {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  static generateURL(urlString, baseURLString, parameters) {
    const url = new URL(urlString, baseURLString);

    for (const key in parameters) {
      url.searchParams.set(key, parameters[key]);
    }
    return url;
  }

  __request(url, method, config) {
    const XHR = new XMLHttpRequest();
    const { headers, downloadProgress, params, responseType = 'json', data } = config;
    const finalURL = HttpRequest.generateURL(url, this.baseUrl, params);
    const headersObj = { ...headers, ...this.headers };

    return new Promise((resolve, reject) => {
      XHR.open(method, finalURL);
      XHR.responseType = responseType;

      Object.entries(headersObj).forEach(([key, value]) => {
        XHR.setRequestHeader(key, value);
      });

      XHR.onprogress = downloadProgress;

      XHR.onreadystatechange = () => {
        if (XHR.readyState === 4 && XHR.status === 200) {
          resolve(XHR.response);
        } else if (XHR.status !== 200) {
          reject(XHR.status);
        }
      };

      if (data) {
        XHR.send(data);
      } else {
        XHR.send();
      }
    });
  }
  get(url, config) {
    return this.__request(url, 'GET', config);
  }

  post(url, config) {
    return this.__request(url, 'POST', config);
  }
}
