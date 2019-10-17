import './header.sass'


function onClickNotice() {
  const notice = document.querySelector('.notice');

  notice.onclick = () => notice.classList.toggle('-is-open-');

}

onClickNotice();