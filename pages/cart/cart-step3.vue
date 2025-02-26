<template>
  <container>
    <!--stepper-->
    <cart-stepper
        :current-step="3"
    ></cart-stepper>

    <v-row
        class="mt-4 mt-md-10 mb-4"
        no-gutters
    >
      <v-col cols="12">
        <box>
          <v-card
              class="mx-auto text-center"
              width="320px"
          >
            <v-avatar
                :color="`${payment.error?'error':'success'} lighten-5`"
                size="72"
            >
              <v-icon
                  :color="`${payment.error?'error':'success'}`"
                  large
              >{{ payment.error ? 'error_outline' : 'task_alt' }}
              </v-icon>
            </v-avatar>

            <div
                :class="`text-body-1 ${payment.error?'error':'success'}--text mt-7`"
            >{{ payment.message }}
            </div>

            <div
                class="text-body-3 lightGray--text mt-6 mb-4"
            >
              <template v-if="payment.error">
                پرداخت ناموفق بود. در صورت کسر وجه از موجودی مبلغ تا 72 ساعت آینده به حساب شما بازگردانده خواهد شد.
              </template>
              <template v-else>
                سفارش با موفقیت ثبت شد. جهت پیگیری سفارش خود می توانید به صفحه سفارش های من مراجعه نمایید.
              </template>
            </div>

            <v-btn
                v-if="!payment.error"
                :to="{
                name: 'MyOrders',
                params: {
                  shop: $route.params.shop
                }
              }" class="ml-2"
                color="gray"
                dark
                elevation="0"
                large
            >سفارش های من
            </v-btn>

            <v-btn
                :outlined="!payment.error" :to="{
                name: 'ShopDetail',
                params: {
                  shop: $route.params.shop
                }
              }" color="gray"
                dark
                elevation="0"
                exact
                large
            >بازگشت به فروشگاه
            </v-btn>
          </v-card>
        </box>
      </v-col>
    </v-row>
  </container>
</template>

<script>
import Container from "@/components/part/general/Container";
import Box from "@/components/part/general/Box";
import CartStepper from "@/components/part/cart/CartStepper";

export default {
  components: {CartStepper, Box, Container},
  async asyncData({route, redirect, app}) {
    //check page requirements
    if (
        !route.query.Authority ||
        !route.query.Status
    ) {
      redirect({
        name: 'CartStep1',
        params: {
          shop: route.params.shop
        }
      })
    }

    let Authority = route.query.Authority
    let Status = route.query.Status
    let payment

    await app.$api({
      method: 'get',
      url: `shops/payment/callback?Status=${Status}&Authority=${Authority}`,
      data: null,
      loading: false,
      preventShowError: [404, 422]
    }).then((r) => {
      app.$generateNewUuid()

      payment = {
        "error": r.data.error,
        "message": r.data.message,
        "data": r.data.data
      }
    }).catch((e) => {
      if (e.response) {
        payment = {
          "error": e.response.data.error,
          "message": e.response.data.message,
          "data": e.response.data.data
        }
      }
    })


    return {payment}
  },
  layout: 'panel',
  head() {
    return {
      title: this.payment.error ? 'پرداخت ناموفق' : 'پرداخت موفق'
    }
  },
  name: "CartStep3",
}
</script>

<style scoped>

</style>
