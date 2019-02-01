const inputUpload = document.getElementById('download');
const btnUpload = document.querySelector('.first');
const btnDownload = document.querySelector('.second');
const uploadLabel = document.querySelector('.svg-icon span');
const inptText = document.querySelector('.text-field');
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

changeStatusBtn(inputUpload, btnUpload);
changeStatusBtn(inptText, btnDownload);
changeInputFileValue(inputUpload, uploadLabel);