const CACHE = 'fairnote-v3.1';
const ASSETS = [
  '/canton-fair-app/',
  '/canton-fair-app/index.html',
  '/canton-fair-app/manifest.json',
  '/canton-fair-app/privacy.html',
  '/canton-fair-app/icon.svg',
  '/canton-fair-app/icon-192.png',
  '/canton-fair-app/icon-512.png',
  '/canton-fair-app/icon-maskable.png',
  'https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // GitHub API 요청은 캐시하지 않음
  if (e.request.url.includes('api.github.com')) return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res.ok && res.type !== 'opaque') {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => caches.match('/canton-fair-app/index.html'));
    })
  );
});
