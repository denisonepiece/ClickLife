import './notification.sass';

initAllNotification();

function onclickNotification(notification) {
  const links = notification.querySelectorAll('a');

  notification.addEventListener('click', function() {
    document.location.href = links[links.length - 1].getAttribute('href');
  });
}

function initAllNotification() {
  const Notices = document.querySelectorAll('.notification');

  Notices.forEach((notice) => onclickNotification(notice));
}

