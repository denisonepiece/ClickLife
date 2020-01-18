if (document.querySelector('.modal-enter')) {
  login();
}

function login() {
  const loginForm = document.forms.login;
  const btnLogin = loginForm.elements[loginForm.elements.length - 1];
  let loginData = {};

  btnLogin.onclick = (e) => {
    e.preventDefault();

    loginData = {
      login: loginForm.elements[0].value,
      password: loginForm.elements[1].value,
    };

    fetch('https://click-life.ru/loginAjax', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(loginData),
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
        if (data.error.login) {
          loginForm.elements[0].parentNode.classList.add('input_error');
          loginForm.elements[0].nextElementSibling.innerHTML = data.error.login;
        } else {
          loginForm.elements[0].parentNode.classList.remove('input_error');
        }

        if (data.error.password) {
          loginForm.elements[1].parentNode.classList.add('input_error');
          loginForm.elements[1].nextElementSibling.innerHTML = data.error.password;
        } else {
          loginForm.elements[1].parentNode.classList.remove('input_error');
        }
      }
    });
  };
}
