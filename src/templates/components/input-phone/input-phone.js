"use strict";

import './input-phone.sass';
import '../tooltip/tooltip'
import Inputmask from 'inputmask';

Inputmask({"mask": "+7 (999) 999-99-99"}).mask('input[type="tel"]');

const input = document.querySelector('input[type="tel"]');

function validateInputPhone(input) {
  const codes = [3, 4, 5, 6, 8, 9];
  codes.includes(+input.value[4]);

  input.addEventListener('keyup', function () {
      if(input.value[input.value.length - 1] !== '_') {

      }
  });
}

validateInputPhone(input);

