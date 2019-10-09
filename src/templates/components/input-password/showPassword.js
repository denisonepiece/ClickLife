export function initAllInputsPass() {
  const inputsPass = document.querySelectorAll('.input-password');

  for( let i = 0; i < inputsPass.length; i++) {
    showPassword(inputsPass[i]);
  }
}

function showPassword(inputBlock) {
  const inputField = inputBlock.querySelector('input');
  const showBtn = inputBlock.querySelector('.input-password__show-btn');
  let isShow = false;

  showBtn.addEventListener('click', function () {
    isShow = !isShow;
    inputField.focus();

    if (isShow) {
      inputField.setAttribute('type', 'text')
    } else {
      inputField.setAttribute('type', 'password')
    }
  });
  
  inputField.addEventListener('focusout', function () {
    inputField.setAttribute('type', 'password')
  })
}

