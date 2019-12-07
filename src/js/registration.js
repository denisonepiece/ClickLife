if(document.querySelector('.modal-reg-fiz')) {
  registration();
}

function registration() {
  const modalMailConfirm = document.querySelector('.modal-mail-confirm');
  const modalRegFiz = document.querySelector('.modal-reg-fiz');
  const regForm = document.forms.registration;
  const btnForm = regForm.querySelector('.button_fill-big');
  let token = '';
  let userId = '';

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
      if (data['status'] === true) {
        token = data['token'];
        userId = data['user_id'];
        modalRegFiz.classList.add('modal-hidden');
        modalMailConfirm.classList.remove('modal-hidden');
      } else {
        if (data['error']) {
          if (data['error']['name']) {
            regForm.elements[0].nextElementSibling.innerHTML = data['error'].name;
            regForm.elements[0].parentNode.classList.add('input_error')
          } else {
            regForm.elements[0].parentNode.classList.remove('input_error')
          }

          if (data['error'].contact) {
            regForm.elements[1].nextElementSibling.innerHTML = data['error'].contact;
            regForm.elements[1].parentNode.classList.add('input_error')
          } else {
            regForm.elements[1].parentNode.classList.remove('input_error')
          }

          if (data['error'].city) {
            regForm.elements[2].nextElementSibling.innerHTML = data['error'].city;
            regForm.elements[2].parentNode.classList.add('input_error')
          } else {
            regForm.elements[2].parentNode.classList.remove('input_error')
          }
        }
      }
    })
  };
}



