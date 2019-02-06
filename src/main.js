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
const { changeStatusBtn } = util;

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

function showImgOnPage(data) {
  const imgSrc = window.URL.createObjectURL(data, { type: `${data.type}` });
  document.getElementById('download-img').src = imgSrc;
}

function downloadFile(data) {
  const downloadURL = URL.createObjectURL(data, { type: data.type });
  const fileLink = document.createElement('a');
  document.body.appendChild(fileLink);
  fileLink.style.display = 'none';
  fileLink.href = downloadURL;
  fileLink.download = data.type;
  fileLink.click();
  document.body.removeChild(fileLink);
}

function changeInputFileValue(elem, titleValue) {
  elem.addEventListener('change', function() {
    if (elem.value !== '') {
      titleValue.innerHTML = elem.value.replace(/.*\\/, '');
    } else {
      titleValue.innerHTML = 'Choose your file';
    }
  });
}
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