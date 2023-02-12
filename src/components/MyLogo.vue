<template>
  <a href="javascript:void(0);" class="logo">
    <img src="@/assets/logo.png" alt="logo" />
    <span class="logo__text">Малиновка</span>
    <span class="logo__version">
      <slot name="versionApp"></slot>
    </span>
  </a>
</template>

<script>
export default {
  name: "MyLogo"
}
</script>

<style scoped>
.logo {
  display: inline-flex;
  align-items: center;
  color: #ff4081;
}
.logo:hover {
  color: #ff4081;
}
.logo img {
  width: 32px;
  height: auto;
  display: block;
  margin-right: 5px;
}
.logo__text {
  line-height: 1;
  padding-top: 1px;
}
.logo__version {
  color: #4caf50;
  padding-left: 3px;
  font-size: 10px;
}
</style>
