'use strict';

import './header.sass'

function onClickNotice() {
  const notice = document.querySelector('.notice');

  notice.onclick = () => notice.classList.toggle('-is-open-');

  document.addEventListener('click', function (e) {
    let container = $('.notice');

    console.log(container.has(e.target).length);

    if (container.has(e.target).length === 0) {
      notice.classList.remove('-is-open-');
    }
  });

}

onClickNotice();