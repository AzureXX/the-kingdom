// Placeholder service worker to prevent 404 errors
// This is a minimal service worker that does nothing but prevents browser errors

const CACHE_NAME = 'kingdom-idle-v1';

// Install event - just cache the service worker itself
self.addEventListener('install', () => {
  console.log('Service worker installed');
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service worker activated');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - for now, just pass through all requests
self.addEventListener('fetch', () => {
  // For now, we don't intercept any requests
  // This prevents 404 errors while allowing normal app functionality
  return;
});

// Message event - handle any messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
