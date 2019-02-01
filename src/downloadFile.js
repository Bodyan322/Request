/* eslint-disable*/
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
  // eslint-disable-next-line no-undef
  document.querySelector('.second').disabled = true;
  inptText.value = '';
};