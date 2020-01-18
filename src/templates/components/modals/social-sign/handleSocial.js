function handleSocial() {
  const socialLinks = document.querySelectorAll('.social-sign__social');

  for (let i = 0; i < socialLinks.length; i++) {
    socialLinks[i].onclick = function(e) {
      e.preventDefault();

      const linkHref = this.getAttribute('href');

      const newWind = window.open(linkHref, 'reg', 'width=600, height=400');

      async function checkAuth() {
        let resposnse = await fetch('/api/auth/status')
            .then(function (resolve) {
              if(resolve.status != 200) {
                checkAuth();
              } else {
                headerUpdate();
              }
            });
      }

      checkAuth();
    };
  }
}

handleSocial();

function headerUpdate() {
  let header = fetch('https://click-life.ru/render/header')
      .then(response => {
        return response.text();
      })
      .then(data => {

        let parser = new DOMParser();
        let header = parser.parseFromString(data, 'text/html').querySelector('.header');
        const oldHeader = document.querySelector('.header');

        document.body.replaceChild(header, oldHeader);

        document.querySelector('.modal-enter').classList.add('modal-hidden');
        document.querySelector('.modal-reg').classList.add('modal-hidden');
      });
};
