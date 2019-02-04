/* global  HttpRequest, util, onUploadProgress, onDownloadProgress filesList*/
const listOpenBtn = document.querySelector('.open-list-btn');
const listWrapper = document.querySelector('.download-list-wrap');
// const listFilesContainer = document.querySelector('.download-list');
const closeBtnList = document.querySelector('.download-list-wrap span');
const inputUpload = document.getElementById('download');
const btnUpload = document.querySelector('.first');
const btnDownload = document.querySelector('.second');
const uploadLabel = document.querySelector('.svg-icon span');
const inptText = document.querySelector('.text-field');
const imgWrapper = document.querySelector('.download-img-wrap');
const { showImgOnPage, downloadFile, changeStatusBtn, changeInputFileValue } = util;

document.getElementById('uploadForm').onsubmit = function(e) {
  e.preventDefault();
  const form = new FormData();
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'multipart/form-data');
  form.append('sampleFile', e.target.sampleFile.files[0]);
  const xhr = new HttpRequest({ baseUrl: 'http://localhost:8000' });
  xhr.post('/upload', { downloadProgress: onUploadProgress, data: form });
  document.querySelector('.first').disabled = true;
  filesList();
};

document.getElementById('downloadForm').onsubmit = function(e) {
  e.preventDefault();
  const xhr = new HttpRequest({ baseUrl: 'http://localhost:8000' });
  xhr.get(`/files/${e.target[0].value}`, { downloadProgress: onDownloadProgress, responseType: 'blob' })
    .then(data => {
      if (data.type === 'image/jpeg') {
        showImgOnPage(data);
      } else {
        downloadFile(data);
      }
    })
    .catch(error => {
      throw new Error(error);
    });
  document.querySelector('.second').disabled = true;
  inptText.value = '';
};

function showAndHiddenList(elem) {
  elem.addEventListener('click', function() {
    listWrapper.classList.toggle('active');
    filesList();
  });
}

showAndHiddenList(listOpenBtn);
showAndHiddenList(closeBtnList);
changeStatusBtn(inputUpload, btnUpload);
changeStatusBtn(inptText, btnDownload);
changeInputFileValue(inputUpload, uploadLabel);