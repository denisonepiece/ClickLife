import 'normalize.css';
import '../../../sass/main.sass';
import './task.sass';
// Includes
import '../../includes/header/header';
import '../../includes/footer/footer';
// Components
import '../../components/notification/notification';
import '../../components/button/button';
import '../../components/profile-person/profile-person';
import '../../components/profile-contact/profile-contact';
import '../../components/profile-rate/profile-rate';
import '../../components/profile-elect/profile-elect';
import '../../components/feedback/feedback';
import '../../components/tooltip/tooltip';
import '../../components/cards/card';
import '../../components/modals/modal';
import '../../components/textarea/textarea';
// Media
import '../../../sass/media.sass';

if (document.querySelector('.task-menu')) {
  toggleTaskMenu();
}

function toggleTaskMenu() {
  const taskMenu = document.querySelector('.task-menu');
  const menuBtn = document.querySelector('.task-menu__btn');
  const menuList = document.querySelector('.task-menu__list');

  menuBtn.addEventListener('click', function(e) {
    taskMenu.classList.toggle('-is-open-');
  });

  menuList.addEventListener('click', function(e) {
    e.stopPropagation();
  });

  document.addEventListener('click', function(e) {
    if(e.target !== menuBtn) taskMenu.classList.remove('-is-open-');
  });
}


