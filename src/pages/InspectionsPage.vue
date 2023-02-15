<template>
  <div>
    <h1>Список показаний</h1>
    <div v-if="inspections.length" class="list">
      <div class="list__item" v-for="item in inspections" :key="item.id">
        <div class="list__addr">{{ item.address }}</div>
        <div class="list__date">{{ item.dateInspection }}</div>
        <!-- <img :src="item.srcPhoto" alt="" /> -->
      </div>
      <br />
      <br />

      <br />
      <MyBtn class="btn_danger" @click="clearInspectionsDB">Очистить</MyBtn>
    </div>
    <div v-else>Еще нет показаний</div>
    <input type="file" @change="showFile" />
    <img :src="newImg" alt="test image" />
    {{ newImg }}
  </div>
</template>

<script>
import useInspections from "@/hooks/useInspections"
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
    return {
      newImg: ""
    }
  },
  setup(props) {
    const { inspections } = useInspections()
    const { deleteInspections } = useInspections()
    return {
      inspections,
      deleteInspections
    }
  },
  methods: {
    async showFile(event) {
      console.log(event.target.files[0])
      // console.log(file.lastModified)
      let list = await getDB("listImg")
      list = list ?? []
      list.push({ id: list.length, img: event.target.files[0] })
      console.log(list)
      let res = await setDB("listImg", list)
      console.log(res)
      let myKeys = await keys()
      console.log(myKeys)
      this.newImg = event.target.files[0]
      this.compressImage("sdf")
    },
    compressImage(base64) {
      console.log("compressImage")
      // const canvas =
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
  border: 1px solid green;
  margin: 15px 0;
}
.list__item img {
  max-width: 60px;
  max-height: 60px;
}
</style>
