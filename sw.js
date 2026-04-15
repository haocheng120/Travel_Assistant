const CACHE_NAME = 'korea-trip-v1';
const ASSETS_TO_CACHE = [
  './index.html',
  './manifest.json',
  './static/img/banner.png',
  './static/img/app.jpg',
  
];

// 安裝階段：快取靜態資源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 攔截請求：如果沒網路，就從快取拿資料
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // 如果快取裡有，就回傳快取；沒有就透過網路抓
      return response || fetch(event.request);
    })
  );
});