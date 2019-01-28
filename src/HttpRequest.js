function applyHeaders(XHR, headers) {
  for (const key in headers) {
    XHR.setRequestHeader(key, headers[key]);
  }
}
function generateURL(constructorURL, methodURL, parameters) {
  const url = new URL(methodURL, constructorURL);

  for (const key in parameters) {
    url.searchParams.set(key, parameters[key]);
  }
  return url;
}
class HttpRequest {
  // get request options({ baseUrl, headers })
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  // eslint-disable-next-line class-methods-use-this
  get(url, config) {
    const XHR = new XMLHttpRequest();
    const { headers, params, responseType = 'json', onDownloadProgress } = config;

    const finalUrl = generateURL(this.baseUrl, url, params);

    return new Promise((resolve, reject) => {
      XHR.open('GET', finalUrl);
      XHR.responseType = responseType;

      applyHeaders(XHR, this.headers);
      applyHeaders(XHR, headers);

      XHR.onprogress = event => onDownloadProgress(event);

      XHR.onreadystatechange = () => {
        if (XHR.readyState === 4) {
          resolve(XHR.response);
        } else if (XHR.status !== 200) {
          reject(XHR.status);
        }
      };
      XHR.send();
    });
    // write code this
  }

  // eslint-disable-next-line class-methods-use-this
  post(url, config) {
    // code here
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