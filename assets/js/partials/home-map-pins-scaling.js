$(document).ready(function() {
  $(window).scroll(function() {
    const pins = $('.map-section .map-pins > div');
    $(this).scrollTop() > 600
      ? pins.css('transform', 'scale(1)')
      : pins.css('transform', 'scale(0)');
  });
});
