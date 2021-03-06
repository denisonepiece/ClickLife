import 'normalize.css';
import '../../../sass/main.sass'
import '../../../sass/typography.sass'
import './profile.sass'
//Includes
import '../../includes/header/header'
import '../../includes/footer/footer'
//Components
import '../../components/button/button'
import '../../components/profile-person/profile-person'
import '../../components/profile-contact/profile-contact'
import '../../components/profile-rate/profile-rate'
import '../../components/profile-elect/profile-elect'
import '../../components/feedback/feedback'
import '../../components/cards/card'
import '../../components/modals/modal'
import '../../components/tooltip/tooltip'
//Media
import '../../../sass/media.sass'

import './changeTabs'

toggleShowInformation();

function toggleShowInformation() {
  const btn = document.querySelector('#btn-toggle-information');
  let isOpen = false;
  btn.innerHTML = 'Показать больше информации';

  btn.onclick = function (e) {
    isOpen = !isOpen;
    btn.parentNode.classList.toggle('-info-hidden-');

    if (isOpen) {
      btn.innerHTML = 'Показать меньше информации'
    } else {
      btn.innerHTML = 'Показать больше информации'
    }
  };
}

