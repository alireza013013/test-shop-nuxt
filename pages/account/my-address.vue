<template>
  <container>
    <!--head-->
    <profile-tabs></profile-tabs>

    <!--addresses-->
    <box class="mt-6 mb-4">
      <!--has address-->
      <template v-if="$store.state.user.data.address && $store.state.user.data.address.length > 0">
        <!--address list-->
        <div class="pt-2">
          <template
            v-for="(item, i) in $store.state.user.data.address"
          >
            <address-card
              :item="item"
            ></address-card>

            <v-divider
              v-if="$store.state.user.data.address && (i+1) < $store.state.user.data.address.length"
              :key="`address-div-${i}`"
              :class="`divider mt-4 mb-6`"
            ></v-divider>
          </template>
        </div>

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

    <address-dialog
      :cities="cities"
      :open-it="dialog"
    ></address-dialog>
  </container>
</template>

<script>
import Container from "@/components/part/general/Container";
import ProfileTabs from "@/components/part/auth/ProfileTabs";
import Box from "@/components/part/general/Box";
import AddressCard from "@/components/cards/AddressCard";
import AddressDialog from "@/components/part/address/AddressDialog";

export default {
  async asyncData({route, app}) {

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
  components: {AddressDialog, AddressCard, Box, ProfileTabs, Container},
  layout: 'panel',
  middleware: 'protected',
  head() {
    return {
      title: 'آدرس ها'
    }
  },
  name: "MyAddress",
  data: () => ({
    dialog: 0
  }),
  methods: {
    addAddress() {
      this.dialog = this.$moment().unix()
    }
  }
}
</script>

<style scoped>

</style>
