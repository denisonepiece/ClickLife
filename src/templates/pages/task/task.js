import 'normalize.css';
import '../../../sass/main.sass'
import '../../../sass/typography.sass'
import './task.sass'
//Includes
import '../../includes/header/header'
import '../../includes/footer/footer'
//Components
import '../../components/notification/notification'
import '../../components/button/button'
import '../../components/profile-person/profile-person'
import '../../components/profile-contact/profile-contact'
import '../../components/profile-rate/profile-rate'
import '../../components/profile-elect/profile-elect'
import '../../components/feedback/feedback'
import '../../components/cards/card'
import '../../components/modals/modal'
import '../../components/textarea/textarea'

//Media
import '../../../sass/media.sass'

toggleTaskMenu();

function toggleTaskMenu() {
  const menuBtn = document.querySelector('.task-menu');
  const menu = document.querySelector('.task-menu__list');

  menuBtn.addEventListener('click', () => {
    menu.classList.toggle('-is-open-');
  });
}
