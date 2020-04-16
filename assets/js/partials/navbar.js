$(document).ready(function() {
  $(document).scroll(function() {
    const navbar = $('.page .navbar, .post .navbar'),
      scroll = $(window).scrollTop();

    scroll > 0 ? navbar.addClass('has-shadow') : navbar.removeClass('has-shadow');
  });

  if ($(window).width() <= 991) {
    $('#navbarMenu .dropdown span').attr('data-toggle', 'dropdown');
  }
});
