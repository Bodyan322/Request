(function() {
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
    // downloadFile,
    changeInputFileValue,
    changeStatusBtn
  };
}());