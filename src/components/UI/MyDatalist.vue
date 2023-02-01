<template>
  <MyInput
    :type="'search'"
    placeholder="Search"
    :id="`${id}`"
    :list="`${list}`"
  />

  <datalist :id="`${list}`">
    <option v-for="option in options" :value="option" />
  </datalist>
</template>

<script>
export default {
  name: "MyDatalist",
  props: {
    modelValue: {
      type: String
    },
    options: {
      type: Array,
      default: () => []
    },
    id: {
      type: String,
      default: "datalistFor01"
    },
    list: {
      type: String,
      default: "datalist01"
    }
  },
  methods: {
    changeOption(event) {
      this.$emit("update:modelValue", event.target.value)
    }
  }
}
</script>

<style scoped>
.wrap_input {
  position: relative;
  /* border: 1px solid; */
}
.wrap_input input {
}
</style>
