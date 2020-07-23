$(document).ready(function () {
  (function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    var j = d.createElement(s),
      dl = l != 'dataLayer' ? '&l=' + l : '';
    j.async = !0;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    d.body.appendChild(j);
  })(window, document, 'script', 'dataLayer', 'GTM-WMV9FM');
});
