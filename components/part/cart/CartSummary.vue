<template>
  <div>
    <!--products sum-->
    <summary-list :title="`قیمت محصولات (${$store.state.cart.data.basket.products.length})`"
      :value="`${$price(productsSum)} تومان`" color="lightGray"></summary-list>

    <!--discount-->
    <!--  <summary-list
          title="تخفیف"
          :value="`${$price(discount)} تومان`"
          color="black"
          class="mt-4"
        ></summary-list>-->

    <!--shipping price-->
    <summary-list :value="`${$price(shippingPrice)} تومان`" class="mt-4" color="black"
      title="هزینه ارسال"></summary-list>

    <v-divider class="divider mt-4"></v-divider>

    <!--total-->
    <summary-list :value="`${$price(total)} تومان`" class="mt-4 font-weight-medium" color="black"
      title="جمع کل"></summary-list>

    <!--buttons (md and up)-->
    <div class="d-none d-md-block">
      <!--next if user logged in-->
      <v-btn v-if="$store.state.user.data" :to="nextLink" class="mt-md-12" color="primary" elevation="0" large block
        @click="submit">{{ nextTitle }}
      </v-btn>

      <!--next if user not logged in-->
      <authentication v-if="!$store.state.user.data" cart></authentication>

      <!--prev-->
      <v-btn :to="prevLink" block class="mt-md-3" color="primary" elevation="0" exact large outlined>{{ prevTitle }}
      </v-btn>
    </div>

    <!--buttons (sm and down)-->
    <v-app-bar bottom class="bottom-bar d-md-none" color="white" fixed height="100px">
      <v-btn v-if="$store.state.user.data" :to="nextLink" class="flex-grow-1" color="primary" elevation="0" large
        @click="submit">{{ nextTitle }}</v-btn>

      <!--next if user not logged in-->
      <authentication v-if="!$store.state.user.data" cart></authentication>


      <!--prev-->
      <v-btn :to="prevLink" class="mr-4 flex-grow-1" color="primary" elevation="0" exact large outlined>{{ prevTitle }}
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import SummaryList from "@/components/part/cart/SummaryList";
import Box from "@/components/part/general/Box";
import Authentication from "../auth/Authentication";

export default {
  name: "CartSummary",
  props: {
    nextLink: {
      type: [Object, String]
    },
    nextTitle: {
      type: String,
      default: 'ادامه ثبت سفارش'
    },
    prevLink: {
      type: [Object, String]
    },
    prevTitle: {
      type: String,
      default: 'بازگشت'
    }
  },
  components: {Authentication, Box, SummaryList},
  computed: {
    productsSum() {
      let sum = 0

      this.$store.state.cart.data.basket.products.forEach((item) => {
        sum += (item.attribute.price * item.quantity)
      })

      return sum
    },
    shippingPrice() {
      let shipping_price = 0

      shipping_price = this.$store.state.cart.data.shipping_price

      return shipping_price
    },
    total() {
      let total = this.productsSum

      total = this.productsSum + this.shippingPrice

      return total
    },
    /*discount() {
      let discount = 0

      if (this.$store.state.cart.data.basket.products.length > 0) {
        discount+=1
      }

      return discount
    },*/
  },
  methods: {
    submit() {
      this.$emit('submited', true)
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  box-shadow: 2px 0px 4px rgba(149, 148, 148, 0.6) !important;
}
</style>
