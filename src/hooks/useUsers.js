import { ref, onMounted, computed } from "vue"
import { myFetch } from "@/func"

export default function useUsers(limit) {
  const users = ref([])

  const usersStatus = computed(() => {
    return users.value.filter((item) => item.status == 1)
  })

  const usersForSelect = computed(() => {
    let res = []
    usersStatus.value.forEach((item) => {
      res.push({ value: item.fio, name: item.fio })
    })
    return res
  })

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
  onMounted(getServerUsers)

  return {
    users,
    usersStatus,
    usersForSelect,
    getServerUsers
  }
}
