import {onClickNotice, toggleMenu} from '../../../includes/header/header';
import {hideShowMenu} from "../../header-menu/header-menu";

function handleSocial() {
  const socialLinks = document.querySelectorAll('.social-sign__social');

  for (let i = 0; i < socialLinks.length; i++) {
    socialLinks[i].onclick = function(e) {
      e.preventDefault();

      const linkHref = this.getAttribute('href');

      // eslint-disable-next-line no-unused-vars
      const newWind = window.open(linkHref, 'reg', 'width=600, height=400');

      async function checkAuth() {
        const resposnse = await fetch('/api/auth/status')
            .then(function(resolve) {
              if (resolve.status !== 200) {
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
  const header = fetch('https://click-life.ru/render/header')
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        const parser = new DOMParser();
        const header = parser.parseFromString(data, 'text/html').querySelector('.header').childNodes;
        const oldHeader = document.querySelector('.header');

        oldHeader.innerHTML = '';
        oldHeader.append(...header);
        onClickNotice();
        toggleMenu();
        hideShowMenu();

        document.querySelector('.modal-enter').classList.add('modal-hidden');
        document.querySelector('.modal-reg-fiz').classList.add('modal-hidden');
        document.querySelector('.modal-reg-comp').classList.add('modal-hidden');
      });
};
