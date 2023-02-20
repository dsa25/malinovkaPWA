import { ref, onMounted, computed } from "vue"
import {
  get as getDB,
  set as setDB,
  del as delKeyDB,
  clear as clearDB
} from "idb-keyval"
import { deepClone, myFetch } from "@/func.js"

const inspections = ref([])

export default function useInspections() {
  const SERVER_URL = ref(import.meta.env.VITE_SERVER_URL)

  const getInspections = async () => {
    try {
      let res = await getDB("inspections")
      inspections.value = res ?? []
    } catch (e) {
      console.log(e)
    }
  }

  const addInspection = async (data) => {
    try {
      console.log(data)
      console.log(inspections.value)
      inspections.value.unshift(deepClone(data))
      console.log(inspections.value)
      await setDB("inspections", deepClone(inspections.value))
    } catch (e) {
      console.log(e)
    }
  }

  const updateStatusInspection = async (idLoc) => {
    try {
      console.log("do" + deepClone(inspections.value))
      for (const item of inspections.value) {
        if (item.idLoc == idLoc) {
          item.status = 1
          item.srcPhoto = ""
          delete item.send
          break
        }
      }
      console.log("posle" + deepClone(inspections.value))
      await setDB("inspections", deepClone(inspections.value))
    } catch (e) {
      console.log(e)
    }
  }

  const sendInspection = async (data) => {
    try {
      let dataDP = deepClone(data)
      console.log("sendInspection", dataDP)
      console.log("url", `${SERVER_URL.value}/addInspect`)
      const res = await myFetch(`${SERVER_URL.value}/addInspect`, dataDP)
      console.log("res", res)
      if (res?.status == 1 && res?.body != undefined) {
        updateStatusInspection(dataDP.idLoc)
        return
      } else alert(res.msg)
    } catch (e) {
      console.log(e)
    }
  }

  const deleteInspections = async () => {
    try {
      // await delKeyDB("inspections")
      await clearDB()
      console.log("clear")
      await getInspections()
    } catch (e) {
      console.log(e)
    }
  }

  onMounted(getInspections)

  return {
    inspections,
    addInspection,
    getInspections,
    sendInspection,
    deleteInspections
  }
}
