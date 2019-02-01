const progr = document.getElementById('progress');
const imgWrapper = document.querySelector('.download-img-wrap');


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

