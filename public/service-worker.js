self.addEventListener('install', (event) => {
  console.info('install', event);
  event.waitUntil(self.skipWaiting());
});
self.addEventListener('activate', (event) => {
  console.info('activate', event);
  event.waitUntil(self.clients.claim());
});
self.addEventListener('push', (event) => {
  console.info('push', event);
  const message = event.data ? event.data.text() : '(・∀・)';
  event.waitUntil(
    self.registration.showNotification('Push Notification Title', {
      body: message,
      icon: 'https://i.gyazo.com/69e6152de89ca872c9a2540d401db927.png',
      tag: 'push-notification-tag',
    })
  );
});
self.addEventListener('install', function(event) {
  var offlinePage = new Request('/');
  event.waitUntil(
    fetch(offlinePage)
    .then(function(response) {
      return caches.open('pwabuilder-offline')
      .then(function(cache) {
        console.log('[PWA Builder] Cached offline page during Install'+ response.url);
        return cache.put(offlinePage, response);
      });
  }));
});
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request)
    .catch(function(error) {
      console.error( '[PWA Builder] Network request Failed. Serving offline page ' + error );
      return caches.open('pwabuilder-offline')
      .then(function(cache) {
        return cache.match('/');
      });
    })
  );
});
self.addEventListener('refreshOffline', function(response) {
  return caches.open('pwabuilder-offline')
  .then(function(cache) {
    console.log('[PWA Builder] Offline page updated from refreshOffline event: '+ response.url);
    return cache.put(offlinePage, response);
  });
});
