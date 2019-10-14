'use strict';

import './modal.sass'

initModal('.button-enter', '.modal-enter');
initModal('.button-reg-comp', '.modal-reg-comp');
initModal('.button-reg-fiz', '.modal-reg-fiz');
initModal('.button-mail-confirm', '.modal-mail-confirm');

function showModal(modal) {
  modal.classList.remove("modal-hidden");
  document.body.style.overflowY = "hidden";
}

function hideModal(modal) {
  modal.classList.add("modal-hidden");
  document.body.style.overflowY = "";
}


function initModal(btn, modal) {
  const modalCurrent = document.querySelector(modal),
    allButtons = document.querySelectorAll(btn),
    closeBtn = modalCurrent.querySelector('.btn-close');

  //Добававляем обработчик событий для кнопок открытия модального окна
  for( let i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener('click', function() {
      showModal(modalCurrent);
    });
  }

  //Обработка кнопки закрытия
  closeBtn.onclick = () => hideModal(modalCurrent);

  //Закрытие модального окна при клике мимо
  modalCurrent.onclick = function(e) {
    if(!e.target.closest('.modal__body')) {
      hideModal(modalCurrent);
    }
  }
}