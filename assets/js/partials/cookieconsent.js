$(document).ready(function () {
  window.cookieconsent.initialise({
    palette: {
      popup: { background: '#000' },
      button: { background: '#f1d600' },
    },
    theme: 'classic',
    position: 'bottom-left',
    type: 'opt-out',
    content: { href: '/privacy-and-terms/' },
  });
});
