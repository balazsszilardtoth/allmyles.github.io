$(document).ready(function() {
  $(`.features .bookable-section a,
    .features .payment-clutch-section a,
    .features .boosted-section a,
    .features .dashboard-section a,
    .features .travel-section a,
    .features .book-section a`).on('click', function(e) {
    e.preventDefault();
    $(this)
      .text(this.text === 'Show more' ? 'Show less' : 'Show more')
      .siblings('p:last')
      .slideToggle('fast');
  });
});
