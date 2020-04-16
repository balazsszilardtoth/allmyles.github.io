$(document).ready(function() {
  $('#contact-send-button').on('click', function() {
    const emailjsConfig = $('.contact-form').data('emailjs-config');

    const email = $('#email');
    const firstName = $('#first-name');
    const lastName = $('#last-name');
    const message = $('#message');

    const isValidEmail = validate('email', email);
    const isValidFirstName = validate('firstName', firstName);
    const isValidLastName = validate('lastName', lastName);
    const isValidMessage = validate('message', message);

    if (isValidEmail && isValidFirstName && isValidLastName && isValidMessage) {
      $('.spinner-border').css('display', 'inline-block');
      $('#contact-send-button')
        .css('opacity', '.7')
        .attr('disabled', 'disabled');

      const templateParams = {
        email: email.val(),
        firstname: firstName.val(),
        lastname: lastName.val(),
        message: message.val(),
      };

      emailjs
        .send(
          emailjsConfig.emailjs_service_id,
          emailjsConfig.emailjs_template_id,
          templateParams,
          emailjsConfig.emailjs_user_id,
        )
        .then(
          function(response) {
            isSendEmail('success');
          },
          function(err) {
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
      element
        .siblings('.alert')
        .css('display', 'none')
        .text('');
      return true;
    }
  } else {
    element.addClass('is-invalid');
    element
      .siblings('.alert')
      .css('display', 'block')
      .text('Please fill in');
    return false;
  }
}

function isSendEmail(status) {
  $('.contact-form')
    .trigger('reset')
    .css('display', 'none');
  $('.spinner-border').removeAttr('style');
  $('#contact-send-button').removeAttr('style disabled');
  $('.contact-' + status + '-box').css('display', 'block');
  $('#contact-' + status + '-button').on('click', function() {
    $('.contact-' + status + '-box').css('display', 'none');
    $('.contact-form').css('display', 'block');
  });
}
