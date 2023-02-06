const CACHE_VERSION = "v10"

const CACHE_FILES = [
  "index.html",
  "vite.svg",
  "./assets/index-719d4790.js",
  "./assets/index-77304cf9.css",
  "./assets/sprite-b3562787.svg"
]

self.addEventListener("install", async (event) => {
  console.log("sw.install")
  const cache = await caches.open(CACHE_VERSION)
  await cache.addAll(CACHE_FILES)
})

self.addEventListener("activate", async (event) => {
  console.log("sw.activate")
  const cacheNames = await caches.keys()
  cacheNames
    .filter((name) => name !== CACHE_VERSION)
    .map((name) => caches.delete(name))
})

self.addEventListener("fetch", (event) => {
  // console.log("FetchV1", event.request.url)
  event.respondWith(cacheFirst(event.request))
})

async function cacheFirst(request) {
  const cached = await caches.match(request)
  return cached ?? (await fetch(request))
}
