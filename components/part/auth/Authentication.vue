<template>
  <div>
    <!--authentication btn (not cart)-->
    <v-btn
        v-if="!$store.state.user.data && !cart"
        :color="panel?'white':'rgba(16, 15, 15, 0.55)'"
        :dark="!panel"
        class="px-3 ml-2 no-bg"
        elevation="0"
        min-width="40"
        @click="goToStep1"
    >
      <v-icon
          class="outlined ml-1"
      >login
      </v-icon>
      <span
          class="text-body-2"
      >ورود/عضویت</span>
    </v-btn>

    <!--authentication btn (cart)-->
    <v-btn
        v-if="cart"
        block
        class="mt-md-12"
        color="primary"
        elevation="0" large
        @click="goToStep1"
    >ادامه ثبت سفارش
    </v-btn>

    <!--usermenu-->
    <client-only>
      <v-menu
          v-if="$store.state.user.data"
          eager
          offset-y
          right
      >
        <template v-slot:activator="{ on, attrs, value }">
          <!--panel layout button-->
          <v-btn
              v-if="panel"
              :class="`px-2 ml-3 no-bg`"
              :color="'white'"
              elevation="0"
              min-width="40"
              v-bind="attrs"
              v-on="on"
          >
            <div class="d-flex align-end">
              <v-icon
                  class="outlined"
              >person
              </v-icon>
              <v-icon
                  size="20"
                  style="width: 10px"
              >{{ value ? 'arrow_drop_up' : 'arrow_drop_down' }}
              </v-icon>
            </div>
          </v-btn>
          <!--others button-->
          <v-btn
              v-else
              :class="`px-2 ml-3 no-bg`"
              :color="'rgba(16, 15, 15, 0.55)'"
              dark
              elevation="0"
              min-width="40"
              v-bind="attrs"
              v-on="on"
          >
            <div class="d-flex align-end">
              <v-icon
                  class="outlined"
              >person
              </v-icon>
              <v-icon
                  size="20"
                  style="width: 10px"
              >{{ value ? 'arrow_drop_up' : 'arrow_drop_down' }}
              </v-icon>
            </div>
          </v-btn>
        </template>

        <v-card
            class="pa-4 user-menu"
            color="white"
        >
          <v-card
              :ripple="false" :to="{
            name: 'MyProfile',
            params: {
              shop: $route.params.shop
            }
          }"
              class="d-flex align-center no-bg"
              flat
              tile
          >
            <user-avatar></user-avatar>

            <div class="mr-4">
              <div
                  class="text-body-3 font-weight-regular black--text"
              >
                {{ $store.state.user.data.name }}
              </div>

              <div
                  class="lightGray--text text-body-4"
              >
                {{ $store.state.user.data.mobile }}
              </div>
            </div>

            <v-icon
                color="avatar"
                size="32"
            >arrow_left
            </v-icon>
          </v-card>

          <v-divider class="divider my-2"></v-divider>

          <v-btn
              block color="black"
              text
              @click="logout"
          >
            <v-icon
                class="ml-3"
            >logout
            </v-icon>
            <span
                class="text-body-3"
            >خروج از حساب</span>
          </v-btn>
        </v-card>
      </v-menu>
    </client-only>

    <!--auth-->
    <auth-dialog
        v-model="dialog.auth"
        title="ورود | ثبت نام"
    >
      <div
          class="lightGray--text my-6"
      >لطفا شماره موبایل خود را وارد کنید.
      </div>

      <v-form @submit.prevent="submitStep1">
        <number-field
            ref="mobile"
            v-model="form.mobile"
            :error="errors.mobile?true:false"
            clear-icon="cancel"
            clearable
            label=""
            placeholder="شماره موبایل خود را وارد کنید"
        ></number-field>

        <div class="mt-6">
          <div
              v-if="errors.mobile"
              class="error--text text-center reg-txt mb-5"
          >
            {{ errors.mobile }}
          </div>

          <v-btn
              block
              class="mt-6"
              color="primary"
              elevation="0" large
              type="submit"
          >ورود
          </v-btn>
        </div>
      </v-form>
    </auth-dialog>

    <!--otp-->
    <auth-dialog
        v-model="dialog.otp"
        title="کد تایید را وارد کنید"
    >
      <div
          class="text-body-2 lightGray--text my-6"
      >کد تایید به شماره {{ form.mobile }} پیامک شد.
      </div>

      <v-form @submit.prevent="submitStep2">
        <number-field
            ref="otp"
            v-model="form.code"
            :error="errors.code?true:false"
            :maxlength="$config.optLength.toString()"
            clear-icon="cancel"
            clearable
            label=""
            placeholder="کد تایید"
        ></number-field>

        <div
            class="d-flex reg-txt mb-0 mt-2"
        >
          <div>{{ payloads.limit && now ? toUnblock : '01:59' }}</div>
          <v-spacer></v-spacer>
          <div>مانده تا دریافت مجدد کد تایید</div>
        </div>

        <div class="mt-6">
          <div
              v-if="errors.code"
              class="error--text text-center reg-txt mb-5 text-body-2"
          >
            {{ errors.code }}
          </div>

          <v-btn
              v-if="now && payloads.limit && now.add(1,'seconds')>=payloads.limit" block
              class="mb-3 no-bg"
              color="primary"
              text
              @click="resendCode"
          >
            ارسال مجدد کد تایید
          </v-btn>
          <v-btn
              block
              class="mt-6"
              color="primary"
              elevation="0" large
              type="submit"
          >تایید
          </v-btn>
        </div>
      </v-form>
    </auth-dialog>
  </div>
</template>

<script>
import NumberField from "~/components/fields/NumberField";
import AuthDialog from "~/components/part/auth/AuthDialog";
import UserAvatar from "@/components/part/auth/UserAvatar";

export default {
  name: "Authentication",
  components: {UserAvatar, AuthDialog, NumberField},
  props: {
    panel: {
      type: Boolean,
      default: false
    },
    cart: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    dialog: {
      auth: false,
      otp: false,
    },
    form: {
      mobile: null,
      code: null,
    },
    payloads: {
      mobile: null,
      limit: false,
    },
    errors: {},
    now: false,
    timeStampInterval: null,
  }),
  computed: {
    toUnblock() {
      let min = 0
      let sec = 0
      let str = '00:00'

      if (
          this.payloads.limit &&
          this.now &&
          this.payloads.limit > this.now
      ) {
        min = this.payloads.limit.diff(this.now, 'minutes')
        sec = this.payloads.limit.diff(this.now, 'seconds')
        sec = sec % 60

        sec = sec < 10 ? '0' + sec : sec

        str = `0${min}:${sec}`
      }

      return str
    }
  },
  methods: {
    goToStep1() {
      //reset form
      this.form.mobile = null

      this.form.code = null

      //open auth dialog
      this.dialog.auth = true

      this.$nextTick(() => {
        this.$refs.mobile.focus()
      })
    },
    generateStep1Payloads() {
      let limitUntil = this.$moment().add(120, 'seconds')

      let payloads = this.$encoder({
        mobile: this.form.mobile,
        limit: limitUntil
      })
      this.$cookies.set('auth', payloads, {
        path: `${this.$config.baseUrl}${this.$route.params.shop}`
      })
    },
    submitStep1() {
      this.errors = {}

      if ([null, ''].includes(this.form.mobile)) {
        this.$set(this.errors, 'mobile', 'وارد کردن موبایل الزامی است')
        this.$refs.mobile.focus()
        return false
      }

      this.$api({
        method: 'post',
        url: `${this.$route.params.shop}/register`,
        data: {
          "mobile": this.form.mobile
        },
        loading: true,
        preventShowError: [422]
      }).then((r) => {
        this.generateStep1Payloads()

        this.goToStep2()

      }).catch((e) => {
        if (e.response && e.response.status === 422) {
          this.$set(this.errors, 'mobile', e.response.data.message)
        }
        this.$refs.mobile.focus()
      })
    },
    goToStep2() {
      //read payloads from cookie
      let payloads = this.$cookies.get('auth', {
        path: `${this.$config.baseUrl}${this.$route.params.shop}`
      })

      if (payloads) {
        this.payloads = this.$decoder(payloads)

        this.payloads.limit = this.$moment(new Date(this.payloads.limit))

        //close auth dialog
        this.dialog.auth = false

        //open otp dialog
        this.dialog.otp = true

        this.$nextTick(() => {
          this.$refs.otp.focus()
        })
      }
    },
    submitStep2() {
      this.errors = {}

      if ([null, ''].includes(this.form.code)) {
        this.$set(this.errors, 'code', 'وارد کردن کد تایید الزامی است')
        this.$refs.otp.focus()
        return false
      }

      this.$api({
        method: 'post',
        url: `${this.$route.params.shop}/auth`,
        data: {
          "mobile": this.form.mobile,
          "code": this.form.code
        },
        loading: true,
        preventShowError: [422]
      }).then((r) => {
        let token = r.data.data.token

        this.$store.commit('user/setToken', token)

        this.$getUserInfo()

        this.$exportUserInfo()

        this.$cookies.remove('auth', {
          path: `${this.$config.baseUrl}${this.$route.params.shop}`
        })

        this.dialog.auth = false

        this.dialog.otp = false

        //snackbar
        this.$store.commit('snackbar/setData', {
          //message: `ورود موفقیت آمیز؛ خوش آمدید`,
          message: r.data.message,
          color: 'success',
          time: 5000,
          show: this.$moment().unix()
        })

        //redirect to CartStep2
        if (this.cart) {
          this.$router.push({
            name: 'CartStep2',
            params: {
              shop: this.$route.params.shop
            }
          })
        }
      }).catch((e) => {
        if (e.response && e.response.status === 422) {
          this.$set(this.errors, 'code', e.response.data.message)
        }
        this.$refs.otp.focus()
      })
    },
    resendCode() {
      this.$api({
        method: 'post',
        url: `${this.$route.params.shop}/register`,
        data: {
          "mobile": this.form.mobile
        },
        loading: true,
        preventShowError: [422]
      }).then((r) => {
        this.generateStep1Payloads()

        this.goToStep2()

        this.$store.commit('snackbar/setData', {
          //message: 'کد تایید با موفقیت ارسال شد.',
          message: r.data.message,
          color: 'success',
          time: 5000,
          show: this.$moment().unix()
        })

        this.$refs.otp.focus()
      }).catch((e) => {
        if (e.response && e.response.status === 422) {
          this.$set(this.errors, 'code', e.response.data.message)
        }
      })
    },
    logout() {
      //remove user data from store
      this.$store.commit('user/setData', false)

      this.$store.commit('user/setToken', false)

      //remove user data from coockies
      this.$cookies.remove('userinfo', {
        path: `${this.$config.baseUrl}${this.$route.params.shop}`
      })

      //redirect to shop
      this.$router.push({
        name: 'ShopDetail',
        params: {
          shop: this.$route.params.shop
        }
      })
    }
  },
  created() {
    this.timeStampInterval = setInterval(() => {
      this.now = this.$moment()
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timeStampInterval)
  },
  watch: {
    'form.code': {
      handler() {
        if (![null, ''].includes(this.form.code) && this.form.code.length === this.$config.optLength) {
          this.submitStep2()
        }
      }
    }
  }
}
</script>

<style scoped>
.user-menu {
  border: 1px solid rgba(149, 148, 148, 0.3) !important;
  box-shadow: 0px 4px 4px rgba(149, 148, 148, 0.25) !important;
  border-radius: 0px 7px 7px 7px !important;
}
</style>
