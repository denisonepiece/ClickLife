'use strict';

import './header.sass';
import '../../components/header-menu/header-menu';
import '../../components/notification/notification';
import '../../components/button/button';

if (document.querySelector('.notice')) {
  onClickNotice();
}

if (document.querySelector('.menu-btn')) {
  toggleMenu();
}

function onClickNotice() {
  const notice = document.querySelector('.notice');
  const noticeBlock = notice.querySelector('.notification-block');

  notice.onclick = () => notice.classList.toggle('-is-open-');

  noticeBlock.addEventListener('click', e => e.stopPropagation());

  document.addEventListener('click', function(e) {
    const container = $('.notice');

    if (container.has(e.target).length === 0) {
      notice.classList.remove('-is-open-');
    }
  });
}

function toggleMenu() {
  const menuBtn = document.querySelector('.menu-btn');
  const menu = document.querySelector('.menu');

  menuBtn.onclick = () => {
    menuBtn.classList.toggle('-is-open-');
    menu.classList.toggle('-is-open-');
  };
}
