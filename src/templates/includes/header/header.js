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

export function onClickNotice() {
  const header = document.querySelector('.header');
  const notice = document.querySelector('.notice');
  const noticeBlock = notice.querySelector('.notification-block');

  header.addEventListener('click', function(e) {
    let n = e.target.closest('.notice');

    if (n && header.contains(n)) {
      notice.classList.toggle('-is-open-');
    }
  });

  noticeBlock.addEventListener('click', (e) => e.stopPropagation());

  document.addEventListener('click', function(e) {
    const container = $('.notice');

    if (container.has(e.target).length === 0) {
      notice.classList.remove('-is-open-');
    }
  });
}

export function toggleMenu() {
  const menuBtn = document.querySelector('.menu-btn');
  const menu = document.querySelector('.menu');

  menuBtn.onclick = () => {
    menuBtn.classList.toggle('-is-open-');
    menu.classList.toggle('-is-open-');
  };
}
