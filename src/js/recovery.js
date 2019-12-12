if (document.querySelector('.modal-enter')) {
  recovery();
}

// STEP 1
function recovery() {
  let userId = '';
  let token = '';

  sendContact();

  function sendContact() {
    const sendForm = document.forms.recovery1;
    const btnSend = sendForm.elements[sendForm.elements.length - 1];

    btnSend.onclick = (e) => {
      e.preventDefault();

      const sendData = {
        contact: sendForm.elements[0].value,
      };

      fetch('https://click-life.ru/api/reset_password/step/1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(sendData),
      }).then(function(response) {
        if (!response.ok) {
          return 'Данные с сервера не получены';
        }
        return response.json();
      }).then(function(data) {
        if (data.status) {
          userId = data['user_id'];
          token = data.token;
          document.querySelector('.modal-recovery')
              .classList.add('modal-hidden');
          confirmCode();
        } else {
          sendForm.elements[0].parentNode.classList.add('input_error');
          sendForm.elements[0].nextElementSibling
              .innerHTML = data.error.contact;
        }
      });
    };
  }

  // STEP 2
  function confirmCode() {
    const modalCode = document.querySelector('.modal-recovery-code');
    const codeForm = document.forms.recovery2;
    const codeBtn = codeForm.elements[codeForm.elements.length - 1];

    modalCode.classList.remove('modal-hidden');

    codeBtn.onclick = (e) => {
      e.preventDefault();

      const codeData = {
        'code': codeForm.elements[0].value,
        'user_id': userId,
      };

      fetch('https://click-life.ru/api/reset_password/step/2', {
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
        if (data.status) {
          modalCode.classList.add('modal-hidden');
          changePass();
        } else {
          codeForm.elements[0].parentNode.classList.add('input_error');
          codeForm.elements[0].nextElementSibling.innerHTML = data.error;
        }
      });
    };
  }

  // STEP 3
  function changePass(e) {
    const modalPass = document.querySelector('.modal-recovery-pass');
    const passForm = document.forms.recovery3;
    const btnPass = passForm.elements[passForm.elements.length - 1];

    modalPass.classList.remove('modal-hidden');

    btnPass.onclick = (e) => {
      e.preventDefault();

      const codeData = {
        'user_id': userId,
        'password': passForm.elements[0],
        'password_confirmation': passForm.elements[1],
        'token': token,
      };

      fetch('https://click-life.ru/api/reset_password/step/3', {
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
        if (data.status) {
          window.location.href = 'https://click-life.ru/user';
        } else {
          passForm.elements[0].parentNode.classList.add('input_error');
          passForm.elements[0].nextElementSibling.innerHTML = data.error;
        }
      });
    };
  }
}


