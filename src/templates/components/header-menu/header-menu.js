import './header-menu.sass'

if(document.querySelector('.control-panel__photo')) {
  hideShowMenu();
}

export function hideShowMenu() {
  const menuBtn = document.querySelector('.control-panel__photo');

  menuBtn.onclick = () => menuBtn.parentNode.classList.toggle('-menu-is-open-');

  document.addEventListener('click', function (e) {
    let container = $('.control-panel__account');

    if (container.has(e.target).length === 0) {
      menuBtn.parentNode.classList.remove('-menu-is-open-');
    }
  });


}
