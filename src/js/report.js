reportLogic();

function reportLogic() {
  const buttonsReport = document.querySelectorAll('.button-report');
  const modalReport = document.querySelector('.modal-report');
  if (buttonsReport && modalReport) {
    const modalFor = modalReport.querySelector('[name="for"]');
    const modalId = modalReport.querySelector('[name="target_id"]');

    for ( let i = 0; i < buttonsReport.length; i++) {
      buttonsReport[i].addEventListener('click', function() {
        const dataFor = this.getAttribute('data-for');
        const id = this.getAttribute('data-target_id');

        modalFor.value = dataFor;
        modalId.value = id;
      });
    }
  }
}
