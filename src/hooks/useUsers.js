import { ref, onMounted } from "vue"

export default function useUsers(limit) {
  const users = ref([])

  const fetching = async () => {
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=1`
      )
      users.value = await res.json()
    } catch (e) {
      console.log(e)
    }
  }

  onMounted(fetching)

  return {
    users
  }
}
