<template>
  <div>
    <container>
      <!--not empty-->
      <template
          v-if="$store.state.cart.data.basket.products.length > 0"
      >
        <!--stepper-->
        <cart-stepper
            :current-step="1"
        ></cart-stepper>

        <!--cart detail-->
        <v-row
            class="mt-4 mt-md-10 mb-4"
            no-gutters
        >
          <!--right-->
          <v-col
              class="pl-md-2 pb-4 pb-md-0"
              cols="12"
              md="9"
          >
            <!--items (sm and up)-->
            <box
                class="d-none d-sm-block"
            >
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                  <tr>
                    <th class="text-center">محصول</th>
                    <!--<th>تخفیف</th>-->
                    <th>قیمت نهایی</th>
                    <th class="text-center">تعداد</th>
                    <th>جمع</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr
                      v-for="(item, i) in $store.state.cart.data.basket.products"
                      :key="`cart-row-md-${i}`"
                  >
                    <!--name-->
                    <td>
                      <div
                          class="d-flex align-center"
                      >
                        <v-img
                            :src="item.main_image.url"
                            class="my-2 rounded-xl"
                            contain
                            max-height="100px"
                            max-width="100px"
                        ></v-img>

                        <div
                            class="mr-5 text-body-2"
                        >
                          <div
                              class="black--text font-weight-medium"
                          >{{ item.name }}
                          </div>
                          <div
                              v-if="item.attribute.name != 'default'"
                              class="lightGray--text mt-2"
                          >
                            {{ item.attribute.name }}:
                            {{ item.attribute.value }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <!--discount-->
                    <!--<td
                      class="primary&#45;&#45;text font-weight-medium"
                    >
                      {{ $price(450000) }}
                      تومان
                    </td>-->
                    <!--price-->
                    <td class="font-weight-medium">
                      {{ $price(item.attribute.price) }}
                      تومان
                    </td>
                    <!--quantity-->
                    <td>
                      <cart-quantity
                          :attribute="item.attribute.id"
                          :initial-quantity="item.quantity"
                          :product="item.id"
                      ></cart-quantity>
                    </td>
                    <!--total-->
                    <td class="font-weight-medium">
                      {{ $price(item.attribute.price * item.quantity) }}
                      تومان
                    </td>
                  </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </box>

            <!--items (xs)-->
            <div
                class="d-sm-none"
            >
              <cart-card
                  v-for="(item, i) in $store.state.cart.data.basket.products"
                  :key="`cart-row-md-${i}`"
                  :class="`${i+1<$store.state.cart.data.basket.products.length?'mb-4':''}`"
                  :item="item"
              ></cart-card>
            </div>
          </v-col>

          <!--left-->
          <v-col
              class="pr-md-2"
              cols="12"
              md="3"
          >
            <box>
              <cart-summary
                  :prev-link="{
                    name: 'ShopDetail',
                    params: {
                      shop: $route.params.shop
                    }
                  }"
                  next-title="ادامه ثبت سفارش"
                  prev-title="بازگشت به فروشگاه"
                  @submited="submit"
              ></cart-summary>
            </box>
          </v-col>
        </v-row>
      </template>

      <!--empty-->
      <template
          v-else
      >
        <v-row
            class="mt-4 mb-4"
            no-gutters
        >
          <v-col cols="12">
            <box>
              <v-card
                  class="mx-auto text-center"
                  width="320px"
              >
                <div
                    class="text-body-1 black--text mb-7"
                >سبد خرید شما خالی است.
                </div>

                <v-avatar
                    color="background"
                    size="72"
                >
                  <v-img
                      class="rounded-0"
                      contain
                      max-height="40px"
                      max-width="40px"
                      src="img/icons/cart.svg"
                  ></v-img>
                </v-avatar>

                <div
                    class="text-body-3 lightGray--text mt-6 mb-4"
                >با بازدید از فروشگاه محصولات مورد علاقه خود را بیابید و به سبد خرید خود اضافه کنید.
                </div>

                <v-btn
                    :to="{
                  name: 'ShopDetail',
                  params: {
                    shop: $route.params.shop
                  }
                }" color="gray"
                    dark
                    elevation="0"
                    large
                >بازگشت به فروشگاه
                </v-btn>
              </v-card>
            </box>
          </v-col>
        </v-row>
      </template>
    </container>

    <!--snackbar-->
    <snackbar
        data-key="nextRoutePayload"
    ></snackbar>
  </div>
</template>

<script>
import Box from "@/components/part/general/Box";
import Container from "@/components/part/general/Container";
import CartStepper from "@/components/part/cart/CartStepper";
import CartQuantity from "@/components/part/cart/CartQuantity";
import CartSummary from "@/components/part/cart/CartSummary";
import CartCard from "@/components/cards/CartCard";
import Snackbar from "../../components/part/general/Snackbar";

export default {
  asyncData({route, app, store}) {
    let snackBar = store.state.snackbar.nextRoutePayload

    return { snackBar }
  },
  components: {Snackbar, CartCard, CartSummary, CartQuantity, CartStepper, Container, Box},
  layout: 'panel',
  head() {
    return {
      title: 'سبد خرید'
    }
  },
  name: "CartStep1",
  methods: {
    submit() {
      
      this.$router.push({
        name: 'CartStep2',
        params: {
          shop: this.$route.params.shop
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
