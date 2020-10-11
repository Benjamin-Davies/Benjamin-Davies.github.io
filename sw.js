const precacheResources = [
  '/shared.js',
  '/shared.css',
];
const cacheName = 'cache';

self.addEventListener('install', event => {
  console.log('V1 installing…');

  event.waitUntil(
    caches
      .open(cacheName)
      .then((cache) =>
        Promise.all(precacheResources.map((res) => cache.add(res)))
      )
  );
});

self.addEventListener('fetch', async (event) => {
  const url = new URL(event.request.url);

  if (url.origin === location.origin) {
    if (url.pathname.indexOf('/', 1) === -1 && caches.has(url.pathname)) {
      event.respondWith(caches.match(url.pathname));
      await fetchAndCache(url);
    } else {
      event.respondWith(await fetchAndCache(event.request, url.pathname));
    }
  }
});

/**
 * @param {URL} url
 */
async function fetchAndCache(req) {
  const res = await fetch(req);
  const cache = await caches.open(cacheName);
  await cache.put(req, res);
  return res;
}
