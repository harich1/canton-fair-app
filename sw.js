const CACHE = 'fairnote-v4';
const ASSETS = [
  '/canton-fair-app/',
  '/canton-fair-app/index.html',
  '/canton-fair-app/manifest.json',
  '/canton-fair-app/privacy.html',
  '/canton-fair-app/icon.svg',
  '/canton-fair-app/icon-192.png',
  '/canton-fair-app/icon-512.png',
  '/canton-fair-app/icon-maskable.png',
  '/canton-fair-app/logo.png',
  '/canton-fair-app/vendor/jszip.min.js'
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
  if (e.request.url.includes('api.github.com')) return;

  // HTML 문서는 네트워크 우선 — 앱 업데이트가 항상 즉시 반영됨
  if (e.request.destination === 'document') {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // 나머지 자산은 캐시 우선 (빠른 로딩 + 오프라인 지원)
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
