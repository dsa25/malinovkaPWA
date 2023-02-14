<template>
  <div>
    <h2>Пользователи</h2>
    <hr />
    <div v-if="usersStatus.length">
      <div class="user" v-for="(user, index) in usersStatus" :key="user.id">
        <span class="">{{ index + 1 }}</span>
        <span class="">{{ user.fio }}</span>
      </div>
    </div>
    <div v-else>Нет пользователей</div>
    <!-- <div v-for="(user, index) in usersStatus" :key="user.id">
      <input
        :id="'id_' + user.id"
        class="radio"
        type="radio"
        v-model="myName"
        :value="user"
      />
      <label :for="'id_' + user.id">{{ index + 1 }} {{ user.fio }} </label>
    </div> -->
  </div>
</template>

<script>
import useUsers from "@/hooks/useUsers"

export default {
  name: "UserPage",
  setup(props) {
    const { usersStatus } = useUsers()

    return { usersStatus }
  }
}
</script>

<style>
.user {
  padding: 5px;
  margin: 7px 0;
}
.user span {
  display: inline-block;
  margin-right: 10px;
}
</style>
