<template>
  <div v-if="order">
    <v-dialog
      v-model="dialog"
      :class="`${$vuetify.breakpoint.xsOnly?'':'rounded-xl'}`"
      :content-class="`${$vuetify.breakpoint.xsOnly?'':'rounded-xl'} order-detail-dialog`"
      :fullscreen="$vuetify.breakpoint.xsOnly"
      :width="$vuetify.breakpoint.smAndDown?'100%':'750px'"
      scrollable
      style="border-radius: 15px !important;"
    >
      <v-card
        :class="`pa-5`"
        :tile="$vuetify.breakpoint.smAndDown"
      >
        <v-card-title
          class="head px-md-0"
        >
          <span
            class="text-body-1 font-weight-medium black--text"
          >جزئیات سفارش</span>
          <v-spacer></v-spacer>
          <v-icon
            @click="dialog = false"
          >close
          </v-icon>
        </v-card-title>
        <v-card-text
          class="px-md-0 py-md-0 py-4"
          style="height: 100%"
        >
          <div
            class="pa-3 pa-sm-0"
          >
            <v-row no-gutters>
              <!--steps-->
              <v-col
                class="py-4"
                cols="12"
                order="1"
                order-md="0"
              >
                <order-stepper
                  :current-step="order.status"
                ></order-stepper>
              </v-col>

              <!--order info-->
              <v-col
                class="pl-md-2"
                cols="12"
                md="6"
                order="0"
                order-md="1"
              >
                <v-card
                  class="order-col-container pa-md-4"
                >
                  <!--id-->
                  <order-list
                    :value="order.id"
                    class="mb-7"
                    title="کد پیگیری:"
                  ></order-list>

                  <!--created at-->
                  <order-list
                    :value="$moment(order.created_at).format('jDD jMMMM jYYYY')"
                    title="تاریخ ثبت:"
                  ></order-list>

                  <v-divider class="divider my-4"></v-divider>

                  <!--address-->
                  <order-list
                    :value="`${address.address} - کد پستی: ${address.postalCode}`"
                    title="آدرس:"
                  ></order-list>

                  <v-divider class="divider my-4"></v-divider>

                  <!--price-->
                  <order-list
                    :value="`${$price(order.price)} تومان`"
                    title="مبلغ کل سفارش:"
                  ></order-list>

                  <v-divider class="divider my-4"></v-divider>

                  <!--price-->
                  <order-list
                    :value="status.text"
                    title="آخرین وضعیت:"
                  >
                    <v-icon
                      :color="status.color"
                      class="outlined mt-6 d-none d-md-inline-block"
                      x-large
                    >{{ status.icon }}
                    </v-icon>
                  </order-list>
                </v-card>
              </v-col>

              <!--cart info-->
              <v-col
                class="pr-md-2"
                cols="12"
                md="6"
                order="1"
                order-md="2"
              >
                <v-card
                  class="order-col-container pa-md-4"
                >
                  <div
                    class="text-body-2 black--text mb-6 font-weight-medium"
                  >جزئیات سبد خرید:
                  </div>

                  <!--product sum-->
                  <order-list
                    :title="`قیمت کالاها (${order.products.length}):`"
                    :value="`${$price(productsSum)} تومان`"
                    class="mb-2"
                  ></order-list>

                  <!--discount-->
                  <!--<order-list
                    :title="`تخفیف:`"
                    :value="`${$price(discount)} تومان`"
                    class="mb-2"
                  ></order-list>-->

                  <!--shipping price-->
                  <order-list
                    :title="`هزینه ارسال:`"
                    :value="`${$price(order.sending_price)} تومان`"
                    class="mb-2"
                  ></order-list>

                  <!--total-->
                  <order-list
                    :title="`جمع سبد خرید:`"
                    :value="`${$price(order.price)} تومان`"
                  ></order-list>

                  <v-divider
                    class="my-4"
                  ></v-divider>

                  <!--products-->
                  <template
                    v-for="(item, i) in order.products"
                  >
                    <v-card
                      :key="`order-prod-${i}`"
                      class="d-flex"
                      flat
                    >
                      <v-img
                        :src="item.main_image"
                        class="rounded-lg"
                        contain
                        max-width="60px"
                      ></v-img>

                      <div
                        class="mr-4 text-body-3 flex-grow-1"
                      >
                        <div>{{ item.name }}</div>

                        <div
                          class="d-flex my-1"
                        >
                          <span
                              v-if="item.attribute_name != 'default'"
                          >{{ item.attribute_name }}: {{ item.attribute_value }}</span>

                          <v-spacer></v-spacer>

                          <span>تعداد: {{ item.quantity }}</span>
                        </div>

                        <div>قیمت واحد: {{ $price(item.price) }} تومان</div>
                      </div>
                    </v-card>

                    <v-divider
                      v-if="i+1 < order.products.length"
                      :key="`order-prod-div-${i}`"
                      class="divider my-2"
                    ></v-divider>
                  </template>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import OrderStepper from "@/components/part/order/OrderStepper";
import OrderList from "@/components/part/order/OrderList";

export default {
  name: "OrderInfo",
  components: {OrderList, OrderStepper},
  props: {
    open: {
      type: [String, Number],
      default: 0
    },
    openInInitial: {
      type: Boolean,
      default: false
    },
    order: {
      type: [Object, Boolean]
    }
  },
  data: () => ({
    dialog: false,
  }),
  computed: {
    status() {
      return this.$getOrderStatusDetail(this.order.status)
    },
    productsSum() {
      let sum = 0

      this.order.products.forEach((item) => {
        sum += item.price
      })

      return sum
    },
    discount() {
      let discount = 0

      this.order.products.forEach((item) => {
        discount += item.discount
      })

      return discount
    },
    address() {
      let address = this.order.address.split('^')

      return {
        address: address[0],
        postalCode: address[1] ? address[1] : false
      }
    }
  },
  created() {
    if (this.openInInitial) {
      this.dialog = true
    }
  },
  watch: {
    '$route.query.order': {
      handler() {
        if (!this.$route.query.order || this.$route.query.order == 'false') {
          this.dialog = false
        } else {
          this.dialog = true
        }
      }
    },
    open() {
      this.dialog = true
    },
    dialog() {
      if (!this.dialog) {
        let queries = this.$queries()

        delete queries.order

        this.$router.push({
          name: 'MyOrders',
          params: {
            slug: this.$route.params.shop
          },
          query: queries
        })
      }
    }
  }
}
</script>

<style scoped>
.order-col-container {
  border: 1px solid rgba(149, 148, 148, 0.2) !important;
  border-radius: 7px !important;
}

@media screen and (max-width: 599.98px) {
  .order-detail-dialog .head {
    z-index: 1;
    padding-top: 20px !important;
    padding-bottom: 20px !important;
    box-shadow: 0px 6px 6px -6px rgba(149, 148, 148, 0.5) !important;
  }
}

@media screen and (max-width: 959.98px) {
  .order-col-container {
    border: none !important;
    border-radius: 0px !important;
  }
}
</style>
