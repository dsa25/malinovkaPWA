import { ref, onMounted, computed } from "vue"
import { myFetch } from "@/func"
import {
  get as getDB,
  set as setDB,
  del as delKeyDB,
  clear as clearDB
} from "idb-keyval"

const notDate = { v: -1, date: "not date", c: 0 }
const usersV = ref(notDate)
const sectorsV = ref(notDate)

export default function useApp() {
  const setVersions = async () => {
    let usersVdb = await getDB("usersV")
    usersV.value = usersVdb ?? notDate
    let sectorsVdb = await getDB("sectorsV")
    sectorsV.value = sectorsVdb ?? notDate
    console.log({ u: usersV.value.v, s: sectorsV.value.v })
  }

  const checkVersions = async () => {
    try {
      let versions = {
        users: usersV.value.v,
        sectors: sectorsV.value.v
      }
      console.log({ versions })
      let url = import.meta.env.VITE_SERVER_URL
      const res = await myFetch(`${url}/checkVersions`, versions)
      console.log(": checkVers", res)
      // return
      if (res?.status == 1 && res?.body) {
        if (res.body?.sectors) {
          let sv = res.body.sectorsV
          sv.c = res.body.sectors.length
          await setDB("sectors", res.body.sectors)
          await setDB("sectorsV", sv)
        }
        if (res.body?.users) {
          let uv = res.body.usersV
          uv.c = res.body.users.length
          await setDB("users", res.body.users)
          await setDB("usersV", uv)
        }
        return
      }
    } catch (e) {
      console.log(e)
    }
  }

  onMounted(async () => {
    await setVersions()
    await checkVersions()
  })

  return {
    usersV,
    sectorsV
  }
}
