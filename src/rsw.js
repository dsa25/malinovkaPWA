const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const reg = await navigator.serviceWorker.register("./sw.js")
      if (reg.installing) {
        console.log("Service worker installing", reg)
      } else if (reg.waiting) {
        console.log("Service worker installed", reg)
      } else if (reg.active) {
        console.log("Service worker active", reg)
      }
    } catch (error) {
      console.log('"serviceWorker" in navigator ERROR !!!!!')
      console.error(`Registration failed with ${error}`)
    }
  }
}

// …

registerServiceWorker()
