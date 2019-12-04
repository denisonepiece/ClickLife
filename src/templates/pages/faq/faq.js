import 'normalize.css';
import '../../../sass/main.sass'
//Includes
import '../../includes/header/header'
import '../../includes/footer/footer'
//Components
import '../../components/tooltip/tooltip'
import '../../components/button/button'
import '../../components/cards/card'
import '../../components/modals/modal'
//Media
import '../../../sass/media.sass'
//page styles
import './faq.sass'

toggleTabs();

function toggleTabs() {
  const allTabs = document.querySelectorAll('.faq-item');

  for(let i = 0; i < allTabs.length; i++) {
    const tabTitle = allTabs[i].querySelector('.faq-item__title');

    tabTitle.addEventListener('click', function () {
      this.parentNode.classList.toggle('-is-open-');
    });
  }


}
