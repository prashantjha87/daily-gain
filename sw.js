self.addEventListener("install", event => {
    event.waitUntil(
        caches.open("daily-gain-cache").then(cache => {
            return cache.addAll([
                "/",
                "/index.html",
                "/styles.css",
                "/app.js",
                "/manifest.json",
                "/icons/icon-192.png",
                "/icons/icon-512.png"
            ]);
        })
    );
    self.skipWaiting();
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
