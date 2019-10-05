import 'air-datepicker'
import './datepicker.css';
import './datepicker.sass';

$(".datepicker-field").datepicker({
  timepicker: true,
  prevHtml: '<span class="datepicker__nav-prev"></span>',
  nextHtml: '<span class="datepicker__nav-next"></span>',
  clearButton: true,
  onShow: function (inst) {
    inst.el.classList.add('datepicker_is-active');
  },
  onHide: function (inst) {
    inst.el.classList.remove('datepicker_is-active');
  }
});


