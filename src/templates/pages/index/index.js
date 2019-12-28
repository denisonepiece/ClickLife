import 'normalize.css';
import '../../../sass/main.sass';
// Includes
import '../../includes/header/header';
import '../../includes/footer/footer';
// Components
import '../../components/tooltip/tooltip';
import '../../components/button/button';
import '../../components/cards/card';
import '../../components/modals/modal';
// Media
import '../../../sass/media.sass';
// page styles
import './index.sass';

animation();

function animation() {
  const titles = document.querySelectorAll('.animation .row');

  setTimeout(function() {
    titles[0].classList.add('fade-in');
  }, 0);

  setTimeout(function() {
    titles[1].classList.add('fade-in');
  }, 600);

  setTimeout(function() {
    titles[2].classList.add('fade-in');
  }, 1000);

  setTimeout(function() {
    titles[2].querySelector('h3').style.left = '15rem';
    titles[2].querySelector('h3').style.opacity = 0;
    titles[2].querySelector('svg').style.left = '8rem';
  }, 1700);

  setTimeout(function() {
    titles[0].style.top = '163px';
    titles[0].querySelector('h3').style.opacity = 0;
    titles[1].style.top = '103px';
    titles[1].querySelector('h3').style.opacity = 0;
  }, 2700);

  setTimeout(function() {
    titles[1].classList.add('to-right');
    titles[2].classList.add('to-right');
  }, 2900);

  setTimeout(function() {
    titles[0].style.top = '60px';
    titles[1].style.top = '0px';
    titles[2].style.top = '-60px';
    document.querySelector('.animation p').style.opacity = '1';
  }, 3100);
}


