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
import '../../components/modals/modal';

// Media
import '../../../sass/media.sass';

manageEmail();

function manageEmail() {
  const confrimed = document.querySelector('.email-confrimed');
  const without = document.querySelector('.email-without');
  const input = document.querySelector('.email-input');
  const confrim = document.querySelector('.email-confirm');

  const token = document.getElementsByName('csrf-token').getAttribute('content');

  confrim.querySelector('.btn-simple').onclick = function() {
    confrim.style.display = 'none';
    input.style.display = '';
  };

  confrimed.querySelector('.button').addEventListener('click', function() {
    confrimed.style.display = "none";
    input.style.display = "block";
  });

  input.querySelector('.button').addEventListener('click', function (e) {
    e.preventDefault();
    const mail = input.querySelector('input').value;

    const data = {
      '_token': token,
      'contact': mail,
    };

    fetch('https://click-life.ru/api/change_contact/step/1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    }).then(function(response) {
      if (!response.ok) {
        return 'Данные с сервера не получены';
      }
      return response.json();
    }).then(function(data) {
      input.style.display = 'none';
      confrim.style.display = '';

      confrim.querySelectorAll('input')[0].value = mail;
      const code = confrim.querySelectorAll('input')[1].value;

      const codeData = {
        '_token': token,
        'code': code,
      };

      fetch('https://click-life.ru/api/change_contact/step/2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(codeData),
      }).then(function(response) {
        if (!response.ok) {
          return 'Данные с сервера не получены';
        }
        return response.json();
      }).then(function(data) {
        window.location.reload();
      });
    });
  });
}
