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
  color: var(--color_logo);
}
.logo:hover {
  color: var(--color_logo);
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
  color: var(--border_tbl_color);
  padding-left: 3px;
  font-size: 10px;
}
</style>
