importScripts("https://oleinikovapolina.github.io/RickAndMorty/dist/precache-manifest.08c49e967b69b47141722e3776425444.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.core.setCacheNameDetails({prefix: "rick"});

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

self.addEventListener('fetch', event => {
    if (event.request.method === 'GET') return event.respondWith(networkFirst(event.request));
});

async function networkFirst(req) {
    const cache = await caches.open("rick");
    try {
        const networkResponse = await fetch(req);
        await cache.put(req, networkResponse.clone());
        return networkResponse;
    } catch (e) {
        return cache.match(req)
    }
}
/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
