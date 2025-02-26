<template>
  <div
    :class="`text-body-2 mb-2 pr-2 ${error?'error--text':'black--text'}`"
  ><slot></slot></div>
</template>

<script>
export default {
  name: "FieldLabel",
  props: {
    error: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
