self.addEventListener('activate', event => {
  console.info('activate', event);
  event.waitUntil(self.clients.claim());
});
self.addEventListener('push', event => {
  console.info('push', event);
  const getData = data => {
    try { return data.json().notification; }
    catch (e) { return { title: 'Push Notification Title',  body: data.text() }; }
  };
  const message = event.data ? getData(event.data) : ',,Ծ‸Ծ,,';
  event.waitUntil(
    self.registration.showNotification &&
    self.registration.showNotification(message.title, message)
  );
});
self.addEventListener('install', event => {
  console.info('install', event);
  event.waitUntil(self.skipWaiting());
  const offlinePage = new Request('/');
  event.waitUntil(
    fetch(offlinePage)
    .then(response => {
      return caches.open('pwabuilder-offline')
      .then(cache => {
        console.log('[PWA Builder] Cached offline page during Install'+ response.url);
        return cache.put(offlinePage, response);
      });
  }));
});
self.addEventListener('fetch', event => {
  if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
    return;
  }
  event.respondWith(
    self.fetch(event.request)
    .catch(error => {
      console.error(`[PWA Builder] Network request Failed. Serving offline page ${error}`);
      return caches.open('pwabuilder-offline')
      .then(cache => {
        return cache.match('/');
      });
    })
  );
});
self.addEventListener('refreshOffline', response => {
  return caches.open('pwabuilder-offline')
  .then(cache => {
    console.log('[PWA Builder] Offline page updated from refreshOffline event: '+ response.url);
    return cache.put(offlinePage, response);
  });
});
