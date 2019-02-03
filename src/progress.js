(function() {
  const progrDownload = document.querySelector('.progress-download');
  const progrUpload = document.querySelector('.progress-upload');
  const percentageProgressDownload = document.querySelector('title');
  const percentageProgressUpload = document.querySelector('.percentage-progress');
  // const imgWrapper = document.querySelector('.download-img-wrap');


  function clearProgressLine(NodeElement, shownElement) {
    if (shownElement === document.querySelector('title')) {
      shownElement.innerHTML = 'FORM';
    }
    shownElement.classList.remove('active');
    NodeElement.style.opacity = 0;
    NodeElement.style.width = '0%';
  }


  function onDownloadProgress(event, NodeElement, showElement) {
    const percentage = Math.round(event.loaded / event.total * 100);
    NodeElement.style.opacity = 1;
    NodeElement.style.width = `${percentage}%`;
    NodeElement.style.background = 'linear-gradient(90deg, #aea4e3, #d3ffe8)';
    showElement.classList.add('active');
    showElement.innerHTML = `${percentage}%`;
    setTimeout(clearProgressLine, 1500, NodeElement, showElement);
  }
  window.onUploadProgress = event => onDownloadProgress(event, progrUpload, percentageProgressUpload);
  window.onDownloadProgresss = event => onDownloadProgress(event, progrDownload, percentageProgressDownload);
}());

// function showImgOnPage(data) {
//   const imgSrc = window.URL.createObjectURL(data, { type: `${data.type}` });
//   document.getElementById('download-img').src = imgSrc;
// }

