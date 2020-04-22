$(document).ready(function () {
  $(`.features .bookable-section #show-more,
    .features .payment-clutch-section #show-more,
    .features .boosted-section #show-more,
    .features .dashboard-section #show-more,
    .features .travel-section #show-more,
    .features .book-section #show-more`).on('click', function (e) {
    e.preventDefault();
    $(this)
      .text(this.text === 'Show more' ? 'Show less' : 'Show more')
      .siblings('p:last')
      .slideToggle('fast');
  });
});
