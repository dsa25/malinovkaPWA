<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "MyBtn"
}
</script>

<style scoped>
.btn {
  @apply inline-block text-white py-0 px-4 rounded whitespace-nowrap;
  height: var(--height_input);
  line-height: var(--height_input);
  text-align: center;
}
.btn_min {
  height: 25px;
  padding: 0 12px;
  line-height: 25px;
}
.btn.block {
  display: block;
}
.btn_success {
  @apply bg-green-500 hover:bg-green-400;
}
.btn_danger {
  @apply bg-red-500 hover:bg-red-400;
}
.btn_close {
  background: transparent;
  color: red;
}
.btn_svg {
  width: 32px;
  min-width: 32px;
  height: 32px;
  padding: 1px 6px;
  line-height: 28px;
}
</style>
