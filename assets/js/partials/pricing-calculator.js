$(document).ready(function () {
  setPackage();
  $('#pricing-range').on('input', function () {
    $(this).attr('value', this.value / 30);
    setPackage();
  });
});

function setPackage() {
  const input = $('#pricing-range'),
    packages = $('.pricing .packages-section .card'),
    desks = $('.pricing-illustrations > div'),
    monthly = $('.pricing-monthly'),
    track_sel = ['::-webkit-slider-runnable-track', '::-moz-range-track'];
  let styles = [],
    val,
    str = '';

  val = input.val() / 30 + '% 100% !important';

  track_sel.forEach((element, index) => {
    str +=
      'input[type=range]' + track_sel[index] + '{background-size:' + val + '}';
  });

  styles[0] = str;
  input.html('<style>' + styles.join('') + '</style>');

  // Set monthly value
  monthly.html(input.val());

  // Set total value
  setTotalValue(0, 0, 20); // Free trial, 20 EUR per month
  setTotalValue(1, 599, input.val() * 0.1); // Essential, number of searches * cost per search
  setTotalValue(600, 1499, input.val() * 0.09 * 30); // Professional, number of searches * cost per search * 30 days
  setTotalValue(1500, 3000, input.val() * 0.06 * 30); // Unlimited, number of searches * cost per search * 30 days

  // Set 'Best fit' frame
  setBestFit(0, 0, packages[0]); // Free trial
  setBestFit(1, 599, packages[1]); // Essential
  setBestFit(600, 1499, packages[2]); // Professional
  setBestFit(1500, 3000, packages[3]); // Unlimited

  // Disappears some illustrations
  hideDesk(1, desks[2]); // Backend
  hideDesk(600, desks[0]); // Travel agent
  hideDesk(1500, desks[1]); // Project manager

  // Set cost saving
  setCostSaving(0, 0, 0); // € 0
  setCostSaving(1, 599, 3000); // € 3000
  setCostSaving(600, 1499, 6000); // € 6000
  setCostSaving(1500, 3000, 9000); // € 9000
}

function setTotalValue(min, max, total) {
  const value = $('#pricing-range').val();
  if (min <= value && value <= max) {
    $('.pricing-total').text('€ ' + total.toFixed(0));
  }
}

function setBestFit(min, max, element) {
  const value = $('#pricing-range').val();
  if (min <= value && value <= max) {
    if (!$(element).hasClass('best-fit')) {
      $(element).addClass('best-fit');
      $(element).prepend('<small class="best-fit-text">Best fit</small>');
    }
  } else {
    $(element).removeClass('best-fit');
    $(element).find('.best-fit-text').remove();
  }
}

function hideDesk(min, element) {
  const value = $('#pricing-range').val();
  if (min <= value && value <= 3000) {
    if ($(element).hasClass('active')) {
      $(element).removeClass('active').addClass('inactive');
    }
  } else {
    $(element).removeClass('inactive').addClass('active');
  }
}

function setCostSaving(min, max, price) {
  const value = $('#pricing-range').val();
  if (min <= value && value <= max) {
    $('#pricing-cost-saving').text('€ ' + price);
  }
}
