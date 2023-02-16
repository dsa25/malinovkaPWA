// import { ref, computed } from "vue"
// import { myFetch } from "@/func"

export default function usePhoto() {
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })

  const CompressImage = (base64) =>
    new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas")
      const img = document.createElement("img")
      img.src = base64

      img.onload = function () {
        let width = img.width
        let height = img.height
        const maxHeight = 800
        const maxWidth = 800

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height *= maxWidth / width))
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width *= maxHeight / height))
            height = maxHeight
          }
        }
        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext("2d")
        ctx.drawImage(img, 0, 0, width, height)

        let compressedData = canvas.toDataURL("image/jpeg", 0.7)
        resolve(compressedData)
      }
      img.onerror = function (e) {
        reject(e)
        console.log(e)
      }
    })

  async function getCompressPhoto(file) {
    try {
      const fileBase64 = await toBase64(file)
      //   console.log({ fileBase64 })
      const result = await CompressImage(fileBase64)
      //   console.log({ resultCPI: result })
      return result
    } catch (error) {
      console.error(error)
      return
    }
  }

  return {
    getCompressPhoto
  }
}
