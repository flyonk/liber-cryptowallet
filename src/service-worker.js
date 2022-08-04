/* eslint-disable no-undef, no-restricted-globals */
import { setCacheNameDetails, skipWaiting, clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import { CacheFirst, NetworkFirst } from 'workbox-strategies';
import { registerRoute } from 'workbox-routing';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { RangeRequestsPlugin } from 'workbox-range-requests';

setCacheNameDetails({
  prefix: 'cw',
});

registerRoute(
  new RegExp(`${process.env.VUE_APP_STATIC_STORAGE_URL}\\/.*`),
  new CacheFirst({
    cacheName: `assets-${process.env.VUE_APP_VERSION}`,
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

registerRoute(
  new RegExp(`${process.env.VUE_APP_BASE_API_URL}\\/.*`),
  new NetworkFirst({
    networkTimeoutSeconds: 3,
    cacheName: 'api',
    plugins: [
      new RangeRequestsPlugin(),
      new CacheableResponsePlugin({
        statuses: [0, 200, 206],
      }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 5 * 60, // 5 minutes
      }),
    ],
  })
);

self.addEventListener('install', (event) => {
  // console.log(event);
  event.waitUntil(
    caches.open(`assets-${process.env.VUE_APP_VERSION}`).then(function (cache) {
      return cache.addAll([
        '/',
        `${process.env.VUE_APP_STATIC_STORAGE_URL}/build/fonts/${process.env.VUE_APP_BRAND}/iconmoon.css`,
        `${process.env.VUE_APP_STATIC_STORAGE_URL}/build/styles/common/${process.env.VUE_APP_BRAND}/variables.css`,
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
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
