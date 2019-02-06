(function() {
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
    changeStatusBtn
  };
}());