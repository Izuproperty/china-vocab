// China Vocab · Service Worker
// Caches app files for offline use

const CACHE = 'china-vocab-v2';
const ASSETS = ['./index.html', './vocab.json', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      // Network-first for index.html and vocab.json so updates always come through
      if (e.request.url.endsWith('vocab.json') || e.request.url.endsWith('index.html') || e.request.url.endsWith('/')) {
        return fetch(e.request)
          .then(res => {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
            return res;
          })
          .catch(() => cached);
      }
      return cached || fetch(e.request);
    })
  );
});
