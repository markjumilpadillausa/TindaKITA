/* TindaKita service worker.
   Keeps the app shell available offline so the app opens like an installed app.
   Sales, drinks and shares always come from the Google Sheet, so they are never cached here.
   When you upload a new index.html to GitHub, change the number in CACHE (for example v2). */
const CACHE = 'tindakita-v7';
const FONTS = 'tindakita-fonts-v1';
const SHELL = ['./', 'index.html', 'manifest.json', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'icon-180.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => Promise.all(SHELL.map((u) => c.add(u).catch(() => null)))).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE && k !== FONTS).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  /* Google Fonts: show the saved copy, refresh in the background */
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.open(FONTS).then((c) =>
        c.match(req).then((hit) => {
          const net = fetch(req).then((res) => { if (res && (res.ok || res.type === 'opaque')) c.put(req, res.clone()); return res; }).catch(() => hit);
          return hit || net;
        })
      )
    );
    return;
  }

  /* Everything else on another site (the Apps Script API, Drive photos) goes straight to the network */
  if (url.origin !== self.location.origin) return;

  /* The page itself: the saved copy opens at once (so the app is ready when a customer is waiting),
     and a fresh copy is fetched in the background for the next time */
  if (req.mode === 'navigate') {
    event.respondWith(
      caches.match('index.html').then((hit) => {
        const net = fetch(req).then((res) => { if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put('index.html', copy)); } return res; }).catch(() => hit);
        return hit || net;
      })
    );
    return;
  }

  /* Icons and manifest: saved copy first, refresh in the background */
  event.respondWith(
    caches.match(req).then((hit) => {
      const net = fetch(req).then((res) => { if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); } return res; }).catch(() => hit);
      return hit || net;
    })
  );
});
