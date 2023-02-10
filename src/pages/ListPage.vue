<template>
  <div>
    <h1>Список показаний</h1>
    <div v-if="inspections.length" class="list">
      <div class="list__item" v-for="item in inspections" :key="item.address">
        <div class="list__addr">{{ item.address }}</div>
        <div class="list__date">{{ item.dateInspection }}</div>
        <img :src="item.srcPhoto" alt="" />
      </div>
    </div>
    <div v-else>Еще нет показаний</div>
  </div>
</template>

<script>
import useInspections from "@/hooks/useInspections"
export default {
  name: "ListPage",
  data() {
    return {
      list: []
    }
  },
  setup(props) {
    const { inspections } = useInspections()
    return {
      inspections
    }
  }
  // mounted() {
  //   this.loadList()
  // },
  // methods: {
  //   async loadList() {
  //     try {
  //       // let list = localStorage.getItem("list")
  //       // this.list = list != null ? JSON.parse(list) : this.list
  //       let list = await getDB("list")
  //       list = list ? list : []
  //       this.list = list
  //       console.log(this.list)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  // }
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
