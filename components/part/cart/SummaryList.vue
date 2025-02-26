<template>
  <div
    :class="`d-flex align-center text-body-2 ${color}--text`"
  >
    {{ title }}

    <v-spacer></v-spacer>

    {{ value }}
  </div>
</template>

<script>
export default {
  name: "SummaryList",
  props: {
    title: {
      type: String
    },
    value: {
      type: String
    },
    color: {
      type: String
    },
  }
}
</script>

<style scoped>

</style>
