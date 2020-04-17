$(document).ready(function() {
  const password = $('.sign-up .sign-up-form #second #password');

  $(password).on('keyup', function() {
    const value = password.val(),
      color = testPasswordStrength(value);

    styleStrengthLine(color, value);
  });

  $('.sign-up .sign-up-form #second .eye').on('click', function(e) {
    e.preventDefault();

    if (password.attr('type') === 'password') {
      password.attr('type', 'text');
      password
        .siblings('.eye')
        .css('background-image', 'url(./../../assets/icons/eye-active.svg)');
    } else {
      password.attr('type', 'password');
      password
        .siblings('.eye')
        .css('background-image', 'url(./../../assets/icons/eye-default.svg)');
    }
  });

  $('.sign-up .sign-up-form #third #terms-confirmation-checkbox-1').on(
    'click',
    function() {
      const thirdButton = $('.sign-up .sign-up-form #third button');

      $(this).is(':checked')
        ? thirdButton.removeClass('disabled').prop('disabled', false)
        : thirdButton.addClass('disabled').prop('disabled', true);
    },
  );

  $('.sign-up .sign-up-form #fourth #card-protection-confirmation-checkbox').on(
    'click',
    function() {
      const passwordFormGroup = $('.sign-up .sign-up-form #fourth .form-group');

      $(this).is(':checked')
        ? passwordFormGroup.css('display', 'block')
        : passwordFormGroup.css('display', 'none');
    },
  );

  $('.sign-up .sign-up-form #fourth .eye').on('click', function(e) {
    e.preventDefault();

    const confirmPassword = $(
      '.sign-up .sign-up-form #fourth #confirm-password',
    );

    if (confirmPassword.attr('type') === 'password') {
      confirmPassword.attr('type', 'text');
      confirmPassword
        .siblings('.eye')
        .css('background-image', 'url(./../../assets/icons/eye-active.svg)');
    } else {
      confirmPassword.attr('type', 'password');
      confirmPassword
        .siblings('.eye')
        .css('background-image', 'url(./../../assets/icons/eye-default.svg)');
    }
  });

  $('.sign-up .sign-up-form #fourth #terms-confirmation-checkbox-2').on(
    'click',
    function() {
      const fourthButton = $('.sign-up .sign-up-form #fourth button');

      $(this).is(':checked')
        ? fourthButton.removeClass('disabled').prop('disabled', false)
        : fourthButton.addClass('disabled').prop('disabled', true);
    },
  );

  $('#card-number').keyup(function() {
    let cardNumber = $(this)
      .val()
      .replace(/[^0-9]/g, '')
      .split(' ')
      .join('');

    if (cardNumber.length > 0) {
      cardNumber = cardNumber.match(new RegExp('.{1,4}', 'g')).join(' ');
    }

    $(this).val(cardNumber);
  });

  $('#expiration-date').keyup(function() {
    let expirationDate = $(this)
      .val()
      .replace(/[^0-9]/g, '')
      .split(' ')
      .join('');

    if (expirationDate.length > 0) {
      expirationDate = expirationDate
        .replace(/^([1-9]\/|[2-9])$/g, '0$1')
        .replace(/^(0[1-9]|1[0-2])$/g, '$1')
        .match(new RegExp('.{1,2}', 'g'))
        .join(' / ');
    }

    $(this).val(expirationDate);
  });

  $('#cvc').keyup(function() {
    const cvc = $(this)
      .val()
      .replace(/[^0-9]/g, '');

    $(this).val(cvc);
  });

  $('.sign-up .sign-up-form #pills-personal-tab').click(function() {
    $(
      '.sign-up .sign-up-form #progress-company, .sign-up .sign-up-form #third',
    ).hide();
  });

  $('.sign-up .sign-up-form #pills-business-tab').click(function() {
    $(
      '.sign-up .sign-up-form #progress-company, .sign-up .sign-up-form #third',
    ).show();
  });

  $('.sign-up .sign-up-form fieldset:visible .next').click(function() {
    const progressDots = $('.sign-up .sign-up-form #progress li');
    const current_fs = $(this).parent();
    const next_fs = $(this).parent().next();
    const visible_fs = $('.sign-up .sign-up-form fieldset:visible');

    progressDots.eq($('fieldset').index(current_fs)).removeClass('is-current');
    progressDots
      .eq($('fieldset').index($(this).parent().next('fieldset:visible')))
      .addClass('active is-current');

    visible_fs
      .eq(visible_fs.index(current_fs))
      .css('display', 'none')
      .css('visibility', 'hidden')
      .css('opacity', '0');

    visible_fs
      .eq(visible_fs.index(next_fs))
      .css('height', 'auto')
      .css('visibility', 'visible')
      .css('opacity', '1')
      .css('transform', 'translateX(0)');
  });

  $('.sign-up .sign-up-form fieldset:visible #submit').click(function() {
    return false;
  });
});

// check password strength
function testPasswordStrength(value) {
  var strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})'),
    mediumRegex = new RegExp(
      '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})',
    );

  if (strongRegex.test(value)) {
    return 'blue';
  } else if (mediumRegex.test(value)) {
    return 'red-second';
  } else {
    return 'red-first';
  }
}

function styleStrengthLine(color, value) {
  const line = $('.strength-indicator .strength-lines .line');
  const alert = $('.strength-indicator .alert');

  line.removeClass('color-red color-royal-blue');
  alert
    .css('display', 'none')
    .removeClass('alert-danger alert-success')
    .text('');

  if (value && color === 'red-first') {
    line.eq(0).addClass('color-red');
    alert.css('display', 'block').addClass('alert-danger').text('Weak');
  } else if (value && color === 'red-second') {
    line.not(':eq(2)').addClass('color-red');
    alert.css('display', 'block').addClass('alert-danger').text('Medium');
  } else if (value && color === 'blue') {
    line.addClass('color-royal-blue');
    alert.css('display', 'block').addClass('alert-success').text('Strong');
  }
}
