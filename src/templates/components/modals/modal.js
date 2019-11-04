'use strict';

import './modal.sass'
import './modal-skills/modal-skills'
import './modal-offer/modal-offer'

initModal('.button-enter', '.modal-enter');
initModal('.button-reg-comp', '.modal-reg-comp');
initModal('.button-reg-fiz', '.modal-reg-fiz');
initModal('.button-mail-confirm', '.modal-mail-confirm');
initModal('.button-tel-confirm', '.modal-tel-confirm');
initModal('.button-pass', '.modal-pass');
initModal('.button-real-mail', '.modal-real-mail');
initModal('.button-real-tel', '.modal-real-tel');
initModal('.button-i-elect', '.modal-i-elect');
initModal('.button-my-elect', '.modal-my-elect');
initModal('.button-skills', '.modal-skills');
initModal('.button-report', '.modal-report');
initModal('.button-tasks', '.modal-tasks');
initModal('.button-tariff', '.modal-tariff');
initModal('.button-offer', '.modal-offer');

function showModal(modal) {
  modal.classList.remove("modal-hidden");
  // document.body.style.overflowY = "hidden";
}

function hideModal(modal) {
  modal.classList.add("modal-hidden");
  // document.body.style.overflowY = "";
}

function initModal(btn, modal) {
  if(!document.querySelector(modal) || !document.querySelectorAll(btn)) {
    return;
  }

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