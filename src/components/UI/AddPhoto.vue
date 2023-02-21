<template>
  <div class="text-right">
    <input
      type="file"
      class="hidden"
      id="add_photo"
      :value="modelValue"
      @change="changeInput"
      accept="image/*"
      capture="camera"
    />
    <label for="add_photo" class="add_photo inline-flex items-center">
      <slot></slot>
      <svg class="svg_icon">
        <use xlink:href="@/assets/sprite.svg#plus"></use>
      </svg>
    </label>
    <!-- <input type="file" accept="image/*" capture="camera" />
    <input type="file" accept="image/*" />
    <input type="file" /> -->
  </div>
</template>

<script>
export default {
  name: "AddPhoto",
  props: {
    modelValue: String
  },

  methods: {
    changeInput(event) {
      this.$emit("change:file", event)
    }
  }
}
</script>

<style scoped>
.add_photo {
  cursor: pointer;
}
.add_photo .svg_icon {
  @apply bg-green-500;
  color: #fff;
  padding: 7px 5px;
  width: 42px;
  min-width: 42px;
  height: 28px;
  border-radius: 3px;
}
.add_photo:hover .svg_icon {
  /* @apply bg-green-400; */
}
</style>
