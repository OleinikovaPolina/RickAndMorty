importScripts("https://oleinikovapolina.github.io/RickAndMorty/dist/precache-manifest.fabfe7b9bf98940dffd7dad256566f07.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

const dynamicCacheName = 'dynamic-cache-v1';

self.addEventListener('install', async () => {
    console.log('Service worker has been installed');
});

self.addEventListener('activate', async () => {
    console.log('Service worker has been activated');
});

self.addEventListener('fetch', event => {
    if (event.request.method === 'GET') return event.respondWith(networkFirst(event.request));
});

async function networkFirst(req) {
    const cache = await caches.open(dynamicCacheName);
    try {
        const networkResponse = await fetch(req);
        await cache.put(req, networkResponse.clone());
        return networkResponse;
    } catch (e) {
        return cache.match(req)
    }
}

