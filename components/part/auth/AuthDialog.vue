<template>
  <v-dialog
    eager
    v-model="dialog"
    width="400px"
    :fullscreen="$vuetify.breakpoint.xsOnly"
    overlay-color="overlay"
    overlay-opacity="0.4"
    :content-class="`${$vuetify.breakpoint.xsOnly?'rounded-0':'rounded-xl'} text-body-2`"
  >
    <v-card
      :tile="$vuetify.breakpoint.xsOnly"
    >
      <div
        class="pa-7"
      >
        <!--head-->
        <div
          class="d-flex align-center"
        >
          <div
            class="text-body-1 font-weight-medium"
          >{{ title }}</div>

          <v-spacer></v-spacer>

          <v-btn
            icon
            @click="dialog = false"
          >
            <v-icon>close</v-icon>
          </v-btn>
        </div>

        <slot></slot>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AuthDialog",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
  },
  data: () => ({
    dialog: false
  }),
  watch: {
    value(){
      if(this.value){
        this.dialog = true
      } else {
        this.dialog = false
      }
    },
    dialog(){
      if(this.dialog == false){
        this.$emit('input', false)
      }
    }
  }
}
</script>

<style scoped>

</style>
