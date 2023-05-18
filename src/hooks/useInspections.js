import { ref, onMounted, computed } from "vue"
import {
  get as getDB,
  set as setDB,
  del as delKeyDB,
  clear as clearDB
} from "idb-keyval"
import { deepClone, myFetch, getTime } from "@/func.js"

const inspections = ref([])

export default function useInspections() {
  const SERVER_URL = ref(import.meta.env.VITE_SERVER_URL)

  const getInspections = async () => {
    try {
      let res = await getDB("inspections")
      inspections.value = res ?? []
      // при запуске приложения оставляем показания только за текущий месяц
      if (inspections.value.length) {
        let currentMonth = getTime().split(".")[1]
        let currentMonthList = []
        inspections.value.forEach((item) => {
          let itemMonth = getTime(item.dateInspection).split(".")[1]
          if (currentMonth == itemMonth || item.status == 0) {
            currentMonthList.push(deepClone(item))
          }
        })
        inspections.value = currentMonthList
        await setDB("inspections", currentMonthList)
      }
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
      let newInsp = deepClone(inspections.value)
      // чтобы в local db не сохранился статус отправки, а то получим бесконечный loader для юзера
      for (const item of newInsp) {
        delete item.send
      }
      await setDB("inspections", newInsp)
      inspections.value = deepClone(newInsp)
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
      const res = await myFetch(`${SERVER_URL.value}/addInspect`, dataDP, false)
      console.log("res", res)
      if (res == undefined) {
        alert(
          "Возможно отсутствует подключение к интернету. Попробуйте отправить показания позже. Если с интернетом все впорядке - сообщите о проблеме админу!"
        )
        delete data.send
      } else if (res?.status == 1 && res?.body != undefined) {
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
