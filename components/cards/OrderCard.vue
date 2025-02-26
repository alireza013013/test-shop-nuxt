<template>
  <v-card
    class="order-card"
  >
    <!--status-->
    <div class="d-flex align-center">
      <v-icon
        :large="$vuetify.breakpoint.mdAndUp"
        :color="status.color"
        class="outlined"
      >{{ status.icon }}</v-icon>

      <span
        class="mr-4 mr-md-10 text-body-2 black--text"
      >{{ status.text }}</span>
    </div>
    <div class="d-flex">
      <!--right-->
      <div
        class="flex-grow-1 pl-md-10"
      >
        <!--id-->
        <div class="mt-5">
          <span
            class="lightGray--text text-body-3"
          >کد سفارش:</span>

          <span
            class="black--text text-body-2 mr-3 mr-md-10"
          >{{order.id}}</span>
        </div>

        <!--image of products-->
        <div class="d-flex mt-2 mt-md-6">
          <template v-for="(item, i) in order.products">
            <v-img
              :key="`ord-prod-img-${i}`"
              :max-width="$vuetify.breakpoint.smAndDown?30:40"
              :max-height="$vuetify.breakpoint.smAndDown?30:40"
              :src="item.main_image"
              class="rounded mt-2 mt-md-3"
            ></v-img>

            <v-divider
              v-if="i+1 < order.products.length"
              vertical
              class="divider mx-2 mx-md-3 mt-2 mt-md-3"
            ></v-divider>
          </template>
        </div>
      </div>

      <!--left-->
      <div
        class="d-flex flex-column align-end"
      >
        <!--price and created at-->
        <div class="flex-grow-1">
          <!--price-->
          <div class="black--text d-flex align-center">
          <span
            class="text-body-1"
          >{{ $price(order.price) }}</span>
            <span
              class="text-body-4 mr-2"
            >تومان</span>
          </div>

          <!--created at-->
          <div class="lightGray--text text-body-3 mt-3 text-left">
            {{ $moment(new Date(order.created_at)).format('jDD jMMMM jYYYY') }}
          </div>
        </div>

        <v-btn
          large
          color="secondary"
          elevation="0"
          class="px-14 d-none d-md-flex"
        >مشاهده جزییات</v-btn>
        <v-btn
          text
          :ripple="false"
          min-width="0"
          class="px-0 no-bg d-md-none"
        >
          <v-icon>arrow_left</v-icon>
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "OrderCard",
  props: {
    order: Object
  },
  computed: {
    status(){
      return this.$getOrderStatusDetail(this.order.status)
    }
  }
}
</script>

<style scoped>

</style>
