<template>
  <v-app
    :style="`background: ${$vuetify.theme.themes.light.background}`"
  >
    <v-main>
      <Nuxt />
    </v-main>

    <!--footer-->
    <footer-part></footer-part>

    <snackbar></snackbar>
  </v-app>
</template>

<script>
import Snackbar from "~/components/part/general/Snackbar";
import FooterPart from "@/components/part/general/FooterPart";
export default {
  name: 'DefaultLayout',
  components: {FooterPart, Snackbar}
}
</script>

<style scoped>
.default-layout{
  background: #F6F5F6;
}
</style>
