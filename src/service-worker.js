/* eslint-disable no-undef, no-restricted-globals */
workbox.core.setCacheNameDetails({
  prefix: 'cw',
});

// This is the code piece that GenerateSW mode can't provide for us.
// This code listens for the user's confirmation to update the app.
workbox.routing.registerRoute(
  new RegExp('https://static.dev.liber.casa'),
  new workbox.strategies.CacheFirst({
    cacheName: 'assets',
    plugins: [
      new workbox.rangeRequests.Plugin(),
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200, 206],
      }),
      new workbox.expiration.Plugin({
        maxEntries: 20,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
);

self.addEventListener('install', (event) => {
  console.log('INSTALL', event);
  event.waitUntil(
    caches.open('assets').then(function (cache) {
      return cache.addAll(['https://static.dev.liber.casa']);
    })
  );
});

self.addEventListener('push', (event) => {
  console.debug('[SW] Push Received');
  console.debug(`[SW] Push received data: ${event.data.text()}`);
});

// self.addEventListener('message', (event) => {
//   console.log(event);
//   if (event.data && event.data.type === 'SKIP_WAITING') {
//     self.skipWaiting();
//   }
// });

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

workbox.core.skipWaiting();

workbox.core.clientsClaim();

// The precaching code provided by Workbox.
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
