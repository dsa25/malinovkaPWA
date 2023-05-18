<template>
  <header>
    <div class="row">
      <MyLogo>
        <template v-slot:versionApp>
          <span style="color: grey">v: </span> 1.0.4
        </template>
      </MyLogo>

      <PWAPrompt />
    </div>
  </header>

  <section v-if="checkMainData" class="content" ref="content">
    <div class="row pt-3 pb-5">
      <UserPage v-show="itemPage === 'user'" />
      <InspectionsPage v-show="itemPage === 'inspections'" />
      <AddPage v-show="itemPage === 'add'" @setPage="setPage" />
      <AboutPage v-show="itemPage === 'about'" />
    </div>
  </section>

  <section v-if="!checkMainData" class="app_spinner">
      <img
        src="@/assets/spinner.svg"
        alt="spinner"
        width="70"
        height="70"
        class="list__spinner"
      />
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
import PWAPrompt from "@/components/PWAPrompt.vue"
import useApp from "@/hooks/useApp"
import AddPage from "@/pages/AddPage.vue"
import InspectionsPage from "@/pages/InspectionsPage.vue"
import UserPage from "@/pages/UserPage.vue"
import AboutPage from "@/pages/AboutPage.vue"

export default {
  components: {
    PWAPrompt,
    MyLogo,
    MyMenu,
    AboutPage,
    AddPage,
    InspectionsPage,
    UserPage
  },
  data() {
    return {
      itemPage: "inspections"
    }
  },
  methods: {
    setPage(item) {
      this.itemPage = item
      this.$refs.content.scrollTo(0, 0)
    }
  },
  setup() {
    const { checkMainData } = useApp()
    return { checkMainData }
  }
}
</script>

<style scoped>
  .app_spinner{
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
  }
</style>
