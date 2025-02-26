<template>
  <v-app
    :style="`background: ${$vuetify.theme.themes.light.background}`"
  >
    <!--header-->
    <v-app-bar
      height="64x"
      color="white"
      class="panel-app-bar"
    >
      <nuxt-link
        class="d-flex align-center text-decoration-none black--text"
        :to="{
          name: 'ShopDetail',
          params: {
            slug: $store.state.shop.info.slug
          }
        }"
      >
        <shop-avatar
           v-if="$store.state.shop.info.logo != null && $store.state.shop.info.logo.url != null"
          :size="45"
        ></shop-avatar>

        <span
          class="text-body-1 mr-3 d-none d-sm-inline"
        >{{ $store.state.shop.info.name }}</span>
      </nuxt-link>

      <v-spacer></v-spacer>

      <!--usermenu-->
      <authentication
        panel
      ></authentication>

      <!--cart-->
      <cart-btn
        panel
      ></cart-btn>
    </v-app-bar>

    <v-main>
      <div class="main-wrap">
        <Nuxt/>
      </div>

      <!--footer-->
      <footer-part
        :class="`${cartClass}`"
      ></footer-part>
    </v-main>

    <snackbar></snackbar>
  </v-app>
</template>

<script>
import FooterPart from "@/components/part/general/FooterPart";
import Snackbar from "@/components/part/general/Snackbar";
import ShopAvatar from "@/components/part/shop/ShopAvatar";
import Authentication from "@/components/part/auth/Authentication";
import CartBtn from "@/components/part/cart/CartBtn";
export default {
  name: "panel",
  components: {CartBtn, Authentication, ShopAvatar, Snackbar, FooterPart},
  computed: {
    cartClass(){
      let str = ''

      if(
        this.$store.state.cart.data.basket.products.length > 0 &&
        [
          'CartStep1',
          'CartStep2',
          'CartStep3'
        ].includes(this.$route.name)
      ){
        str = 'mb-16 pb-15 mb-md-0 pb-md-7'
      }

      return str
    }
  }
}
</script>

<style scoped>
.main-wrap{
  min-height: calc(100vh - 140px);
}
.panel-app-bar{
  box-shadow: 0px 2px 4px rgba(149, 148, 148, 0.2) !important;
}

@media screen and (max-width: 1263.98px) {
  .main-wrap{
    min-height: calc(100vh - 124px);
  }
}
</style>
