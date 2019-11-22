import 'normalize.css';
import '../../../sass/main.sass'
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
import '../../components/tooltip/tooltip'
import '../../components/cards/card'
import '../../components/modals/modal'
import '../../components/textarea/textarea'
//Media
import '../../../sass/media.sass'

if (document.querySelector('.task-menu')) {
  toggleTaskMenu();
}

function toggleTaskMenu() {
  const menuBtn = document.querySelector('.task-menu');

  menuBtn.onclick = () => menuBtn.classList.toggle('-is-open-');

  document.addEventListener('click', function (e) {
    let container = $('.task-menu');

    console.log(container.has(e.target).length);

    if (container.has(e.target).length === 0 && e.target !== menuBtn) {
      menuBtn.classList.remove('-is-open-');
    }
  });

}
