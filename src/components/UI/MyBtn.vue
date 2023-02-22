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

<style>
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
  color: #fff;
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
button:disabled:hover,
button:disabled {
  background: gray;
  opacity: 0.5;
}
.btn_install {
  display: inline-block;
  border-radius: 3px;
  padding: 1px 8px 1px 4px;
  height: 24px;
  width: auto;
  line-height: 1;
  font-size: 12px;
  text-align: left;
  cursor: pointer;
}
.btn_install svg {
  height: 18px;
  width: 18px;
  margin-top: -1px;
  margin-right: 3px;
}
</style>
