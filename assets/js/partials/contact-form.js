$(document).ready(function () {
  $('#contact-send-button').on('click', function () {
    const emailjsConfig = $('#contact-form').data('emailjs-config');
    const mailchimpNewsletterFormActionUrl = $(
      '#mc-newsletter-form-action-url',
    ).data('mc-newsletter-form-action-url');

    const email = $('#email');
    const firstName = $('#firstName');
    const lastName = $('#lastName');
    const company = $('#company');
    const message = $('#message');
    const isNewsletter = $('#newsletter').prop('checked');

    const isValidEmail = validate('email', email);
    const isValidFirstName = validate('firstName', firstName);
    const isValidLastName = validate('lastName', lastName);
    const isValidMessage = validate('message', message);

    if (isValidEmail && isValidFirstName && isValidLastName && isValidMessage) {
      $('.spinner-border').css('display', 'inline-block');
      $('#contact-send-button')
        .css('opacity', '.7')
        .attr('disabled', 'disabled');

      if (isNewsletter) {
        $('#contact-form').ajaxChimp({
          url: mailchimpNewsletterFormActionUrl,
          callback: isSubscribeNewsletter,
        });
        $('#contact-send-button').trigger('submit');
      } else {
        $('.contact-success-box h3').css('margin-bottom', '72px');
        $('.contact-success-box h4').css('display', 'none');
      }

      const templateParams = {
        email: email.val(),
        firstname: firstName.val(),
        lastname: lastName.val(),
        company: company.val(),
        message: message.val(),
        newsletter: isNewsletter ? 'Yes' : 'No',
      };

      emailjs
        .send(
          emailjsConfig.emailjs_service_id,
          emailjsConfig.emailjs_template_id,
          templateParams,
          emailjsConfig.emailjs_user_id,
        )
        .then(
          function (response) {
            isSendEmail('success');
          },
          function (err) {
            isSendEmail('error');
          },
        );
    }
  });
});

function validate(fieldName, element) {
  if (element.val().length > 0) {
    if (
      fieldName === 'email' &&
      !element.val().match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
    ) {
      element.addClass('is-invalid');
      element
        .siblings('.alert')
        .css('display', 'block')
        .text('Please enter a valid email address');
      return false;
    } else {
      element.removeClass('is-invalid');
      element.siblings('.alert').css('display', 'none').text('');
      return true;
    }
  } else {
    element.addClass('is-invalid');
    element.siblings('.alert').css('display', 'block').text('Please fill in');
    return false;
  }
}

function isSubscribeNewsletter(res) {
  $('.contact-form').trigger('reset');
  if (res.result === 'success') {
    $('.contact-success-box h3').css('margin-bottom', '16px');
    $('.contact-success-box h4').css('display', 'block');
  } else {
    console.error('FAILURE: ', res.msg);
  }
  return false;
}

function isSendEmail(status) {
  $('.contact-form').trigger('reset').css('display', 'none');
  $('.spinner-border').removeAttr('style');
  $('#contact-send-button').removeAttr('style disabled');
  $('.contact-' + status + '-box').css('display', 'block');
  $('#contact-' + status + '-button').on('click', function () {
    $('.contact-form').trigger('reset');
    $('.contact-' + status + '-box').css('display', 'none');
    $('.contact-form').css('display', 'block');
  });
}
