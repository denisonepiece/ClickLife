import './textarea.sass'
import '../input/input'

// const textarea = document.querySelector('.textarea');
// const maxChars = 200;

// function syncOnChange(textarea) {
//   const textareaField = textarea.querySelector('.textarea__field');
//   const textareaCounter = textarea.querySelector('.textarea__counter');
//
//   textareaField.addEventListener('keyup', function () {
//     let counter = howChars(textareaField);
//     updateCounter(textareaCounter, counter, maxChars);
//   });
//
//   textareaField.addEventListener('focusout', function () {
//     validateTextarea(this);
//   });
// }
//
// function updateCounter(counter, value, max) {
//   counter.innerHTML = value + '/' + max;
// }
//
// function howChars(input) {
//   console.log(input.value.length);
//   return input.value.length;
// }
//
// function validateTextarea(input) {
//   const inputBlock = input.parentNode;
//   const error = inputBlock.querySelector('.input__message');
//   let counter = howChars(input);
//
//
//   if (counter < 100) {
//     error.innerHTML = 'Недостаточно символов';
//     inputBlock.classList.remove('input_success');
//     inputBlock.classList.add('input_error');
//   } else if (counter > maxChars) {
//     error.innerHTML = 'Недопустимое кол. символов';
//     inputBlock.classList.remove('input_success');
//     inputBlock.classList.add('input_error');
//   } else if (counter < maxChars) {
//     error.innerHTML = '';
//     inputBlock.classList.add('input_success');
//     inputBlock.classList.remove('input_error');
//   }
// }
//
// if (textarea) {
//   syncOnChange(textarea);
// }
