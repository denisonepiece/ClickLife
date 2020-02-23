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
import 'jquery.kladr';
import 'jquery.kladr/jquery.kladr.min.css';
// Media
import './task-list.sass';
import '../../../sass/media.sass';

import Sidebar from './sidebar-logic';

const sidebar = new Sidebar('.filter-aside', '.filter-aside__categories');

toggleSubCategories();

function toggleSubCategories() {
  const allCategory = document.querySelectorAll('.filter-aside__common');

  for (let i = 0; i < allCategory.length; i++) {
    allCategory[i].addEventListener('click', function () {
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

  fltrBtn.addEventListener('click', function () {
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

  categoryBtn.addEventListener('click', function () {
    categoryBlock.classList.toggle('-is-open-');

    if (categoryBtn.innerHTML === 'Категории') {
      categoryBtn.innerHTML = 'Скрыть';
    } else {
      categoryBtn.innerHTML = 'Категории';
    }
  });
}


function handleFilterInputs() {
  const filterInputs = document.querySelectorAll('.filter-top input');
  const filterForm = document.querySelector('.filter-top form');
  const kladr = document.querySelector('#kladr_autocomplete');

  kladr.addEventListener('mousedown', function (e) {
    filterForm.submit();
  });


  for (let i = 0; i < filterInputs.length; i++) {
    filterInputs[i].addEventListener('change', function () {
      filterForm.submit();
    });
  }

  filterInputs[0].addEventListener('keydown', () => {
    const items = document.querySelectorAll('#kladr_autocomplete ul li');

    if (items[0].innerHTML.indexOf('api') >= 0) {
      items[0].innerHTML = items[1].innerHTML;
    }
  });

}

if (document.querySelector('#load_more')) {
  lazyLoad();
}

function lazyLoad() {
  const loadBtn = document.querySelector('#load_more');
  const botNav = document.querySelector('.bottom-navigation');
  let count = 1;

  loadBtn.onclick = function() {
    loadTask(count);
    count++;
  };


  function loadTask(page) {
    fetch(`https://click-life.ru/render/task?page=${page}`)
        .then((response) => {
          return response.text();
        })
        .then((data) => {
          const parser = new DOMParser();
          const newItems = parser.parseFromString(data, 'text/html').querySelectorAll('.card');
          botNav.before(...newItems);
          if (parser.parseFromString(data, 'text/html').querySelector('meta[name="next_empty"]')) {
            loadBtn.remove();
          }
        });
  }
}

// eslint-disable-next-line no-undef
$('#input-city').kladr('type', $.kladr.type.city);
handleFilterInputs();


