if (document.querySelector('.modal-reg-fiz')) {
  registration();
}

function registration() {
  let token = '';
  let userId = '';
  let contact = '';

  registrationFiz();

  registrationComp();

  function registrationComp() {
    const regFormComp = document.forms.registrationCompany;
    const btnForm = regFormComp.querySelector('.button_fill-big');
    const modalRegComp = document.querySelector('.modal-reg-comp');
    const modalMailConfirm = document.querySelector('.modal-mail-confirm');

    btnForm.onclick = function(e) {
      e.preventDefault();

      const inputData = {
        company: regFormComp.elements[0].value,
        inn: regFormComp.elements[1].value,
        city: regFormComp.elements[2].value,
        address: regFormComp.elements[3].value,
        email: regFormComp.elements[4].value,
        phone: regFormComp.elements[5].value,
        is_company: 'yes',
        name: regFormComp.elements[6].value,
      };

      fetch('https://click-life.ru/api/register/step/1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(inputData),
      }).then(function(response) {
        if (!response.ok) {
          return 'Данные с сервера не получены';
        }
        return response.json();
      }).then(function(data) {
        if (data.status) {
          token = data.token;
          userId = data['user_id'];
          contact = inputData.email;
          modalRegComp.classList.add('modal-hidden');

          if (data.mail) codeConfirm(modalMailConfirm);
        } else {
          // Иначе выводим соотвествуещие ошибки или удаляем
          if (data.errors.company) {
            regFormComp.elements[0].nextElementSibling.innerHTML = data.errors.company;
            regFormComp.elements[0].parentNode.classList.add('input_error');
          } else {
            regFormComp.elements[0].parentNode.classList.remove('input_error');
          }
          if (data.errors.inn) {
            regFormComp.elements[1].nextElementSibling.innerHTML = data.errors.inn;
            regFormComp.elements[1].parentNode.classList.add('input_error');
          } else {
            regFormComp.elements[1].parentNode.classList.remove('input_error');
          }
          if (data.errors.city) {
            regFormComp.elements[2].nextElementSibling.innerHTML = data.errors.city;
            regFormComp.elements[2].parentNode.classList.add('input_error');
          } else {
            regFormComp.elements[2].parentNode.classList.remove('input_error');
          }
          if (data.errors.address) {
            regFormComp.elements[3].nextElementSibling.innerHTML = data.errors.address;
            regFormComp.elements[3].parentNode.classList.add('input_error');
          } else {
            regFormComp.elements[3].parentNode.classList.remove('input_error');
          }
          if (data.errors.email) {
            regFormComp.elements[4].nextElementSibling.innerHTML = data.errors.email;
            regFormComp.elements[4].parentNode.classList.add('input_error');
          } else {
            regFormComp.elements[4].parentNode.classList.remove('input_error');
          }
          if (data.errors.phone) {
            regFormComp.elements[5].nextElementSibling.innerHTML = data.errors.phone;
            regFormComp.elements[5].parentNode.classList.add('input_error');
          } else {
            regFormComp.elements[5].parentNode.classList.remove('input_error');
          }
          if (data.errors.name) {
            regFormComp.elements[6].nextElementSibling.innerHTML = data.errors.name;
            regFormComp.elements[6].parentNode.classList.add('input_error');
          } else {
            regFormComp.elements[6].parentNode.classList.remove('input_error');
          }
        }
      });
    };
  }

  function registrationFiz() {
    const regForm = document.forms.registration;
    const btnForm = regForm.querySelector('.button_fill-big');
    const modalRegFiz = document.querySelector('.modal-reg-fiz');
    const modalMailConfirm = document.querySelector('.modal-mail-confirm');
    const modalTelConfirm = document.querySelector('.modal-tel-confirm');

    btnForm.onclick = function (e) {
      e.preventDefault();

      const inputData = {
        name: regForm.elements[0].value,
        contact: regForm.elements[1].value,
        city: regForm.elements[2].value,
        is_company: 'no',
      };

      fetch('https://click-life.ru/api/register/step/1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(inputData),
      }).then(function (response) {
        if (!response.ok) {
          return 'Данные с сервера не получены';
        }
        return response.json();
      }).then(function (data) {
        // Такого пользователя нет, данные отправленны
        if (data.status) {
          token = data.token;
          userId = data['user_id'];
          contact = inputData.contact;
          modalRegFiz.classList.add('modal-hidden');

          // Открываем окно подтверждения почты/телефона
          if (data.mail) {
            codeConfirm(modalMailConfirm);
          } else {
            codeConfirm(modalTelConfirm);
          }
        } else {
          // Иначе выводим соотвествуещие ошибки или удаляем
          if (data.errors.name) {
            regForm.elements[0].nextElementSibling.innerHTML = data.errors.name;
            regForm.elements[0].parentNode.classList.add('input_error');
          } else {
            regForm.elements[0].parentNode.classList.remove('input_error');
          }
          if (data.errors.contact) {
            regForm.elements[1].nextElementSibling.innerHTML = data.errors.contact;
            regForm.elements[1].parentNode.classList.add('input_error');
          } else {
            regForm.elements[1].parentNode.classList.remove('input_error');
          }
          if (data.errors.city) {
            regForm.elements[2].nextElementSibling.innerHTML = data.errors.city;
            regForm.elements[2].parentNode.classList.add('input_error');
          } else {
            regForm.elements[2].parentNode.classList.remove('input_error');
          }
        }
      });
    };
  }

  function codeConfirm(modal) {
    modal.classList.remove('modal-hidden');
    modal.querySelector('#contact').innerHTML = contact;

    const codeInput = modal.querySelector('input');

    modal.querySelector('.button_fill-big').onclick = (e) => {
      e.preventDefault();

      const codeData = {
        'code': codeInput.value,
        'user_id': userId,
      };

      fetch('https://click-life.ru/api/register/step/2', {
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
          modal.classList.add('modal-hidden');
          createPass();
        } else {
          codeInput.nextElementSibling.innerHTML = data.error;
        }
      });
    };
  }

  function createPass() {
    const modalPass = document.querySelector('.modal-pass');
    const passForm = document.forms.pass;
    const btnFormPass = passForm.querySelector('.button');

    modalPass.classList.remove('modal-hidden');

    btnFormPass.onclick = (e) => {
      e.preventDefault();

      const passData = {
        'user_id': userId,
        'password': passForm.elements[0].value,
        'password_confirmation': passForm.elements[1].value,
        'token': token,
      };

      if (passForm.elements[0].value === passForm.elements[1].value) {
        fetch('https://click-life.ru/api/register/step/3', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify(passData),
        }).then(function(response) {
          if (!response.ok) {
            return 'Данные с сервера не получены';
          }
          return response.json();
        }).then(function(data) {
          if (data.status) {
            if (document.querySelector('meta[name="redirect_to"]')) {
              document.location.href = 'https://click-life.ru/user';
            } else {
              document.location.reload();
            }
          } else {
            passForm.elements[1].nextElementSibling.innerHTML = 'Пароли не совпадают';
          }
        });
      }
    };
  }
}


