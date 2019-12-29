handleSocial();

function handleSocial() {
  const socialLinks = document.querySelectorAll('.social-sign__social');

  for (let i = 0; i < socialLinks.length; i++) {
    socialLinks[i].onclick = function(e) {
      e.preventDefault();

      const linkHref = this.getAttribute('href');

      let newWind = window.open(linkHref, 'reg', 'width=600, height=400');
    };
  }
}
