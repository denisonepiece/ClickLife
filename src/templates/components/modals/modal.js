'use strict';

import '../checkbox/checkbox';
import './modal.sass';
import './modal-skills/modal-skills';
import './modal-offer/modal-offer';
import '../../../js/registration';
import '../../../js/login';
import './social-sign/handleSocial';
import '../../../js/feedback';
import '../../../js/report';
import '../../../js/connect';
import '../textarea/textarea';

initModal('.button-enter', '.modal-enter');
initModal('.button-reg-comp', '.modal-reg-comp');
initModal('.button-reg-fiz', '.modal-reg-fiz');
// initModal('.button-mail-confirm', '.modal-mail-confirm');
// initModal('.button-tel-confirm', '.modal-tel-confirm');
// initModal('.button-pass', '.modal-pass');
// initModal('.button-real-mail', '.modal-real-mail');
// initModal('.button-real-tel', '.modal-real-tel');
initModal('.button-i-elect', '.modal-i-elect');
initModal('.button-my-elect', '.modal-my-elect');
initModal('.button-skills', '.modal-skills');
initModal('.button-report', '.modal-report');
initModal('.button-tasks', '.modal-tasks');
initModal('.button-tariff', '.modal-tariff');
initModal('.button-offer', '.modal-offer');
initModal('.button-deny', '.modal-deny');
initModal('.button-connect', '.modal-connect');
initModal('.button-feedback', '.modal-feedback');
initModal('.button-wow', '.modal-wow');
initModal('.button-recovery', '.modal-recovery');
initModal('.button-recovery-code', '.modal-recovery-code');
initModal('.button-recovery-pass', '.modal-recovery-pass');
initModal('.button-notice', '.modal-notice');

function showModal(modal) {
  modal.classList.remove('modal-hidden');
  modal.classList.remove('temp-hidden');
  modal.style.overflowY = 'scroll';

  document.body.style.overflowY = 'hidden';
}

function hideModal(modal) {
  modal.classList.add('modal-hidden');
  modal.style.overflowY = '';
  document.body.style.overflowY = '';
  document.body.style.paddingRight = '0px';
}

function hideOpenModals(modal) {
  const allModals = document.querySelectorAll('.modal');
  const currentModalName = modal.classList[1];

  for (let i = 0; i < allModals.length; i++) {
    if (!allModals[i].classList.contains('modal-hidden') && !allModals[i].classList.contains(currentModalName)) {
      allModals[i].classList.add('temp-hidden');
    }
  }
}

function showHideModals() {
  const allModals = document.querySelectorAll('.modal');

  for (let i = 0; i < allModals.length; i++) {
    allModals[i].classList.remove('temp-hidden');
  }
}

function initModal(btn, modal) {
  if (!document.querySelector(modal) || !document.querySelectorAll(btn)) {
    return;
  }

  const modalCurrent = document.querySelector(modal);
  const allButtons = document.querySelectorAll(btn);
  const closeBtn = modalCurrent.querySelector('.btn-close');

  // Добававляем обработчик событий для кнопок открытия модального окна
  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener('click', function(e) {
      e.preventDefault();
      hideOpenModals(modalCurrent);
      showModal(modalCurrent);
    });
  }

  // Обработка кнопки закрытия
  closeBtn.onclick = () => {
    hideModal(modalCurrent);
    showHideModals();
  };

  // Закрытие модального окна при клике мимо
  modalCurrent.addEventListener('mousedown', function(e) {
    if (!e.target.closest('.modal__body')) {
      hideModal(this);
      showHideModals();
    }
  });
}
