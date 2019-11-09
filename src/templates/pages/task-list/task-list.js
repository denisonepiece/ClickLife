import 'normalize.css';
import '../../../sass/main.sass'
import '../../../sass/typography.sass'
import './task-list.sass'
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

import Sidebar from "./sidebar-logic";

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





