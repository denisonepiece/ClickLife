if (document.querySelector('.modal-reg-fiz')) {
  registration();
}

function registration() {

  const regForm = document.forms.registration;
  const btnForm = regForm.querySelector('.button_fill-big');
  let token = '';
  let userId = '';


  function registrationFiz() {
    const modalRegFiz = document.querySelector('.modal-reg-fiz');
    const modalMailConfirm = document.querySelector('.modal-mail-confirm');
    const modalTelConfirm = document.querySelector('.modal-tel-confirm');

    btnForm.onclick = function (e) {
      e.preventDefault();

      const inputData = {
        name: regForm.elements[0].value,
        contact: regForm.elements[1].value,
        city: regForm.elements[2].value,
        is_company: 'no'
      };

      fetch('https://click-life.ru/api/register/step/1', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(inputData)
      }).then(function (response) {
        if (!response.ok) {
          return 'Данные с сервера не получены'
        }
        return response.json();
      }).then(function (data) {
        // Такого пользователя нет, данные отправленны
        if (data.status) {
          token = data.token;
          userId = data['user_id'];
          modalRegFiz.classList.add('modal-hidden');

          // Открываем окно подтверждения почты/телефона
          if (data.mail) {
            codeConfirm(modalMailConfirm)
          } else {
            codeConfirm(modalTelConfirm)
          }

        } else {
          //Иначе выводим соотвествуещие ошибки или удаляем
          if (data.errors.name) {
            regForm.elements[0].nextElementSibling.innerHTML = data.errors.name;
            regForm.elements[0].parentNode.classList.add('input_error')
          } else {
            regForm.elements[0].parentNode.classList.remove('input_error')
          }
          if (data.errors.contact) {
            regForm.elements[1].nextElementSibling.innerHTML = data.errors.contact;
            regForm.elements[1].parentNode.classList.add('input_error')
          } else {
            regForm.elements[1].parentNode.classList.remove('input_error')
          }
          if (data.errors.city) {
            regForm.elements[2].nextElementSibling.innerHTML = data.errors.city;
            regForm.elements[2].parentNode.classList.add('input_error')
          } else {
            regForm.elements[2].parentNode.classList.remove('input_error')
          }
        }
      })
    };
  }


  function codeConfirm(modal) {
    modal.classList.remove('modal-hidden');
    modal.querySelector('#contact').innerHTML = inputData.contact;

    const codeForm = modal.forms.codeConfirm;

    codeForm.querySelector('.button').onclick = (e) => {
      e.preventDefault();
      codeData = {
        code: codeForm.elements[0].value,
        userId: userId
      };

      fetch('https://click-life.ru/api/register/step/2', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(codeData)
      }).then(function (response) {
        if (!response.ok) {
          return 'Данные с сервера не получены'
        }
        return response.json();
      }).then(function (data) {
        if(data.status) {
          modal.classList.add('modal-hidden');
          createPass();

        } else {
          codeForm.elements[0].nextElementSibling.innerHTML = data.error;
        }
      });
    }
  }

  function createPass() {
    const modalPass = document.querySelector('.modal-pass');
    const passForm = modalPass.forms.pass;
    const btnFormPass = passForm.querySelector('.button');

    modalPass.classList.remove('modal-hidden');

    let passData = {
      'user_id': userId,
      password: passForm.elements[0].value,
      'password_confirmation': passForm.elements[1].value,
      token: token
    };

    btnFormPass.onclick = (e) => {
      e.preventDefault();

      if(passData.password === passData['password_confirmation']) {
        fetch('https://click-life.ru/api/register/step/2', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(passData)
        }).then(function (response) {
          if (!response.ok) {
            return 'Данные с сервера не получены'
          }
          return response.json();
        }).then(function (data) {
          if(data.status) {
            document.location.href = "https://click-life.ru/user"
          } else {
            passForm.elements[1].nextElementSibling.innerHTML = "Пароли не совпадают"
          }
        });
      }


    }
  }

}



