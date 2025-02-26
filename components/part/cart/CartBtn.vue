<template>
  <v-badge
    color="transparent"
    offset-x="26"
    offset-y="18"
    left
    v-if="$store.state.cart.data"
  >
    <template v-slot:badge>
      <v-avatar
        v-show="$store.state.cart.data.basket.products.length > 0"
        color="secondary"
        size="18"
      >{{ $store.state.cart.data.basket.products.length }}</v-avatar>
    </template>

    <v-btn
      :color="panel?'white':'rgba(16, 15, 15, 0.55)'"
      elevation="0"
      class="px-0 no-bg"
      min-width="40"
      :dark="!panel"
      :to="{
        name: 'CartStep1',
        params: {
          shop: this.$route.params.shop
        }
      }"
    >
      <v-icon class="outlined">shopping_cart</v-icon>
    </v-btn>
  </v-badge>
</template>

<script>
export default {
  name: "CartBtn",
  props: {
    panel: {
      type: Boolean,
      default: false
    }
  },
}
</script>

<style scoped>

</style>
