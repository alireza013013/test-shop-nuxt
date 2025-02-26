<template>
  <container>
    <!--stepper-->
    <cart-stepper
        :current-step="2"
    ></cart-stepper>

    <!--cart detail and shipping address-->
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
        <box>
          <!--has address-->
          <template v-if="$store.state.user.data.address && $store.state.user.data.address.length > 0">
            <!--address list-->
            <v-radio-group
                v-model="form.address"
                column hide-details
            >
              <template
                  v-for="(item, i) in $store.state.user.data.address"
              >
                <v-radio
                    :key="`address-${i}`"
                    :value="i"
                >
                  <template slot="label">
                    <address-card
                        :item="item"
                    ></address-card>
                  </template>
                </v-radio>

                <v-divider
                    v-if="(i+1) < $store.state.user.data.address.length"
                    :key="`address-div-${i}`"
                    :class="`divider mt-4 mb-6`"
                ></v-divider>
              </template>
            </v-radio-group>

            <v-btn
                :ripple="false" class="mt-8 px-0 no-bg"
                color="primary"
                elevation="0"
                large
                text
                @click="addAddress"
            >
              <v-icon
                  class="ml-2"
                  size="20"
              >add
              </v-icon>
              افزودن آدرس جدید
            </v-btn>
          </template>

          <!--empty-->
          <template v-else>
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
                  >آدرسی برای شما ثبت نشده است.
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
                        src="img/icons/location.svg"
                    ></v-img>
                  </v-avatar>

                  <div
                      class="text-body-3 lightGray--text mt-6 mb-4"
                  >جهت تکمیل ساده تر فرآیند ثبت سفارش می توانید آدرس های منتخب خود را اینجا اضافه کنید.
                  </div>

                  <v-btn
                      color="gray" dark
                      elevation="0"
                      large
                      @click="addAddress"
                  >
                    <v-icon
                        class="ml-2"
                        size="20"
                    >add
                    </v-icon>
                    افزودن آدرس جدید
                  </v-btn>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </box>
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
              name: 'CartStep1',
              params: {
                shop: $route.params.shop
              }
            }"
              next-link=""
              next-title="تایید و پرداخت"
              prev-title="بازگشت به سبد خرید"
              @submited="confirmAndPay"
          ></cart-summary>
        </box>
      </v-col>
    </v-row>

    <address-dialog
        :cities="cities"
        :open-it="dialog"
    ></address-dialog>
  </container>
</template>

<script>
import Container from "@/components/part/general/Container";
import CartStepper from "@/components/part/cart/CartStepper";
import Box from "@/components/part/general/Box";
import CartSummary from "@/components/part/cart/CartSummary";
import FieldLabel from "@/components/part/general/FieldLabel";
import NumberField from "@/components/fields/NumberField";
import AddressCard from "@/components/cards/AddressCard";
import AddressDialog from "@/components/part/address/AddressDialog";

export default {
  async asyncData({route, app, store, redirect}) {
    //check page requirements
    if (
        store.state.cart.data.basket.products.length === 0 ||
        (!store.state.user.data && !store.state.user.token)
    ) {
      redirect({
        name: 'CartStep1',
        params: {
          shop: route.params.shop
        }
      })
    }

    let cities = []

    await app.$api({
      method: 'get',
      url: `${route.params.shop}/city`,
      data: null,
      loading: false,
      preventShowError: [404, 422]
    }).then((r) => {
      cities = r.data.data.cities
      
    }).catch((e) => {
    })

    //update user info
    await app.$getUserInfo()

    return {
      cities
    }
  },
  components: {AddressDialog, AddressCard, NumberField, FieldLabel, CartSummary, Box, CartStepper, Container},
  layout: 'panel',
  head() {
    return {
      title: 'اطلاعات ارسال'
    }
  },
  name: "CartStep2",
  data: () => ({
    form: {
      address: null
    },
    dialog: 0
  }),
  methods: {
    addAddress() {
      this.dialog = this.$moment().unix()
    },
    confirmAndPay() {
      if (this.form.address == null) {
        this.$store.commit('snackbar/setData', {
          message: 'انتخاب آدرس الزامی است.',
          color: 'error',
          time: 5000,
          show: this.$moment().unix()
        })

        return false
      }

      let selected = this.$store.state.user.data.address[this.form.address]
      
      
      let cityName = this.cities.find((v) => {
        return v.id === selected.city
      }).name
      

      let address = `${cityName} - ${selected.address}^${selected.postal}`

      this.$api({
        method: 'post',
        url: `${this.$route.params.shop}/payment`,
        data: {
          "uuid": this.$store.state.cart.uuid,
          "address": address
        },
        loading: true,
        preventShowError: [400, 422]
      }).then((r) => {
        this.$store.commit('snackbar/setData', {
          //message: 'در حال انتقال به درگاه پرداخت...',
          message: r.data.message,
          color: 'success',
          time: 3600000,
          show: this.$moment().unix()
        })

        window.location.href = r.data.data.url
      }).catch((e) => {
        if (e.response && (e.response.status === 422 || e.response.status === 400)) {
          if (e.response.data.data && e.response.data.data.removed == true) {
            app.$generateNewUuid()

            this.$store.commit('snackbar/setData', {
              message: e.response.data.message,
              color: 'warning',
              time: 5000,
              show: this.$moment().unix()
            })
          } else {
            this.$store.commit('snackbar/setData', {
              message: e.response.data.message,
              color: 'error',
              time: 5000,
              show: this.$moment().unix()
            })
          }
        }
      })

    }
  }
}
</script>

<style scoped>

</style>
