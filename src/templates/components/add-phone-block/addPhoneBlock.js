"use strict";

import './add-phone-block.sass'
import '../input-phone/input-phone'
import Inputmask from 'inputmask';

addPhoneBlock();

function addPhoneBlock() {
  const PhonesBlock = document.querySelector('.phones-block');
  const addPhoneBtn = PhonesBlock.querySelector('.add-phone-button');
  const inputBlock = PhonesBlock.querySelector('.input-phone');


  function onFocusInputs(block) {
    const inputs = block.querySelectorAll('input[type="tel"]');

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener('focus', function () {
        inputs[i].parentNode.parentNode.classList.add('-input-focus-');
      });

      inputs[i].addEventListener('focusout', function () {
        inputs[i].parentNode.parentNode.classList.remove('-input-focus-');
      });
    }
  }


  document.addEventListener("DOMContentLoaded", function () {
    if (howElementsOnPage('.input-phone') === 3) {
      addPhoneBtn.remove();
    }

    onFocusInputs(PhonesBlock);
  });

  addPhoneBtn.addEventListener('click', function (e) {
    e.preventDefault();
    //Клонирование и сброс значений
    const inputClone = inputBlock.cloneNode(true);
    const checkboxes = inputClone.querySelectorAll('input[type="checkbox"]');
    // inputClone.querySelector('.input__field').value = '';
    // for( let i = 0; i < checkboxes.length; i++) {
    //   checkboxes[i].checked = false;
    // }

    let count = document.querySelectorAll('.input__field').length - 1;
    inputClone.querySelector('.input__field').name = inputClone.querySelector('.input__field').name.replace(/phones\[.*\]\[(.*)\]/, "phones[" + count + "][$1]");
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].name = checkboxes[i].name.replace(/phones\[.*\]\[(.*)\]/, "phones[" + count + "][$1]");
      checkboxes[i].checked = false;
    }

    addPhoneBtn.before(inputClone);
    inputClone.focus();
    Inputmask({
      "mask": "+7 (999) 999-99-99",
    }).mask('input[type="tel"]');

    onFocusInputs(PhonesBlock);
    if (howElementsOnPage('.input-phone') === 3) {
      addPhoneBtn.remove();
    }
  });
}

function howElementsOnPage(selector) {
  const elements = document.querySelectorAll(selector);

  return elements.length;
}

