<template>
  <MyBtn
    v-if="shown"
    class="ml-auto btn btn_install btn_success"
    @click="installPWA"
  >
    <svg class="svg_icon">
      <use xlink:href="@/assets/sprite.svg#install_app"></use>
    </svg>
    <span>Установить</span>
  </MyBtn>
</template>

<script>
export default {
  name: "PWAPrompt",
  data: () => ({
    installEvent: undefined,
    shown: false
  }),

  beforeMount() {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault()
      this.installEvent = e
      this.shown = true
    })
  },

  methods: {
    installPWA() {
      try {
        this.installEvent.prompt()
        this.installEvent.userChoice.then((choice) => {
          this.dismissPrompt() // Hide the banner once the user's clicked
          if (choice.outcome === "accepted") {
            // Do something additional if the user chose to install
            console.log(" to install ")
          } else {
            // Do something additional if the user declined
            console.log(" to user declined..... ")
          }
        })
      } catch (e) {
        alert(e)
      }
    },

    dismissPrompt() {
      this.shown = false
    }
  }
}
</script>
