const cacheName = "static-v1";
const path = self.location;
const isRemote = path.origin.includes("ccplay");
const isDebug = path.origin.includes("127.0.0");
const pathRoot = isRemote ? "/test/facedetection/" : "/dist/";
const filesToCache = [
  pathRoot,
  pathRoot + "css/styles.css",
  pathRoot + "js/app.js",
  pathRoot + "js/bundle.js",
  pathRoot + "vid/fallback.mp4",
];
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    }),
  );
});
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      } else {
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse.ok) {
            caches.open(cacheName).then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
          }
          return networkResponse;
        });
      }
    }),
  );
});
