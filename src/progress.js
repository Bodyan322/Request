const progr = document.getElementById('progress');
const btnUpload = document.querySelector('.first');
const inputUpload = document.getElementById('download');
const uploadLabel = document.querySelector('.svg-icon span');
const btnDownload = document.querySelector('.second');
const inptText = document.querySelector('.text-field');
const imgWrapper = document.querySelector('.download-img-wrap');


const listOpenBtn = document.querySelector('.open-list-btn');
const listWrapper = document.querySelector('.download-list-wrap');
const listFilesContainer = document.querySelector('.download-list');
const closeBtnList = document.querySelector('.download-list-wrap span');

function changeStatusBtn(elem, btn) {
  elem.addEventListener('input', function() {
    if (elem.value !== '') {
      btn.disabled = false;
    } else {
      btn.disabled = true;
    }
  });
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
function onDownloadProgress(event) {
  const percentage = Math.round(event.loaded / event.total * 100);
  progr.style.opacity = 1;
  progr.style.width = `${percentage}%`;
  document.title = `${percentage}%`;
  setTimeout(() => {
    document.title = 'FORM';
    progr.style.opacity = 0;
    progr.style.width = '0%';
  }, 2000);
}
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


function addElementsToFilesList(files) {
  files.forEach(item => {
    const fileElem = document.createElement('li');
    fileElem.innerHTML = item;
    listFilesContainer.appendChild(fileElem);
  });
}

function clearFilesList() {
  Array.from(listFilesContainer.children).forEach(item => {
    listFilesContainer.removeChild(item);
  });
}

function filesList() {
  const r = new HttpRequest({ baseUrl: 'http://localhost:8000/' });
  r.get('/list', { responseType: 'json' })
    .then(data => {
      clearFilesList();
      addElementsToFilesList(data);
    });
}

function showAndHiddenList(elem) {
  elem.addEventListener('click', function() {
    listWrapper.classList.toggle('active');
    filesList();
  });
}

document.getElementById('uploadForm').onsubmit = function(e) {
  e.preventDefault();
  const form = new FormData();
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'multipart/form-data');
  form.append('sampleFile', e.target.sampleFile.files[0]);
  // eslint-disable-next-line no-undef
  const xhr = new HttpRequest({ baseUrl: 'http://localhost:8000' });
  xhr.post('/upload', { onDownloadProgress, data: form });
  btnUpload.disabled = true;
  filesList();
};

document.getElementById('downloadForm').onsubmit = function(e) {
  e.preventDefault();
  // eslint-disable-next-line no-undef
  const xhr = new HttpRequest({ baseUrl: 'http://localhost:8000' });
  xhr.get(`/files/${e.target[0].value}`, { onDownloadProgress, responseType: 'blob' })
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
  btnDownload.disabled = true;
};

changeStatusBtn(inputUpload, btnUpload);
changeStatusBtn(inptText, btnDownload);
changeInputFileValue(inputUpload, uploadLabel);


showAndHiddenList(listOpenBtn);
showAndHiddenList(closeBtnList);

