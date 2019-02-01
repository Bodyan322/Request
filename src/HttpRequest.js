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
    const { headers, onDownloadProgress, params, responseType = 'json', data } = config;
    const finalURL = HttpRequest.generateURL(url, this.baseUrl, params);
    const headersObj = { ...headers, ...this.headers };

    return new Promise((resolve, reject) => {
      XHR.open(method, finalURL);
      XHR.responseType = responseType;

      Object.entries(headersObj).forEach(([key, value]) => {
        XHR.setRequestHeader(key, value);
      });

      XHR.onprogress = onDownloadProgress;

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

/*
const reuest = new HttpRequest({
  baseUrl: 'http://localhost:3000',
});
reuest.get('/user/12345', { onDownloadProgress, headers: {contentType: undefined} })
  .then(response => {
    console.log(response);
  })
  .catch(e => {
    console.log(e)
  });
reuest.post('/save', { data: formdata, header, onUploadProgress })
  .then(response => {
    console.log(response);
  })
  .catch(e => {
    console.log(e)
  });
config = {
  // `transformResponse` allows changes to the response data to be made before
  // it is passed to then/catch
  transformResponse: [function (data) {
    // Do whatever you want to transform the data
    return data;
  }],
  // `headers` are custom headers to be sent
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  // `params` are the URL parameters to be sent with the request
  // Must be a plain object or a URLSearchParams object
  params: {
    ID: 12345
  },
  // `data` is the data to be sent as the request body
  // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
  // When no `transformRequest` is set, must be of one of the following types:
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - Browser only: FormData, File, Blob
  // - Node only: Stream, Buffer
  data: {
    firstName: 'Fred'
  },
  // `responseType` indicates the type of data that the server will respond with
  // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // default
  // `onUploadProgress` allows handling of progress events for uploads
  onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },
  // `onDownloadProgress` allows handling of progress events for downloads
  onDownloadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },
}
*/