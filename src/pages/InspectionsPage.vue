<template>
  <div>
    <table class="table mb-7">
      <tr>
        <th>Список показаний:</th>
        <td>{{ getCount() }}</td>
        <td>{{ inspections.length }}</td>
      </tr>
    </table>

    <div v-if="inspections.length" class="list">
      <div
        class="list__item flex items-center"
        v-for="item in inspections"
        :key="item.id"
      >
        <div>
          <div>
            <span class="list__date">{{ myTime(item.dateInspection) }} </span>  -
            <span class="list__numb">{{item.persNum}}</span>
          </div>
          <div class="list__addr">{{ item.address }}</div>
          <img
            v-for="(src, index) in item.srcPhoto"
            :src="src"
            alt="jpg"
            :key="index"
          />
          <span class="list__user">{{item.user}}</span>
        </div>
        <div class="ml-auto">
          <img
            v-if="item?.send == 1 && item.status == 0"
            src="@/assets/spinner.svg"
            alt="spinner"
            width="30"
            height="30"
            class="list__spinner"
          />
          <MyBtn
            v-else-if="item.status == 0 && item?.send == undefined"
            @click="send(item)"
            class="btn_svg btn_success"
          >
            <svg class="svg_icon">
              <use xlink:href="@/assets/sprite.svg#cloud"></use>
            </svg>
          </MyBtn>
          <div v-else class="list__check">
            <svg class="svg_icon">
              <use xlink:href="@/assets/sprite.svg#check2"></use>
            </svg>
          </div>
        </div>
      </div>
      <br />
      <br />

      <br />
      <!-- <MyBtn class="btn_danger" @click="clearInspectionsDB">Очистить</MyBtn> -->
    </div>
    <div v-else>Еще нет показаний</div>
  </div>
</template>

<script>
import useInspections from "@/hooks/useInspections"
import { getTime } from "@/func"
import {
  get as getDB,
  set as setDB,
  del as delKeyDB,
  clear as clearDB,
  keys
} from "idb-keyval"
export default {
  name: "InspectionsPage",
  data() {
    return {}
  },
  setup(props) {
    const { inspections, deleteInspections, sendInspection } = useInspections()
    return {
      inspections,
      sendInspection,
      deleteInspections
    }
  },
  methods: {
    myTime(date = "now", format = "d.m.y") {
      return getTime(date, format)
    },
    getCount() {
      return this.inspections.filter((item) => item.status == 1).length
    },
    async send(item) {
      try {
        console.log({ item })
        item.send = 1
        await this.sendInspection(item)
      } catch (e) {
        console.log(e)
      }
    },
    async clearInspectionsDB() {
      try {
        // let list = localStorage.getItem("list")
        // this.list = list != null ? JSON.parse(list) : this.list
        // let list = await getDB("list")
        // list = list ? list : []
        // this.list = list
        // console.log(this.list)
        let modalRes = confirm("Вы точно хотите удалить все показания?")
        if (modalRes) {
          // funcOk.func()
          console.log("funcOk")
          await this.deleteInspections()
        }
        // else {
        //   // funcNo.func()
        //   console.log("funcNo")
        // }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
.list__item {
  border: 1px solid var(--border_tbl_color);
  margin: 15px 0;
  padding: 5px;
  border-radius: 3px;
}
.list__item img {
  display: inline-block;
  max-width: 40px;
  max-height: 40px;
  margin: 1px 5px 1px 1px;
}
.list__check {
  width: 35px;
  height: 35px;
  color: var(--border_tbl_color);
}
.list__spinner {
  width: 40px;
  height: 40px;
}
.list__date{
  color: #cfa635;
  font-size: 12px;
}
.list__numb{
  color: #767676;
  font-weight: 800;
  font-size: 12px;
}
.list__user{
  font-size: 13px;
}
.list__addr{
  color: #9ca3af;
  font-size: 13px;
  padding-right: 10px;
}
</style>
