<template>
  <div class="menu flex item-center justify-around">
    <!-- <a
      href="javascript:void(0);"
      :class="{ active: itemPage === 'about' }"
      @click="setPage('about')"
    >
      <svg class="svg_icon">
        <use xlink:href="@/assets/sprite.svg#history_solid"></use>
      </svg>
    </a> -->
    <a
      href="javascript:void(0);"
      :class="{ active: itemPage === 'user' }"
      @click="setPage('user')"
    >
      <svg class="svg_icon">
        <use xlink:href="@/assets/sprite.svg#user"></use>
      </svg>
    </a>
    <a
      href="javascript:void(0);"
      :class="{ active: itemPage === 'inspections' }"
      @click="setPage('inspections')"
    >
      <svg class="svg_icon">
        <use xlink:href="@/assets/sprite.svg#check_list"></use>
      </svg>
    </a>
    <a
      href="javascript:void(0);"
      :class="{ active: itemPage === 'add' }"
      @click="setPage('add')"
    >
      <svg class="svg_icon">
        <use xlink:href="@/assets/sprite.svg#plus"></use>
      </svg>
    </a>
  </div>
</template>

<script>
export default {
  name: "MyMenu",
  props: {
    itemPage: {
      type: String
    }
  },
  methods: {
    setPage(item) {
      this.$emit("setPage", item)
    }
  }
}
</script>

<style scoped>
.menu {
  padding: 12px 0;
}
.menu a {
  display: block;
  width: 30px;
  height: 30px;
}
.menu a.active {
  color: #fff;
}
</style>
