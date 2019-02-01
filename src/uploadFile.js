/* eslint-disable*/
document.getElementById('uploadForm').onsubmit = function(e) {
  e.preventDefault();
  const form = new FormData();
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'multipart/form-data');
  form.append('sampleFile', e.target.sampleFile.files[0]);
  const xhr = new HttpRequest({ baseUrl: 'http://localhost:8000' });
  xhr.post('/upload', { onDownloadProgress, data: form });
  document.querySelector('.first').disabled = true;
  filesList();
};