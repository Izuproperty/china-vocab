// China Vocab · Service Worker
// Caches app files for offline use
// Updated: 2026-05-26

const CACHE = 'china-vocab-v3';
const ASSETS = ['./manifest.json'];

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
  const url = e.request.url;
  // Network-first for all HTML and JSON — always fetch fresh content
  const isNetworkFirst = url.endsWith('.html') || url.endsWith('.json') || url.endsWith('/');
  e.respondWith(
    isNetworkFirst
      ? fetch(e.request)
          .then(res => {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
            return res;
          })
          .catch(() => caches.match(e.request))
      : caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
