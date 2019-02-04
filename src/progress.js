(function() {
  const progrDownload = document.querySelector('.progress-download');
  const progrUpload = document.querySelector('.progress-upload');
  const percentageProgressDownload = document.querySelector('title');
  const percentageProgressUpload = document.querySelector('.percentage-progress');

  function clearProgressLine(NodeElement, shownElement) {
    if (shownElement === document.querySelector('title')) {
      shownElement.innerHTML = 'FORM';
    }
    shownElement.classList.remove('active');
    NodeElement.style.opacity = 0;
    NodeElement.style.width = '0%';
  }


  function downloadProgress(event, NodeElement, showElement) {
    const percentage = Math.round(event.loaded / event.total * 100);
    NodeElement.style.opacity = 1;
    NodeElement.style.width = `${percentage}%`;
    NodeElement.style.background = 'linear-gradient(90deg, #aea4e3, #d3ffe8)';
    showElement.classList.add('active');
    showElement.innerHTML = `${percentage}%`;
    setTimeout(clearProgressLine, 1500, NodeElement, showElement);
  }
  window.onUploadProgress = event => downloadProgress(event, progrUpload, percentageProgressUpload);
  window.onDownloadProgress = event => downloadProgress(event, progrDownload, percentageProgressDownload);
}());


