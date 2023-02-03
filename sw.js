console.log("swJs..")
self.addEventListener("install", (event) => {
  console.log("sw.install")
})

self.addEventListener("activate", (event) => {
  console.log("sw.activate")
})
