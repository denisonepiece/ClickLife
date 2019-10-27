import './header-menu.sass'

hideShowMenu();

function hideShowMenu() {
  const menuBtn = document.querySelector('.control-panel__photo');

  menuBtn.onclick = () => menuBtn.parentNode.classList.toggle('-menu-is-open-');

  document.addEventListener('click', function (e) {
    let container = $('.control-panel__account');

    if (container.has(e.target).length === 0) {
      menuBtn.parentNode.classList.remove('-menu-is-open-');
    }
  });


}