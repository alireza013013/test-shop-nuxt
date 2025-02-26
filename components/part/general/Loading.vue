<template>
  <v-overlay
    opacity="0.7"
    v-show="loading || $store.state.loading.onLoad"
    z-index="300"
  >
    <v-card
      color="rgba(255,255,255,0.95)"
      class="loading-card"
      light
    >
      <loading-progress></loading-progress>
    </v-card>
  </v-overlay>
</template>

<script>
import LoadingProgress from "~/components/part/general/LoadingProgress";
export default {
  components: {LoadingProgress},
  data: () => ({
    loading: false
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.loading-card{
  border-radius: 50% !important;
  position: fixed;
  top: 50%;
  left: 50%;
  margin: -30px 0 0 -30px;
  padding: 5px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1) !important;
}
</style>
