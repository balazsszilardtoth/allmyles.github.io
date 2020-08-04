$(document).ready(function () {
  !(function (f, b, e, v, n, t) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = 1;
    t.defer = 1;
    t.src = v;
    b.body.appendChild(t);
  })(
    window,
    document,
    'script',
    'https://connect.facebook.net/en_US/fbevents.js',
  );
  fbq('init', '877131375794306');
  fbq('track', 'PageView');
});
