<template>
  <div
    class="shop-avatar"
    :style="`width: ${normalizedSize}px; height: ${normalizedSize}px`"
  >
    <div
      class="avatar-container d-flex justify-center align-center"
      :style="`width: ${normalizedSize-6}px; height: ${normalizedSize-6}px`"
    >
      <v-avatar
        :size="normalizedSize-12"
      >
        <v-img
          :src="$store.state.shop.info.logo.url"
        ></v-img>
      </v-avatar>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShopAvatar",
  props: {
    size: {
      type: [Number, String],
      default: 100
    }
  },
  computed: {
    normalizedSize(){
      let size = parseInt(this.size)

      if(size < 35){
        size = 35
      }

      return size
    },
  }
}
</script>

<style scoped>
.shop-avatar{
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  padding: 3px 3px 0 0;
  background: linear-gradient(215.72deg, #BE00B0 15.98%, #FCD925 83.8%);
  border-radius: 50%;
}
.shop-avatar .avatar-container{
  background: #fff;
  border-radius: 50%;
}
.shop-avatar .avatar-container .v-avatar{
  border: 2px solid rgba(228, 221, 221, 0.5);
}
</style>
