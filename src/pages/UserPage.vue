<template>
  <div>
    <h1>userPage</h1>
    <div v-if="users.length">
      <div class="post" v-for="user in users" :key="user.id">
        <div class="card-title">{{ user.title }}</div>
        <div class="card-body">{{ user.body }}</div>
      </div>
    </div>
    <div v-else>not data jsonplaceholder</div>
  </div>
</template>

<script>
import useUsers from "@/hooks/useUsers"

export default {
  name: "UserPage",

  setup(props) {
    const { users } = useUsers(3)

    return { users }
  }
}
</script>

<style>
.post {
  border: 1px solid red;
  padding: 10px;
  margin: 20px 0;
}
.card-title {
  font-weight: 700;
}
</style>
