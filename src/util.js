(function() {
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

  function changeStatusBtn(elem, btn) {
    elem.addEventListener('input', function() {
      if (elem.value !== '') {
        btn.disabled = false;
      } else {
        btn.disabled = true;
      }
    });
  }

  window.util = {
    showImgOnPage,
    downloadFile,
    changeInputFileValue,
    changeStatusBtn
  };
}());