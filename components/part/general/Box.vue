<template>
  <v-card
    class="box pa-4"
  >
    <slot></slot>
  </v-card>
</template>

<script>
export default {
  name: "Box"
}
</script>

<style scoped>
.box{
  box-shadow: 0px 2px 4px rgba(149, 148, 148, 0.2) !important;
}

@media screen and (max-width: 600px){
  .box{
    border-radius: 5px !important;
  }
}
</style>
