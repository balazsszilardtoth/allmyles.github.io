$(document).ready(function () {
  $(window).scroll(function () {
    const pins = $('.map-section .map-pins > div');
    if ($(window).width() <= 1366) {
      $(this).scrollTop() >= 900
        ? pins.css('transform', 'scale(1)')
        : pins.css('transform', 'scale(0)');
    } else {
      $(this).scrollTop() >= 700
        ? pins.css('transform', 'scale(1)')
        : pins.css('transform', 'scale(0)');
    }
  });
});
