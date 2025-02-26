<template>
  <v-avatar
    :size="size=='normal'?44:70"
    color="#fff"
    class="user-avatar"
  >
    <v-avatar
      :size="size=='normal'?40:62"
      color="avatar"
    >
      <v-img
        :max-height="size=='normal'?28:44"
        contain
        src="img/avatar-default.svg"
      ></v-img>
    </v-avatar>
  </v-avatar>
</template>

<script>
export default {
  name: "UserAvatar",
  props: {
    size: {
      type: String,
      default: 'normal'
    }
  }
}
</script>

<style scoped>
.user-avatar{
  border: 1px solid #D6D6D6 !important;
}
</style>
