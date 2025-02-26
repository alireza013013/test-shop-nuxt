<template>
  <box class="mt-4 mt-md-10">
    <!--user detail-->
    <div
      class="d-flex align-center"
    >
      <user-avatar
        size="large"
      ></user-avatar>

      <div class="mr-6">
        <div
          class="text-body-1 font-weight-regular black--text"
        >
          {{ $store.state.user.data.name }}
        </div>

        <div
          class="lightGray--text text-body-2 mt-2"
        >
          {{ $store.state.user.data.mobile }}
        </div>
      </div>
    </div>

    <v-divider class="divider mt-4 mb-6"></v-divider>

    <!--tabs-->
    <div
      class="mx-md-12"
    >
      <v-tabs
        v-model="tab"
        background-color="transparent"
        color="secondary"
        active-class="actived-tab"
        slider-size="5"
        centered icons-and-text hide-slider fixed-tabs
        class="prof-tabs"
      >
        <template v-for="(item, i) in items">
          <v-tab
            :key="`prof-tab-${i}`"
            :ripple="false"
            class="no-bg profile-tab px-0"
            :to="item.link"
          >
            <div class="mb-0">
              <div>
                <div
                  :style="`background-image: url('${item.icon}')`"
                  class="tab-img mx-auto text-right"
                >
                  <img
                    src="img/profile-tab-inactive.svg"
                    class="inactive-bubble"
                  />
                  <img
                    src="img/profile-tab-active.svg"
                    class="active-bubble"
                  />
                </div>

                <div
                  class="text-body-2 text-md-body-1 black--text py-3 pb-md-5 prof-tab-title"
                >{{ item.title }}</div>
              </div>

              <div
                class="prof-tab-slider"
                :style="`background-image: url('img/profile-tab-slider.svg')`"
              ></div>
            </div>
          </v-tab>

          <v-divider
            v-if="i+1 < items.length"
            :key="`prof-tab-div-${i}`"
            vertical
            inset
            class="mb-12"
          ></v-divider>
        </template>
      </v-tabs>
    </div>
  </box>
</template>

<script>
import Box from "@/components/part/general/Box";
import UserAvatar from "@/components/part/auth/UserAvatar";
export default {
  name: "ProfileTabs",
  components: {UserAvatar, Box},
  data: () => ({
    tab: 0,
  }),
  computed: {
    items(){
      let items = [
        {
          title: 'اطلاعات حساب',
          icon: 'img/icons/account.svg',
          link: {
            name: 'MyProfile',
            params: {
              shop: this.$route.params.shop
            }
          }
        },
        {
          title: 'سفارش‌های من',
          icon: 'img/icons/orders.svg',
          link: {
            name: 'MyOrders',
            params: {
              shop: this.$route.params.shop
            }
          }
        },
        {
          title: 'آدرس‌ها',
          icon: 'img/icons/addresses.svg',
          link: {
            name: 'MyAddress',
            params: {
              shop: this.$route.params.shop
            }
          }
        }
      ]

      return items
    }
  }
}
</script>

<style scoped>
.prof-tabs{
  margin-bottom: -24px;
}
.prof-tabs >>> .v-tabs-bar{
  height: 121px !important;
}
.profile-tab{
  position: relative;
}
.profile-tab > div {
  width: 100%;
}
.tab-img{
  width: 100px;
  height: 55px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.profile-tab .inactive-bubble, .profile-tab .active-bubble{
  width: 35px;
}
.profile-tab.actived-tab .inactive-bubble{
  display: none;
}
.profile-tab:not(.actived-tab) .active-bubble{
  display: none;
}
.profile-tab .prof-tab-slider{
  width: 100%;
  height: 13px;
  background-repeat: no-repeat;
  background-position: bottom center;
}
.profile-tab .prof-tab-slider{
  opacity: 0;
}
.profile-tab.actived-tab .prof-tab-slider{
  opacity: 1;
}

@media screen and (max-width: 959.98px) {
  .prof-tabs >>> .v-tabs-bar{
    height: 87px !important;
  }
  .tab-img{
    width: 50px;
    height: 30px;
  }
  .profile-tab .inactive-bubble, .profile-tab .active-bubble{
    width: 18px;
  }
  .prof-tab-title{
    font-size: 11px !important;
  }
  .profile-tab .prof-tab-slider{
    height: 11px;
  }
}
</style>
