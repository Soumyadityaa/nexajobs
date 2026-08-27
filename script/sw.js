const CACHE_NAME = 'nexajobs-v1';
const urlsToCache = [
  './',
  './index.html',
  './kanban.html',
  './about.html',
  './contact.html',
  './privacy.html',
  './css/style.css',
  './script/script.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});