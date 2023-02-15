import { ref, onMounted, computed } from "vue"
import { myFetch } from "@/func"
import {
  get as getDB,
  set as setDB,
  del as delKeyDB,
  clear as clearDB
} from "idb-keyval"

const userName = ref("")

export default function useUsers(limit) {
  const users = ref([])

  const usersStatus = computed(() => {
    return users.value.filter((item) => item.status == 1)
  })

  const usersForSelect = computed(() => {
    let res = []
    usersStatus.value.forEach((item) => {
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

  const getServerUsers = async () => {
    try {
      const res = await myFetch(`${import.meta.env.VITE_SERVER_URL}/users`)
      console.log(": getServerUsers", res)
      if (res?.status == 1 && res?.body) {
        users.value = res.body
      }
    } catch (e) {
      console.log(e)
    }
  }

  const fetching = async () => {
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=2&_page=1`
      )
      users.value = await res.json()
      console.log("get users jsonplaceholder fetching", users.value)
    } catch (e) {
      console.log(e)
    }
  }

  // onMounted(fetching)
  onMounted(getUserName)
  onMounted(getServerUsers)

  return {
    users,
    userName,
    usersStatus,
    usersForSelect,
    updateUserName,
    getUserName,
    getServerUsers
  }
}
