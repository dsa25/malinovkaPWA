import { ref, onMounted, computed } from "vue"
import { myFetch, deepClone } from "@/func"
import {
  get as getDB,
  set as setDB,
  del as delKeyDB,
  clear as clearDB
} from "idb-keyval"

const notDate = { v: -1, date: "not date", c: 0 }
const usersV = ref(notDate)
const sectorsV = ref(notDate)

const userName = ref("")
const users = ref([])

export default function useUsers(limit) {
  const setVersions = async () => {
    let usersVdb = await getDB("usersV")
    usersV.value = usersVdb ?? notDate
    let sectorsVdb = await getDB("sectorsV")
    sectorsV.value = sectorsVdb ?? notDate
  }

  const getUsers = async () => {
    try {
      let usDB = await getDB("users")
      // console.log("user.local", usDB)
      if (usDB && usDB.length) return (users.value = usDB)
      else return alert("Пользователи отсутствуют! Необходимо их загрузить!")
    } catch (e) {
      console.log(e)
    }
  }

  const usersForSelect = computed(() => {
    let list = deepClone(users.value)
    let res = []
    list.forEach((item) => {
      res.push({ value: item.fio, text: item.fio })
    })
    return res
  })

  const getUserName = async () => {
    try {
      let res = await getDB("userName")
      userName.value = res ?? ""
    } catch (e) {
      console.log(e)
    }
  }

  const updateUserName = async (data) => {
    try {
      console.log(data)
      await setDB("userName", data)
      userName.value = data
    } catch (e) {
      console.log(e)
    }
  }

  onMounted(() => {
    setVersions()
    getUsers()
    getUserName()
  })

  return {
    users,
    usersV,
    sectorsV,
    // getUsers,
    userName,
    usersForSelect,
    updateUserName
  }
}
