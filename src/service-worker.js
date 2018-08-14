// service worker
const CACHE_URLS = [
  '/static/css/base/index.css',
  '/static/css/tablet/index.css',
  '/static/css/desktop/index.css',
]

const precacheManifest = CACHE_URLS.concat(self.__precacheManifest || [])

workbox.precaching.precacheAndRoute(precacheManifest);

self.addEventListener('install', function(event) {
  // service worker install step
  console.log('service worker installed!')
})