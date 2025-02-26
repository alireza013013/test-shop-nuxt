<template>
  <v-snackbar
    style="position: fixed;"
    bottom outlined text
    elevation="0"
    v-model="snackbarCtrl"
    :timeout="$store.state.snackbar[dataKey].time"
    width="auto"
    min-width="0"
    min-height="0"
    :color="$store.state.snackbar[dataKey].color"
    :class="`ma-0`"
    content-class="text-center col-12 text-body-2 pa-0"
  >
    <div class="snackbar-content px-2 d-flex align-center">
      <v-avatar
        size="36"
        class="rounded-lg ml-2"
        :color="$store.state.snackbar[dataKey].color"
      >
        <v-avatar
          size="24"
          :color="'white'"
          class="rounded-circle"
        >
          <v-icon
            size="18"
            :color="$store.state.snackbar[dataKey].color"
            class="font-weight-bold"
          >{{ $store.state.snackbar[dataKey].color=='success'?'check':'priority_high'}}</v-icon>
        </v-avatar>
      </v-avatar>
      <span class="defaultTxt--text font-weight-bold">
        {{ $store.state.snackbar[dataKey].message }}
      </span>
      <v-spacer></v-spacer>
      <v-icon
        size="18"
        color="defaultTxt"
        class="font-weight-bold"
        @click="snackbarCtrl = false"
      >close</v-icon>
    </div>
  </v-snackbar>
</template>

<script>
export default {
  name: "Snackbar",
  props: {
    dataKey: {
      type: String,
      default: 'data'
    }
  },
  data: () => ({
    snackbarCtrl: false,
  }),
  computed: {
    snackbarShow(){
      return this.$store.state.snackbar[this.dataKey].show
    }
  },
  created() {
    //show snackbar if dataKey == 'nextRoutePayload'
    if(
        this.dataKey == 'nextRoutePayload' &&
        this.$store.state.snackbar[this.dataKey].show
    ){
      this.snackbarCtrl = true

      setTimeout(()=>{
        //hide snackbar
        this.$store.commit('snackbar/setPayload', {
          message: '',
          color: 'success',
          time: 5000,
          show: 0
        })
      }, this.$store.state.snackbar[this.dataKey].time)
    }
  },
  watch: {
    snackbarShow: {
      handler(){
        this.snackbarCtrl = false

        setTimeout(()=>{
          if(this.$store.state.snackbar[this.dataKey].show){
            this.snackbarCtrl = true
          }
        }, 100)
      }
    }
  }
}
</script>

<style>
.v-sheet.v-snack__wrapper{
  border-radius: 12px !important;
}
.snackbar-content{
  padding-top: 6px;
  padding-bottom: 6px;
}
</style>
