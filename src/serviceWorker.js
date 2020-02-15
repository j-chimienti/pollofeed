const pollofeedStatic = "pollofeed-v1"

const assets = [
    "style.css",
    // "client.bundle.min.js",
    "banner.png",
    "BigBlack.jpg",
    "daisy.jpg",
    "KarenLori.jpg",
    "Parkour.jpg",
    "pollofeed.png",
]

self.addEventListener("install", installEvent =>
    installEvent.waitUntil(
        caches.open(pollofeedStatic).then(cache =>
            cache.addAll(assets)
        )
    )
)

self.addEventListener("fetch", fetchEvent =>
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res =>
            res || fetch(fetchEvent.request)
        )
    )
)
