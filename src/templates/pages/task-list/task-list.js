import 'normalize.css';
import '../../../sass/main.sass';
import '../../../sass/typography.sass';
// Includes
import '../../includes/header/header';
import '../../includes/footer/footer';
// Components
import '../../components/button/button';
import '../../components/profile-person/profile-person';
import '../../components/profile-contact/profile-contact';
import '../../components/profile-rate/profile-rate';
import '../../components/profile-elect/profile-elect';
import '../../components/feedback/feedback';
import '../../components/cards/card';
import '../../components/modals/modal';
import '../../components/tooltip/tooltip';
import '../../components/checkbox/checkbox';
// Media
import './task-list.sass';
import '../../../sass/media.sass';

import Sidebar from './sidebar-logic';

const sidebar = new Sidebar('.filter-aside', '.filter-aside__categories');

toggleSubCategories();

function toggleSubCategories() {
  const allCategory = document.querySelectorAll('.filter-aside__common');

  for (let i = 0; i < allCategory.length; i++) {
    allCategory[i].addEventListener('click', function() {
      closeAnother();
      allCategory[i].parentNode.classList.add('-is-open-');
    });
  }

  function closeAnother() {
    for (let i = 0; i < allCategory.length; i++) {
      allCategory[i].parentNode.classList.remove('-is-open-');
    }
  }
}

toggleFilter();

function toggleFilter() {
  const fltrBtn = document.querySelector('.filter-top__button.filter');
  const fltrBlck = document.querySelector('.filter-top__items');

  fltrBtn.addEventListener('click', function() {
    fltrBlck.classList.toggle('-is-open-');


    if (fltrBtn.innerHTML === 'Фильтры') {
      fltrBtn.innerHTML = 'Скрыть';
    } else {
      fltrBtn.innerHTML = 'Фильтры';
    }
  });
}

toggleCategory();

function toggleCategory() {
  const categoryBtn = document.querySelector('.filter-top__button.category');
  const categoryBlock = document.querySelector('.filter-aside');

  categoryBtn.addEventListener('click', function() {
    categoryBlock.classList.toggle('-is-open-');

    if (categoryBtn.innerHTML === 'Категории') {
      categoryBtn.innerHTML = 'Скрыть';
    } else {
      categoryBtn.innerHTML = 'Категории';
    }
  });
}


handleFilterInputs();

function handleFilterInputs() {
  const filterInputs = document.querySelectorAll('.filter-top input');
  const filterForm = document.querySelector('form');

  for (let i = 0; i < filterInputs.length; i++) {
    filterInputs[i].addEventListener('change', function () {
      filterForm.submit();
    });
  }
}
