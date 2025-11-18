const CACHE_VERSION = 'v1';
const CACHE_NAME = `allmyles-${CACHE_VERSION}`;
const OFFLINE_FALLBACK_PAGE = "index.html";

// Assets to precache for better performance
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/assets/css/vendor.min.css',
  '/assets/css/main.min.css',
  '/assets/css/cookieconsent.min.css',
  '/assets/js/vendor.bundle.min.js',
  '/assets/js/main.min.js',
  '/assets/fonts/Aeonik/Aeonik-Regular.otf',
  '/assets/fonts/Aeonik/Aeonik-Bold.otf',
  '/assets/fonts/Aeonik/Aeonik-Light.otf',
  '/assets/fonts/Aeonik/Aeonik-Medium.otf',
  '/assets/images/landing-hero.svg',
  '/assets/images/logo.svg'
];

// Install event - precache critical assets
self.addEventListener("install", function (event) {
  console.log("[ServiceWorker] Install event - precaching assets");

  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("[ServiceWorker] Precaching critical assets");
      return cache.addAll(PRECACHE_ASSETS);
    }).then(function() {
      return self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", function (event) {
  console.log("[ServiceWorker] Activate event - cleaning old caches");

  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log("[ServiceWorker] Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

// Fetch event - implement caching strategies
self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // Cache-first strategy for static assets (CSS, JS, fonts, images)
  if (
    url.pathname.match(/\.(css|js|woff2?|ttf|otf|eot|svg|png|jpg|jpeg|gif|webp|ico)$/)
  ) {
    event.respondWith(
      caches.match(event.request).then(function (cachedResponse) {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request).then(function (response) {
          // Only cache successful responses
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then(function (cache) {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        });
      })
    );
  }
  // Network-first strategy for HTML pages
  else {
    event.respondWith(
      fetch(event.request)
        .then(function (response) {
          // Cache the page for offline use
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(function () {
          // If network fails, try cache, then fallback page
          return caches.match(event.request).then(function (cachedResponse) {
            return cachedResponse || caches.match(OFFLINE_FALLBACK_PAGE);
          });
        })
    );
  }
});
