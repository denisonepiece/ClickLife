import 'normalize.css';
import '../../../sass/main.sass';
import '../../../sass/typography.sass';
import './settings.sass';
// Includes
import '../../includes/header/header';
import '../../includes/footer/footer';
// Components
import '../../components/notification/notification';
import '../../components/button/button';
import '../../components/input/input';
import '../../components/input-phone/input-phone';

// Media
import '../../../sass/media.sass';

manageEmail();

function manageEmail() {
  const confrimed = document.querySelector('.email-confrimed');
  const without = document.querySelector('.email-without');
  const input = document.querySelector('.email-input');
  const confrim = document.querySelector('.email-confirm');


  confrimed.querySelector('.button').addEventListener('click', function() {
    confrimed.style.display = "none";
    input.style.display = "block";
  });
}
