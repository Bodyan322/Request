document.getElementById('uploadForm').onsubmit = function(e) {
  e.preventDefault();
  const form = new FormData();
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'multipart/form-data');
  form.append('sampleFile', e.target.sampleFile.files[0]);
  fetch('http://localhost:8000/upload', {
    method: 'POST',
    body: form
  });
};

// eslint-disable-next-line no-undef
const reuest = new HttpRequest({
  baseUrl: 'http://localhost:8000'
});

reuest.get('/ping')
  .then(response => {
    // eslint-disable-next-line no-console
    console.log(response);
  })
  .catch(e => {
    // eslint-disable-next-line no-console
    console.log(e);
  });