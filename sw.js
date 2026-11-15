// NYTEGAZE offline support.
// The app always checks GitHub for a newer page first, so updates show up the next time it opens.
// Bump VERSION when you change images or icons so phones pick up the new files.
const VERSION = "nytegaze-v4";
const CORE = ["./", "index.html", "manifest.webmanifest", "img/logo.webp", "img/icon-192.png", "img/icon-512.png", "img/apple-touch-icon.png", "img/favicon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION)
    .then(c => Promise.all(CORE.map(u => fetch(u, { cache: "reload" }).then(r => r.ok && c.put(u, r)).catch(() => {}))))
    .then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Songs and videos stream straight from the server (phones request them in pieces).
  if (req.headers.has("range") || /\.(mp3|m4a|wav|mp4|mov|webm)$/i.test(url.pathname)) return;
  // The app page itself: always ask GitHub for the newest version (skipping the browser's own cache),
  // and only use the saved copy when there's no signal.
  if (req.mode === "navigate") {
    e.respondWith(fetch(req, { cache: "no-cache" })
      .then(r => { if (r.ok) { const copy = r.clone(); caches.open(VERSION).then(c => c.put("index.html", copy)); } return r; })
      .catch(() => caches.match("index.html").then(hit => hit || caches.match("./"))));
    return;
  }
  // Our own files (flyers, icons, manifest): network first, saved copy offline.
  if (url.origin === location.origin) {
    e.respondWith(fetch(req, { cache: "no-cache" })
      .then(r => { if (r.ok) { const copy = r.clone(); caches.open(VERSION).then(c => c.put(req, copy)); } return r; })
      .catch(() => caches.match(req)));
    return;
  }
  // Other sites (fonts, Drive thumbnails): saved copy first, refresh in the background.
  e.respondWith(caches.match(req).then(hit => {
    const net = fetch(req).then(r => { if (r.ok || r.type === "opaque") { const copy = r.clone(); caches.open(VERSION).then(c => c.put(req, copy)); } return r; }).catch(() => hit);
    return hit || net;
  }));
});
