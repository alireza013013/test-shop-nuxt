<template>
  <v-row
    no-gutters
    justify="center"
  >
    <v-col cols="11">
      <slot></slot>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Container"
}
</script>

<style scoped>

</style>
