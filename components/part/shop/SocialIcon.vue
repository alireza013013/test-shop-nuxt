<template>
  <v-btn
    icon
    min-width="32px"
    width="32px"
    height="32px"
    elevation="0"
    color="white"
    :href="link"
    target="_blank"
    :class="`${transparent?'':'brown'} px-0 social-btn no-bg`"
  >
    <v-img
      max-width="18px"
      max-height="18px"
      width="18px"
      height="18px"
      contain
      position="center center"
      :src="icon"
    ></v-img>
  </v-btn>
</template>

<script>
export default {
  name: "SocialIcon",
  props: {
    icon: {
      type: String,
    },
    link: {
      type: String,
    },
    transparent: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.social-btn{
  border-radius: 15px;
}
</style>
