import { ref, onMounted, computed } from "vue"
import { get as getDB, set as setDB } from "idb-keyval"
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

  onMounted(getInspections)

  return {
    inspections,
    addInspection,
    getInspections
  }
}
