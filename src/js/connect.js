connectModal();

function connectModal() {
  const modalConnect = document.querySelector('.modal-connect');
  const buttonsConnect = document.querySelectorAll('.button-connect');

  if (modalConnect && buttonsConnect) {
    for (let i = 0; i < buttonsConnect.length; i++) {
      buttonsConnect[i].addEventListener('click', function () {
        const id = this.getAttribute('data-user_id');

        fetch(`https://click-life.ru/render/user/${id}`)
            .then((response) => {
              return response.text();
            })
            .then((data) => {
              const parser = new DOMParser();
              const newContact = parser.parseFromString(data, 'text/html').querySelector('body');
              const oldContact = modalConnect.querySelector('modal__body');

              document.body.replaceChild(newContact, oldContact);
            });
      });
    }
  }
}
