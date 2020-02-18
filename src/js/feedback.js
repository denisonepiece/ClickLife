'use strict';

const feedbackModal = document.querySelector('.modal-feedback');

if (feedbackModal && feedbackModal) {
  feedbackLogic();
}

function feedbackLogic() {
  const feedbackButtons = document.querySelectorAll('.button-feedback');
  const feedbackModal = document.querySelector('.modal-feedback');
  const modalForm = feedbackModal.querySelector('form');
  const modalName = feedbackModal.querySelector('h4 span');
  const modalFor = feedbackModal.querySelector('input[name="for"]');

  for (let i = 0; i < feedbackButtons.length; i++) {
    feedbackButtons[i].addEventListener('click', function() {
      const name = this.getAttribute('data-name');
      const action = this.getAttribute('data-action');
      const dataFor = this.getAttribute('data-for');

      modalForm.setAttribute('action', action);
      modalName.innerHTML = name;
      modalFor.setAttribute('data-for', dataFor);


    });
  }
}


