// Keeps a copy of the app on the phone so it still opens with no signal in the centre.
// Change VERSION whenever the app or maps change, so phones pick up the new copy.
const VERSION = "trip-shopping-v10";
const FILES = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "apple-touch-icon.png",
  "icon-512.png",
  "maps/01-kathmandu-to-rebel.png",
  "maps/02-rebel-to-harry-hartog.png",
  "maps/03-harry-hartog-to-escalator.png",
  "maps/04-escalator-to-jd-sports.png",
  "maps/05-jd-sports-to-breadtop.png",
  "maps/06-breadtop-to-bonds.png",
  "maps/07-bonds-to-myer.png",
  "maps/08-myer-to-seed.png",
  "maps/09-seed-to-mecca.png",
  "maps/10-mecca-to-lovisa.png",
  "maps/11-lovisa-to-big-w.png",
  "maps/12-big-w-to-kmart.png",
  "maps/13-kmart-to-escalator.png",
  "maps/14-big-w-to-escalator.png",
  "maps/15-woolworths-to-car-park.png",
  "maps/16-escalator-to-woolworths.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function timeout(ms) {
  return new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), ms));
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  // The page itself: try the internet first (to get updates), but fall back to the saved copy
  // after 3 seconds, so a weak signal never leaves you staring at a blank screen.
  if (req.mode === "navigate") {
    e.respondWith(
      Promise.race([fetch(req), timeout(3000)])
        .then((res) => {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put("index.html", copy));
          return res;
        })
        .catch(() => caches.match("index.html").then((hit) => hit || fetch(req)))
    );
    return;
  }

  // Maps, icons and fonts: use the saved copy, fetch and save anything new.
  e.respondWith(
    caches.match(req).then((hit) => hit || fetch(req).then((res) => {
      if (res.ok || res.type === "opaque") {
        const copy = res.clone();
        caches.open(VERSION).then((c) => c.put(req, copy));
      }
      return res;
    }))
  );
});
