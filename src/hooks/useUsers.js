import { ref, onMounted, computed } from "vue"
import { myFetch, deepClone } from "@/func"
import {
  get as getDB,
  set as setDB,
  del as delKeyDB,
  clear as clearDB
} from "idb-keyval"

const userName = ref("")
const users = ref([])

export default function useUsers(limit) {
  const getUsers = async () => {
    try {
      let usDB = await getDB("users")
      console.log("user.local", usDB)
      if (usDB && usDB.length) users.value = usDB
      else return alert("Пользователи отсутствуют! Необходимо их загрузить!")
      return
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
    getUsers()
    getUserName()
  })

  return {
    users,
    // getUsers,
    userName,
    usersForSelect,
    updateUserName
  }
}
