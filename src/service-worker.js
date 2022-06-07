/* eslint-disable no-undef, no-restricted-globals */
import { setCacheNameDetails, skipWaiting, clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import { CacheFirst } from 'workbox-strategies';
import { registerRoute } from 'workbox-routing';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { RangeRequestsPlugin } from 'workbox-range-requests';

setCacheNameDetails({
  prefix: 'cw',
});

// This is the code piece that GenerateSW mode can't provide for us.
// This code listens for the user's confirmation to update the app.
registerRoute(
  new RegExp('https:\\/\\/static\\.dev\\.liber\\.casa\\/.*'),
  new CacheFirst({
    cacheName: 'assets',
    plugins: [
      new RangeRequestsPlugin(),
      new CacheableResponsePlugin({
        statuses: [0, 200, 206],
      }),
      new ExpirationPlugin({
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
      return cache.addAll([
        'https://static.dev.liber.casa/build/fonts/liber/iconmoon.css',
        'https://static.dev.liber.casa/build/styles/common/liber/variables.css',
      ]);
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

skipWaiting();

clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);

// The precaching code provided by Workbox.
self.__precacheManifest = [].concat(self.__precacheManifest || []);

precacheAndRoute(self.__precacheManifest, {});
