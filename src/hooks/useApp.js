import { ref, onMounted, onBeforeMount, computed } from "vue"
import { myFetch } from "@/func"
import {
  get as getDB,
  set as setDB,
  del as delKeyDB,
  clear as clearDB
} from "idb-keyval"

const checkMainData = ref(false)

export default function useApp() {
  const notDate = { v: -1, date: "not date", c: 0 }
  const usersV = ref(notDate)
  const sectorsV = ref(notDate)

  const setVersions = async () => {
    let usersVdb = await getDB("usersV")
    usersV.value = usersVdb ?? notDate
    let sectorsVdb = await getDB("sectorsV")
    sectorsV.value = sectorsVdb ?? notDate
  }

  const getCountMainData = async () => {
    let us = await getDB("users")
    let sec = await getDB("sectors")
    let res = {}
    res.u = us ? us.length : 0
    res.s = sec ? sec.length : 0
    return res
  }

  const checkVersions = async () => {
    try {
      console.log("start")
      await setVersions()
      let versions = {
        users: usersV.value.v,
        sectors: sectorsV.value.v
      }
      console.log(versions)
      let url = import.meta.env.VITE_SERVER_URL
      const res = await myFetch(`${url}/checkVersions`, versions, false)
      console.log("checkVers: ", res)
      if (res == undefined) {
        console.log("undefined!!!")
        let countD = await getCountMainData()
        console.log({ countD })

        if (countD.u == 0 || countD.s == 0) {
          // без пользователей и секторов сохранить показания не получится!
          alert(
            "Для корректной работы приложения должны быть загружены данные с сервера! Если с интернетом все в порядке, сообщите о проблеме админу!"
          )
        } else {
          // если пользователи и сектора есть локально, можно работать офлайн...
          checkMainData.value = true
        }
      }
      // return
      else if (res?.status == 1 && res?.body) {
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
        checkMainData.value = true
        return
      }
    } catch (e) {
      console.log("e", e)
    }
  }

  onBeforeMount(() => {
    checkVersions()
  })
  onMounted(() => {
    // setVersions()
  })

  return {
    checkMainData
  }
}
