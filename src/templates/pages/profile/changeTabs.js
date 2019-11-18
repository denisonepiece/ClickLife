const tabRoles = document.querySelectorAll('.tab-role__content');

if (document.querySelector('.tab-task')) {
  for (let i = 0; i < tabRoles.length; i++) {
    changeTabs(tabRoles[i].querySelector('.tab-task'), tabRoles[i].querySelectorAll('.tab-task__content'));
  }
}

changeTabs('#tab-role', '.tab-role__content');

function changeTabs(tab, tabContent) {
  let tabBtns = 0;
  let tabItems = 0;
  if ((typeof tab) === 'string') {
    tabBtns = document.querySelector(tab).querySelectorAll('.tab-nav__item');
    tabItems = document.querySelectorAll(tabContent);
  } else {
    tabBtns = tab.querySelectorAll('.tab-nav__item');
    tabItems = tabContent;
  }

  for (let i = 0; i < tabBtns.length; i++) {
    tabBtns[i].addEventListener('click', function () {
      this.classList.add('-active-');
      tabItems[i].classList.add('-open-');

      closeAnother(this, tabItems[i]);
    });
  }

  function closeAnother(curTab, curTabItem) {
    for (let i = 0; i < tabBtns.length; i++) {
      if (curTab === tabBtns[i]) {
        continue;
      }

      tabItems[i].classList.remove('-open-');
      tabBtns[i].classList.remove('-active-');
    }
  }
}