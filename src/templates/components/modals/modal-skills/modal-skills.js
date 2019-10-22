import './modal-skills.sass'
import '../../checkbox/checkbox'

initAllTabs();

function initAllTabs() {
  const tabs = document.querySelectorAll('.tab-skill');

  for(let i = 0; i < tabs.length; i++) {
    hideShowItems(tabs[i]);
    onChangeCheckbox(tabs[i]);
  }
}

function hideShowItems(tab) {
  const tabHeader = tab.querySelector('.tab-skill__header');

  tabHeader.addEventListener('click', function () {
    tab.classList.toggle('-is-open-');
  });
}

function onChangeCheckbox(tab) {
  const tabCheckboxes = tab.querySelectorAll('.tab-skill__items .checkbox');

  for(let i = 0; i < tabCheckboxes.length; i++) {
    let input = tabCheckboxes[i].querySelector('input');

    input.addEventListener('change', function () {
      changeHeaderState(tab, howActiveCheckboxes(tab));
    })
  }
}

function howActiveCheckboxes(tab) {
  const tabCheckboxes = tab.querySelectorAll('.tab-skill__items .checkbox');
  let count = 0;

  for(let i = 0; i < tabCheckboxes.length; i++) {
    let input = tabCheckboxes[i].querySelector('input');

    if (input.checked) {
      count++;
    }
  }

  if(count === tabCheckboxes.length) {
    return 'all'
  }

  if(count > 0 && count !== tabCheckboxes.length) {
    return 'not-all'
  }

  return null;
}

function changeHeaderState(tab, count) {
  const tabHeader = tab.querySelector('.tab-skill__header');
  const tabCheckboxInput = tabHeader.querySelector('.checkbox input');

  if(count === null) {
    tabCheckboxInput.checked = false;
  }

  if(count === 'not-all') {
    tabCheckboxInput.checked = false;
    tabHeader.classList.add('-not-all-');
  }
  else {
    tabHeader.classList.remove('-not-all-')
  }

  if(count === 'all') {
    tabCheckboxInput.checked = true;
  }
}