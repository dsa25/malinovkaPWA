<template>
  <header>
    <div class="row">
      <MyLogo />
    </div>
  </header>

  <section class="content">
    <div class="row pt-3 pb-5">
      <UserPage v-show="itemPage === 'user'" />
      <ListPage v-show="itemPage === 'list'" />
      <AddPage v-show="itemPage === 'add'" @setPage="setPage" />
      <AboutPage v-show="itemPage === 'about'" />
    </div>
  </section>

  <footer>
    <div class="row">
      <MyMenu :itemPage="itemPage" @setPage="setPage" />
    </div>
  </footer>
</template>

<script>
import MyLogo from "@/components/MyLogo.vue"
import MyMenu from "@/components/MyMenu.vue"
import AddPage from "@/pages/AddPage.vue"
import ListPage from "@/pages/ListPage.vue"
import UserPage from "@/pages/UserPage.vue"
import AboutPage from "@/pages/AboutPage.vue"

export default {
  components: { MyLogo, MyMenu, AboutPage, AddPage, ListPage, UserPage },
  data() {
    return {
      itemPage: "list"
    }
  },
  methods: {
    setPage(item) {
      this.itemPage = item
    }
  }
}
</script>

<style scoped></style>
