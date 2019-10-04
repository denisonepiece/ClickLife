import 'air-datepicker'
import './datepicker.css';
import './datepicker.sass'

$(".datepicker-field").datepicker({
  timepicker: true,
  // inline: true,
  prevHtml: '<span class="datepicker__nav-prev"></span>',
  nextHtml: '<span class="datepicker__nav-next"></span>',
  clearButton: true,
});


