$(document).ready(function () {
  window.fbAsyncInit = function () {
    FB.init({
      appId: '114993862613882',
      cookie: true,
      xfbml: true,
      version: 'v3.2',
    });
    FB.AppEvents.logPageView();
  };

  (function (d, s, id) {
    if (d.getElementById(id)) {
      return;
    }
    var js = d.createElement(s);
    js.id = id;
    js.async = 1;
    js.defer = 1;
    js.src = 'https://connect.facebook.net/en_US/sdk.js';
    d.body.appendChild(js);
  })(document, 'script', 'facebook-jssdk');
});
