import './input.sass'

validateAllEmails();

function validateAllEmails() {
  const inputsField = document.querySelectorAll('.input__field[type="email"]');

  for(let i = 0; i < inputsField.length; i++) {
    inputsField[i].addEventListener("focusout", function () {
      valdateEmail(inputsField[i])
    });
  }

}

function valdateEmail(input) {
  const error = input.nextElementSibling;
  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const inputBlock = input.parentNode;

  if (input.value === '') {
    error.innerHTML = 'Поле не должно быть пустым';
    inputBlock.classList.remove('input_success');
    inputBlock.classList.add('input_error');
  } else if (!regex.test(input.value)) {
    error.innerHTML = 'E-mail введен неверно';
    inputBlock.classList.remove('input_success');
    inputBlock.classList.add('input_error');
  } else {
    error.innerHTML = '';
    inputBlock.classList.add('input_success');
    inputBlock.classList.remove('input_error');
  }
}