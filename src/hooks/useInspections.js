import { ref, onMounted, computed } from "vue"
import {
  get as getDB,
  set as setDB,
  del as delKeyDB,
  clear as clearDB
} from "idb-keyval"
import { deepClone } from "@/func.js"

const inspections = ref([])

export default function useInspections() {
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
      inspections.value.push(deepClone(data))
      console.log(inspections.value)
      await setDB("inspections", deepClone(inspections.value))
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
    deleteInspections
  }
}
