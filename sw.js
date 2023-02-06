console.log("sw.js:::")

const CACHE_VERSION = "v2"

const CACHE_FILES = [
  "index.html",
  "vite.svg",
  "/assets/index-0207cc77.js",
  "/assets/index-d21bb6e8.css",
  "/assets/sprite-b3562787.svg"
]

self.addEventListener("install", async (event) => {
  console.log("sw.install")
  const cache = await caches.open(CACHE_VERSION)
  CACHE_FILES.forEach(async (e) => {
    console.log(e)
    await cache.add(e)
  })
  await cache.addAll(CACHE_FILES)
})

self.addEventListener("activate", (event) => {
  console.log("sw.activate")
})

self.addEventListener("fetch", (event) => {
  console.log("FetchV1", event.request.url)
  event.respondWith(cacheFirst(event.request))
})

async function cacheFirst(request) {
  const cached = await caches.match(request)
  return cached ?? (await fetch(request))
}
