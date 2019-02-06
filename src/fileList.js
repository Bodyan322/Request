/* global xhr*/
const listFilesContainer = document.querySelector('.download-list');

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

function listOfUploadFiles() {
  // eslint-disable-next-line no-undef
  // const req = new HttpRequest({ baseUrl: 'http://localhost:8000/' });
  xhr.get('/list', { responseType: 'json' })
    .then(data => {
      clearFilesList();
      addElementsToFilesList(data);
    });
}
