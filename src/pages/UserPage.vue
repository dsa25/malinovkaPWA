<template>
  <div>
    <table class="table mb-7">
      <tr>
        <th>пользователи</th>
        <td>{{ usersV.c }}</td>
        <td>v: {{ usersV.v }}</td>
        <td>{{ myTime(usersV.date, "d.m.y") }}</td>
      </tr>
      <tr>
        <th>участки</th>
        <td>{{ sectorsV.c }}</td>
        <td>v: {{ sectorsV.v }}</td>
        <td>{{ myTime(sectorsV.date, "d.m.y") }}</td>
      </tr>
    </table>

    <div v-if="users.length">
      <div class="user" v-for="(user, index) in users" :key="user.id">
        <span class="">{{ index + 1 }}</span>
        <span class="">{{ user.fio }}</span>
      </div>
    </div>
    <div v-else>Нет пользователей</div>
  </div>
</template>

<script>
import { getTime } from "@/func"
import useUsers from "@/hooks/useUsers"

export default {
  name: "UserPage",
  setup(props) {
    const { users, usersV, sectorsV } = useUsers()

    return { users, usersV, sectorsV }
  },
  methods: {
    myTime(date = "now", format = "d.m.y") {
      return getTime(date, format)
    }
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
.table {
  width: auto;
  font-size: 12px;
}
.table td,
.table th {
  padding: 0 7px;
  border: 1px solid var(--border_tbl_color);
}
</style>
