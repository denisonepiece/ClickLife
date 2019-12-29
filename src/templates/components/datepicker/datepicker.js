import './air-datepicker';
import 'air-datepicker/dist/css/datepicker.css';
import './datepicker.sass';

let minDate = new Date();

$('.datepicker-field').datepicker({
  timepicker: true,
  inline: true,
  minDate: minDate,
  clearButton: true,
  prevHtml: '<span class="datepicker__nav-prev"></span>',
  nextHtml: '<span class="datepicker__nav-next"></span>',
  onShow: function(inst) {
    inst.el.classList.add('datepicker_is-active');
  },
  onHide: function(inst) {
    inst.el.classList.remove('datepicker_is-active');
  },
});

function initDatepickers() {
  const datepickerBlock = document.querySelectorAll('.datepicker-block');

  for ( let i = 0; i < datepickerBlock.length; i++) {
    const datepickerField = datepickerBlock[i].querySelector('.datepicker-field');

    datepickerField.addEventListener('click', function(e) {
      datepickerBlock[i].classList.toggle('datepicker-is-open');
      closeAnother(datepickerBlock[i]);
    });

    function closeAnother(current) {
      for (let k = 0; k < datepickerBlock.length; k++) {
        if (datepickerBlock[k] != current) {
          datepickerBlock[k].classList.remove('datepicker-is-open');
        }
      }
    }

    document.addEventListener('click', function(e) {
      const container = $('.datepicker-block');

      if (container.has(e.target).length === 0 && !e.target.classList.value.match('datepicker')) {
        datepickerBlock[i].classList.remove('datepicker-is-open');
      }
    });
  }
}

initDatepickers();
