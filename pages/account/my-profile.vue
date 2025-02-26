<template>
  <container>
    <!--head-->
    <profile-tabs></profile-tabs>

    <!--form-->
    <box class="mt-6 mb-4">
      <v-row no-gutters>
        <!--name-->
        <v-col
          class="pl-md-2"
          cols="12"
          md="6"
        >
          <field-label
            :error="error.name?true:false"
          >نام و نام خانوادگی
          </field-label>
          <v-text-field
            v-model="form.name"
            :error="error.name?true:false"
            class="mb-4"
            hide-details
            label="" outlined
            placeholder="نام و نام خانوادگی خود را وارد نمایید"
          ></v-text-field>
        </v-col>

        <!--mobile-->
        <v-col
          class="pr-md-2"
          cols="12"
          md="6"
        >
          <field-label
          >موبایل
          </field-label>
          <v-text-field
            v-model="form.mobile"
            class="mb-4"
            disabled hide-details label=""
            outlined
          ></v-text-field>
        </v-col>

        <!--email-->
        <v-col
          class="pl-md-2"
          cols="12"
          md="6"
        >
          <field-label
            :error="error.email?true:false"
          >ایمیل
          </field-label>
          <v-text-field
            v-model="form.email"
            :error="error.email?true:false"
            hide-details
            label=""
            outlined placeholder="ایمیل خود را وارد نمایید"
          ></v-text-field>
        </v-col>
      </v-row>

      <div
        class="mt-6 text-left"
      >
        <v-btn
          color="secondary"
          elevation="0"
          large
          @click="submit"
        >ذخیره اطلاعات
        </v-btn>
      </div>
    </box>
  </container>
</template>

<script>
import Container from "@/components/part/general/Container";
import ProfileTabs from "@/components/part/auth/ProfileTabs";
import FieldLabel from "@/components/part/general/FieldLabel";
import Box from "@/components/part/general/Box";

export default {
  async asyncData({app}) {
    //update user info
    let userInfo = await app.$getUserInfo()

    let form = {
      name: userInfo.name,
      mobile: userInfo.mobile,
      email: userInfo.email,
    }

    return {
      form
    }
  },
  components: {Box, FieldLabel, ProfileTabs, Container},
  layout: 'panel',
  middleware: 'protected',
  head() {
    return {
      title: 'اطلاعات حساب'
    }
  },
  name: "MyProfile",
  data: () => ({
    error: {},
    errMessage: [],
  }),
  methods: {
    submit() {
      this.error = {}

      this.errMessage = []

      if ([null, ''].includes(this.form.name)) {
        let msg = 'وارد کردن نام و نام خانوادگی الزامی است.'

        this.$set(this.error, 'name', msg)

        this.errMessage.push(msg)
      }

      if ([null, ''].includes(this.form.email)) {
        let msg = 'وارد کردن ایمیل الزامی است.'

        this.$set(this.error, 'email', msg)

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

      this.$api({
        method: 'put',
        url: `${this.$route.params.shop}/user`,
        data: {
          "name": this.form.name,
          "email": this.form.email,
        },
        loading: true,
        preventShowError: [400, 422]
      }).then((r) => {
        let userInfo = {
          name: this.form.name,
          email: this.form.email,
          mobile: this.$store.state.user.data.mobile,
          address: this.$store.state.user.data.address
        }

        this.$store.commit('user/setData', userInfo)

        this.$store.commit('snackbar/setData', {
          //message: 'اطلاعات شما با موفقیت ثبت شد.',
          message: r.data.message,
          color: 'success',
          time: 5000,
          show: this.$moment().unix()
        })
      }).catch((e) => {
        if (e.response && (e.response.status === 422 || e.response.status === 400)) {
          this.$store.commit('snackbar/setData', {
            message: e.response.data.message,
            color: 'error',
            time: 5000,
            show: this.$moment().unix()
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
