<template>
  <container>
    <template
        v-if="allDataRceived"
    >
      <!--head-->
      <profile-tabs></profile-tabs>

      <!--orders-->
      <box class="mt-6 mb-4">
        <!--has order-->
        <template
            v-if="orders && orders.length > 0"
        >
          <div
              v-for="(item, i) in orders"
              :key="`order-${i}`"
          >
            <v-card
                :ripple="false"
                class="no-bg"
                height="100%"
                @click="orderDetail(item.id)"
            >
              <order-card
                  :order="item"
              ></order-card>
            </v-card>

            <v-divider
                v-show="i+1 < orders.length"
                class="divider mt-6 mb-4"
            ></v-divider>
          </div>

          <!--pagination-->
          <v-pagination
              v-if="orders.length>0 && total>perPage"
              v-model="page"
              :length="(total%perPage===0)?Math.floor(total/perPage):Math.floor(total/perPage)+1"
              circle
              class="mt-4"
          ></v-pagination>
        </template>

        <!--empty-->
        <template v-else-if="orders && orders.length==0">
          <v-row
              class="my-4"
              no-gutters
          >
            <v-col cols="12">
              <v-card
                  class="mx-auto text-center"
                  width="320px"
              >
                <div
                    class="text-body-1 black--text mb-7"
                >سفارشی برای شما ثبت نشده است.
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
                      src="img/icons/orders-gray.svg"
                  ></v-img>
                </v-avatar>

                <div
                    class="text-body-3 lightGray--text mt-6 mb-4"
                >با بازدید از فروشگاه محصولات مورد علاقه خود را یافته و سفارش دهید.
                </div>

                <v-btn
                    :to="{
                  name: 'ShopDetail',
                  params: {
                    shop: $route.params.shop
                  }
                }" color="gray" dark
                    elevation="0"
                    exact
                    large
                >ورود به فروشگاه
                </v-btn>
              </v-card>
            </v-col>
          </v-row>
        </template>

        <!--loading-->
        <template v-else-if="!orders">
        </template>
      </box>

      <!--order detail-->
      <order-info
          :open="openOrderDetails"
          :open-in-initial="openOrderDetailsInitial"
          :order="selectedOrder"
      ></order-info>
    </template>
    <template v-else>
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
              >خطا در دریافت اطلاعات
              </div>

              <v-avatar
                  color="background"
                  size="72"
              >
                <v-icon
                    class="outlined"
                    large
                >info
                </v-icon>
              </v-avatar>

              <div
                  class="text-body-3 lightGray--text mt-6 mb-4"
              >برقراری ارتباط با سرور با خطا مواجه شده است لطفا دوباره تلاش کنید.
              </div>

              <v-btn
                  :to="{
                  name: 'MyOrders',
                  params: {
                    shop: $route.params.shop,
                  }
                }" color="gray"
                  dark
                  elevation="0"
                  large
              >تلاش مجدد
              </v-btn>
            </v-card>
          </box>
        </v-col>
      </v-row>
    </template>
  </container>
</template>

<script>
import Container from "@/components/part/general/Container";
import ProfileTabs from "@/components/part/auth/ProfileTabs";
import Box from "@/components/part/general/Box";
import OrderCard from "@/components/cards/OrderCard";
import OrderInfo from "@/components/part/order/OrderInfo";

export default {
  async asyncData({route, app}) {
    let page = route.query.p ? parseInt(route.query.p) : 1

    let openOrderDetailsInitial = false

    let selectedOrder = false

    if (route.query.order) {
      openOrderDetailsInitial = true

      selectedOrder = await app.$getOrderInfo(route.query.order)
    }

    let orders = []

    let result = await app.$getOrdersList({page})

    orders = result.orders
    let total = result.total
    let perPage = result.perPage

    let allDataRceived = false

    if (openOrderDetailsInitial) {
      allDataRceived = orders && selectedOrder
    } else {
      allDataRceived = !!orders
    }

    return {
      orders,
      page,
      selectedOrder,
      openOrderDetailsInitial,
      allDataRceived,
      total,
      perPage
    }
  },
  components: {OrderInfo, OrderCard, Box, ProfileTabs, Container},
  layout: 'panel',
  middleware: 'protected',
  head() {
    return {
      title: 'سفارش های من'
    }
  },
  name: "MyOrders",
  data: () => ({
    openOrderDetails: 0
  }),
  methods: {
    query() {
      this.$router.push({
        name: this.$route.name,
        params: this.$route.params,
        query: {
          p: this.page,
        }
      })
    },
    async orderDetail(id) {
      this.selectedOrder = await this.$getOrderInfo(id)

      this.openOrderDetails = this.$moment().unix()

      this.$router.push({
        name: this.$route.name,
        params: this.$route.params,
        query: {
          p: this.$route.query.p,
          order: id,
        }
      })
    },
    async filter() {
      this.query()

      this.products = false
      this.total = false
      this.perPage = false

      let result = await this.$getOrdersList({page: this.page})

      this.orders = result.orders
      /*this.total = result.total
      this.perPage = result.perPage*/
    },
  },
  watch: {
    'page': {
      handler() {
        this.filter()
      }
    },
  }
}
</script>

<style scoped>

</style>
