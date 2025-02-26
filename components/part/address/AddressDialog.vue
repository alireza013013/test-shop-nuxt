<template>
  <v-dialog
    v-model="dialog"
    :class="`${$vuetify.breakpoint.xsOnly?'':'rounded-xl'}`"
    :content-class="`${$vuetify.breakpoint.xsOnly?'':'rounded-xl'} product-detail-dialog`"
    :fullscreen="$vuetify.breakpoint.xsOnly"
    :width="$vuetify.breakpoint.smAndDown?'100%':'750px'"
    style="border-radius: 15px !important;"
    :persistent="$vuetify.breakpoint.xsOnly"
    no-click-animation
  >
    <v-card
      :class="`pa-5`"
      :tile="$vuetify.breakpoint.smAndDown"
    >
      <div class="px-4 py-5 pa-sm-0">
        <!--first row-->
        <div class="d-flex align-center">
          <!--close-->
          <v-btn
            :ripple="false"
            class="order-2 no-bg"
            icon
            @click="dialog = false"
          >
            <v-icon>close</v-icon>
          </v-btn>

          <!--shop info-->
          <div class="black--text font-weight-medium text-body-1 flex-grow-1">
            افزودن آدرس جدید
          </div>
        </div>

        <!--add address form-->
        <v-row
          class="my-8"
          no-gutters
        >
          <!--city-->
          <v-col
            cols="12"
          >
            <field-label
              :error="error.city?true:false"
            >استان
            </field-label>
            <v-select
              v-model="form.city"
              :error="error.city?true:false"
              :items="cities"
              :menu-props="{ auto: true, contentClass: 'ml-1 ml-sm-4', nudgeWidth: -16, offsetY: true }"
              class="mb-4"
              hide-details
              item-text="name"
              item-value="id"
              label="" outlined
              placeholder="انتخاب کنید"
            ></v-select>
          </v-col>

          <!--address-->
          <v-col
            cols="12"
          >
            <field-label
              :error="error.address?true:false"
            >آدرس پستی
            </field-label>
            <v-text-field
              v-model="form.address"
              :error="error.address?true:false"
              class="mb-4"
              hide-details
              label="" outlined
              placeholder="نشانی پستی خود را وارد نمایید"
            ></v-text-field>
          </v-col>

          <!--postal-->
          <v-col
            class="pl-sm-2"
            cols="12"
            sm="6"
          >
            <field-label
              :error="error.postal?true:false"
            >کد پستی
            </field-label>
            <number-field
              v-model="form.postal"
              :error="error.postal?true:false"
              class="mb-4 mb-md-0"
              label=""
              placeholder="10 رقم بدون خط تیره"
            ></number-field>
          </v-col>

          <!--phone-->
          <v-col
            class="pr-sm-2"
            cols="12"
            sm="6"
          >
            <field-label
              :error="error.phone?true:false"
            >شماره تماس
            </field-label>
            <number-field
              v-model="form.phone"
              :error="error.phone?true:false"
              label=""
              placeholder="جهت هماهنگی با گیرنده"
            ></number-field>
          </v-col>
        </v-row>

        <!--action-->
        <div
          class="d-flex justify-end"
        >
          <v-btn
            color="primary"
            elevation="0"
            @click="submit"
          >ثبت آدرس
          </v-btn>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import FieldLabel from "@/components/part/general/FieldLabel";
import NumberField from "@/components/fields/NumberField";

export default {
  name: "AddressDialog",
  components: {NumberField, FieldLabel},
  props: {
    cities: {
      type: Array,
      default: () => ([])
    },
    openIt: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    dialog: false,
    form: {
      city: null,
      address: null,
      postal: null,
      phone: null,
    },
    error: {},
    errMessage: []
  }),
  methods: {
    openDialog() {
      this.error = {}

      this.errMessage = []

      this.form = {
        city: null,
        address: null,
        postal: null,
        phone: null,
      }

      this.dialog = true
    },
    submit() {
      this.error = {}

      this.errMessage = []

      if ([null, ''].includes(this.form.city)) {
        let msg = 'انتخاب استان الزامی است.'

        this.$set(this.error, 'city', msg)

        this.errMessage.push(msg)
      }

      if ([null, ''].includes(this.form.address)) {
        let msg = 'وارد کردن آدرس پستی الزامی است.'

        this.$set(this.error, 'address', msg)

        this.errMessage.push(msg)
      } else if (this.form.address.search(/\^/) !== -1) {
        let msg = 'استفاده از کاراکتر "^" مجاز نمی‌باشد.'

        this.$set(this.error, 'address', msg)

        this.errMessage.push(msg)
      }

      if ([null, ''].includes(this.form.postal)) {
        let msg = 'وارد کردن کد پستی الزامی است.'

        this.$set(this.error, 'postal', msg)

        this.errMessage.push(msg)
      }

      if ([null, ''].includes(this.form.phone)) {
        let msg = 'وارد کردن تلفن تماس الزامی است.'

        this.$set(this.error, 'phone', msg)

        this.errMessage.push(msg)
      }

      if (this.errMessage.length > 0) {
        this.$store.commit('snackbar/setData', {
          message: this.errMessage[0],
          color: 'error',
          time: 5000,
          show: this.$moment().unix()
        })

        return false
      }

      //generate entered address object
      let address = {
        "city_id": this.form.city,
        "address": this.form.address,
        "postal": this.form.postal,
        "phone": this.form.phone
      }

      this.$api({
        method: 'put',
        url: `${this.$route.params.shop}/user`,
        data: {
          "address": address
        },
        loading: true,
        preventShowError: [400, 422]
      }).then((r) => {
        let storeAddress = {
          "city": this.form.city,
          "address": this.form.address,
          "postal": this.form.postal,
          "phone": this.form.phone
        }
        this.$store.commit('user/addAddress', storeAddress)

        this.dialog = false

        this.$store.commit('snackbar/setData', {
          //message: 'آدرس جدید با موفقیت ثبت شد.',
          message: r.data.message,
          color: 'success',
          time: 5000,
          show: this.$moment().unix()
        })

        this.form = {
          city: null,
          address: null,
          postal: null,
          phone: null,
        }
      }).catch((e) => {
        if (e.response && (e.response.status === 422 || e.response.status === 400)) {
          this.$set(this.errors, 'msg', e.response.data.message)
        }
      })
    }
  },
  watch: {
    openIt: {
      handler() {
        this.openDialog()
      }
    }
  }
}
</script>

<style scoped>

</style>
