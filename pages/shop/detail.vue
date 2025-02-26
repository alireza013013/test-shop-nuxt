<template>
  <div>
    <template v-if="allDataRceived">
      <!--head-->
      <v-card class="pt-8 pb-md-8 shop-head" color="transparent" flat tile width="100%">
        <v-img
          :src="$store.state.shop.info.background != null && $store.state.shop.info.background.url != null ? $store.state.shop.info.background.url : `img/shop-bg-default.jpg`"
          class="shop-wall" height="100%" width="100%"></v-img>
        <container>
          <!--user menu + cart button-->
          <div class="d-flex justify-end">
            <!--usermenu-->
            <authentication></authentication>

            <!--cart-->
            <cart-btn></cart-btn>
          </div>

          <!--shop info-->
          <v-card class="pa-md-8 mt-3 shop-info" flat>
            <div class="d-flex align-end align-md-start">
              <!--right-->
              <div class="text-center">
                <!--avatar-->
                <shop-avatar v-if="$store.state.shop.info.logo != null && $store.state.shop.info.logo.url != null"
                  :size="100" class="mx-auto"></shop-avatar>

                <!--contact info md and up-->
                <div class="d-none d-md-block">
                  <!--phone-->
                  <v-btn v-if="$store.state.shop.info.support_number != null" block class="mt-4 mb-2" color="brown" dark
                    elevation="0" rounded small @click="showContactInfo = !showContactInfo">
                    <v-img class="ml-2 mt-n" contain max-width="16px" src="img/icons/phone.svg"></v-img>
                    <span class="text-body-2" v-if=" !showContactInfo">نمایش</span>
                    <a v-if="showContactInfo" :href="`tel: ${$store.state.shop.info.support_number}`"
                      class="text-body-2 text-decoration-none white--text">{{
                      $store.state.shop.info.support_number }}</a>
                  </v-btn>

                  <!--socials-->
                  <div class="w-max-content mx-auto">
                    <social-icon
                      v-if="$store.state.shop.info.contact_types != null && $store.state.shop.info.contact_types.whatsapp != null"
                      :link="`https://wa.me/${$replaceDigits($store.state.shop.info.contact_types.whatsapp)}`"
                      class="ml-1" icon="img/icons/whatsapp.svg"></social-icon>
                    <social-icon
                      v-if="$store.state.shop.info.contact_types != null && $store.state.shop.info.contact_types.telegram != null"
                      :link="`https://` + $store.state.shop.info.contact_types.telegram" class="ml-1"
                      icon="img/icons/telegram.svg"></social-icon>
                    <social-icon
                      v-if="$store.state.shop.info.contact_types != null && $store.state.shop.info.contact_types.instagram != null"
                      :link="`https://` + $store.state.shop.info.contact_types.instagram"
                      icon="img/icons/instagram.svg"></social-icon>
                  </div>
                </div>
              </div>

              <!--left-->
              <div class="flex-grow-1 pr-5 pr-md-10">
                <!--title-->
                <h1 class="text-body-1 font-weight-bold text-md-h1 black--text">{{ $store.state.shop.info.name
                  }}</h1>

                <!--url-->
                <div class="text-body-3 text-md-h5 mt-2 gray--text">Dakhl.co/{{ $store.state.shop.info.slug }}
                </div>

                <!--city-->
                <div class="mt-2 mt-md-3" v-if="$store.state.shop.info.city != null">
                  <v-icon :size="$vuetify.breakpoint.smAndDown ? 18 : ''" color="gray">location_on
                  </v-icon>

                  <span class="text-body-3 text-body-md-1 gray--text">{{ $store.state.shop.info.city }}</span>
                </div>

                <!--description-->
                <p v-if="$store.state.shop.info.about != null" ref="collapsablecontent"
                  :class="`d-none d-md-block mt-4 mb-0 gray--text text-justify text-body-2 collapsable-content ${expandAbout ? 'expanded' : ''}`">
                  {{ $store.state.shop.info.about }}</p>

                <v-btn v-if="showExpanderBtn" :ripple="false" class="px-0 no-bg text-body-2 d-none d-md-block"
                  color="lightGray" min-width="0" small text @click="expandToggle">{{ expandAbout ? 'بستن' : 'بیشتر...'
                  }}
                </v-btn>
              </div>
            </div>
          </v-card>

          <!--contact button sm and down-->
          <div class="text-left mt-2 d-md-none">
            <v-btn :ripple="false" class="no-bg px-0" rounded small text @click="showContactInfo = !showContactInfo">
              <span class="text-body-3 gray--text ml-1">{{ showContactInfo ? 'مخفی کردن' : 'نمایش' }} اطلاعات</span>
              <v-icon color="gray" size="20" style="width: 10px">arrow_drop_{{ showContactInfo ? 'up' : 'down' }}
              </v-icon>
            </v-btn>
          </div>
        </container>

        <!--contact info sm and down-->
        <v-expand-transition>
          <v-card v-show="showContactInfo" class="d-md-none" color="rgba(16, 15, 15, 0.55)" dark tile>
            <container>
              <div class="py-3 d-flex align-center">
                <template v-if="$store.state.shop.info.support_number != null">
                  <v-img class="ml-2" contain max-width="16px" src="img/icons/phone.svg"></v-img>
                  <a :href="`tel: ${$store.state.shop.info.support_number}`" class="text-decoration-none white--text">
                    <span class="text-body-2 mt-1">{{ $store.state.shop.info.support_number }}</span>
                  </a>
                </template>


                <v-spacer></v-spacer>

                <social-icon
                  v-if="$store.state.shop.info.contact_types != null && $store.state.shop.info.contact_types.whatsapp != null"
                  :link="`https://wa.me/${$replaceDigits($store.state.shop.info.contact_types.whatsapp)}`" class="ml-1"
                  icon="img/icons/whatsapp.svg" transparent></social-icon>
                <social-icon
                  v-if="$store.state.shop.info.contact_types != null && $store.state.shop.info.contact_types.telegram != null"
                  :link="`https://` + $store.state.shop.info.contact_types.telegram" class="ml-1"
                  icon="img/icons/telegram.svg" transparent></social-icon>
                <social-icon
                  v-if="$store.state.shop.info.contact_types != null && $store.state.shop.info.contact_types.instagram != null"
                  :link="`https://` + $store.state.shop.info.contact_types.instagram" icon="img/icons/instagram.svg"
                  transparent></social-icon>
              </div>
            </container>
          </v-card>
        </v-expand-transition>
      </v-card>

      <!--filters-->
      <v-card class="pb-3 py-md-7 shop-app-bar" color="white" tile width="100%">
        <container>
          <v-row align="center" no-gutters>
            <!--categories-->
            <v-col class="pl-md-4" cols="12" md="8">
              <client-only>
                <v-chip-group v-model="form.category" active-class="secondary" mandatory>
                  <v-chip v-for="(item, i) in categories" :key="`shop-cat-${i}`" :ripple="false" :value="item.slug"
                    class="shop-cat-chip px-2">
                    {{ item.name }}
                  </v-chip>
                </v-chip-group>
              </client-only>
            </v-col>

            <!--search-->
            <v-col class="mt-1 mt-md-0" cols="12" md="4">
              <v-text-field v-model="form.search" append-icon="search" class="special-txt-field" dense hide-details
                label="" outlined placeholder="محصول مورد نظر خود را جستجو کنید..." @change="filter">
                <template slot="append">
                  <v-icon v-show="![null, ''].includes(form.search)" class="ml-1" @mouseup.stop
                    @click.prevent.stop="clearSearch">cancel
                  </v-icon>
                  <v-icon @mouseup.stop @click.prevent.stop="filter">search
                  </v-icon>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
        </container>
      </v-card>

      <!--products-->
      <container class="my-4 mb-md-10">
        <v-card class="shop-products-container pt-3 px-3 pa-md-8 pb-1 pb-md-4">
          <!--info first row-->
          <div class="d-md-flex align-center text-body-2">
            <!--breadcrumbs-->
            <div class="lightGray--text">
              {{ $store.state.shop.info.name }}
              /
              {{categories.find((car) => car.slug === form.category).name}}
            </div>

            <v-spacer></v-spacer>

            <!--order-->
            <!--            <div class="lightGray&#45;&#45;text text-left">
                          <v-icon
                            class="ml-1"
                            color="lightGray"
                          >sort
                          </v-icon>
                          مرتبط ترین
                        </div>-->
          </div>

          <v-divider class="divider my-3"></v-divider>

          <!--info second row-->
          <div class="d-flex align-center text-body-2 gray--text">
            <!--category title-->

            <!-- inja inja yadet nare -->
            <div>
              {{
              categories.find((car) => car.slug === form.category).name === 'همه' ? 'همه کالاها' : categories.find((car) => car.slug === form.category).name
              }}
            </div>

            <v-spacer></v-spacer>

            <!--products count-->
            <div v-if="total">{{ total }} کالا</div>
          </div>

          <!--product list-->
          <v-row class="mt-2 mt-md-10" no-gutters>
            <!--has product-->
            <template v-if="products.length > 0">
              <v-col v-for="(item, i) in products" v-if="products.length > 0" :key="`product-${i}`"
                :class="`mb-sm-4 px-sm-2 px-lg-2 ${(i + 1) % 4 == 0 ? 'pl-lg-0' : ''} ${(i + 1) % 3 == 0 ? 'pl-sm-0' : ''}`"
                cols="12" lg="3" md="4" sm="4">
                <v-card :ripple="false" class="no-bg" height="100%" @click="productDetail(item.slug)">
                  <product-card :item="item" :last="(i + 1) == products.length"></product-card>
                </v-card>
              </v-col>
            </template>
            <!--empty-->
            <template v-else-if="products.length == 0">
              <v-row class="my-4" no-gutters>
                <v-col cols="12">
                  <v-card class="mx-auto text-center" width="320px">
                    <div class="text-body-1 black--text mb-7">محصولی یافت نشد.
                    </div>

                    <v-avatar color="background" size="72">
                      <v-icon class="outlined" large>info
                      </v-icon>
                    </v-avatar>

                    <div class="text-body-3 lightGray--text mt-6 mb-4">در این بخش محصولی جهت نمایش تعریف نشده است.
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </template>
            <!--loading-->
            <template v-else-if="!products">
            </template>
          </v-row>

          <!--pagination-->
          <v-pagination v-if="products.length > 0 && total > perPage" v-model="form.page"
            :length="(total % perPage === 0) ? Math.floor(total / perPage) : Math.floor(total / perPage) + 1" circle
            class="my-2"></v-pagination>
        </v-card>
      </container>
      <!--product detail-->
      <product-info :cat-name="categories.find((car) => car.slug === form.category).name" :open="openProductDetails"
        :open-in-initial="openProductDetailsInitial" :product="selectedProduct"></product-info>
    </template>
    <template v-else>
      <v-row class="mt-4 mb-4" no-gutters>
        <v-col cols="12">
          <box>
            <v-card class="mx-auto text-center" width="320px">
              <div class="text-body-1 black--text mb-7">خطا در دریافت اطلاعات
              </div>

              <v-avatar color="background" size="72">
                <v-icon class="outlined" large>info
                </v-icon>
              </v-avatar>

              <div class="text-body-3 lightGray--text mt-6 mb-4">برقراری ارتباط با سرور با خطا مواجه شده است لطفا دوباره
                تلاش کنید.
              </div>

              <v-btn :to="{
                name: 'ShopDetail',
                params: {
                  shop: $route.params.shop
                }
              }" color="gray" dark elevation="0" large>تلاش مجدد
              </v-btn>
            </v-card>
          </box>
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<script>
import Container from "~/components/part/general/Container";
import ShopAvatar from "~/components/part/shop/ShopAvatar";
import SocialIcon from "~/components/part/shop/SocialIcon";
import ProductCard from "@/components/cards/ProductCard";
import ProductInfo from "@/components/part/shop/ProductInfo";
import Authentication from "~/components/part/auth/Authentication";
import CartBtn from "@/components/part/cart/CartBtn";
import Box from "@/components/part/general/Box";

export default {
  async asyncData({ route, app, store }) {
    app.$importUserInfo()

    //read form data from queries
    let form = {
      search: route.query.q ? route.query.q : null,
      page: route.query.p ? parseInt(route.query.p) : 1,
      category: route.query.cat ? route.query.cat : 'همه'
    }

    let categories = [{
      "id": 0,
      "name": "همه",
      "slug": "همه"
    }]

    await app.$api({
      method: 'get',
      url: `${route.params.shop}/category`,
      data: null,
      loading: true,
      preventShowError: []
    }).then((r) => {
      categories.push(...r.data.data.categories)

      if (categories.findIndex((o) => o.slug === form.category) === -1) {
        form.category = categories[0].slug
      }
    }).catch((e) => {
    })

    let result = await app.$getProductsList(form)

    let products = result.products
    let total = result.total
    let perPage = result.perPage

    //define show product dialog vaiables
    let selectedProduct = false

    let openProductDetailsInitial = false

    if (route.query.product) {
      selectedProduct = await app.$getProductInfo(route.query.product)

      openProductDetailsInitial = true
    }

    let allDataRceived = false

    if (openProductDetailsInitial) {
      allDataRceived = store.state.shop.info && products && categories.length > 1 && (selectedProduct && selectedProduct.attributes && selectedProduct.attributes.length > 0)
    } else {
      allDataRceived = store.state.shop.info && products && categories.length > 1
    }

    return {
      categories,
      products,
      form,
      selectedProduct,
      openProductDetailsInitial,
      total,
      perPage,
      allDataRceived
    }
  },
  scrollToTop: false,
  head() {
    return {
      title: this.$store.state.shop.info.name
    }
  },
  name: 'ShopDetail',
  components: { Box, CartBtn, Authentication, ProductInfo, ProductCard, SocialIcon, ShopAvatar, Container },
  data: () => ({
    openProductDetails: 0,
    showContactInfo: false,
    expandAbout: false,
    showExpanderBtn: false
  }),
  methods: {
    expandToggle() {
      this.expandAbout = !this.expandAbout

      this.$refs['collapsablecontent'].scrollTop = 0
    },
    query() {
      this.$router.push({
        name: this.$route.name,
        params: this.$route.params,
        query: {
          p: this.form.page,
          cat: this.form.category,
          q: this.form.search,
        }
      })
    },
    async productDetail(slug) {
      this.selectedProduct = await this.$getProductInfo(slug)

      this.openProductDetails = this.$moment().unix()

      this.$router.push({
        name: this.$route.name,
        params: this.$route.params,
        query: {
          q: this.$route.query.q,
          p: this.$route.query.p,
          cat: this.$route.query.cat,
          product: slug,
        }
      })
    },
    clearSearch() {
      this.form.search = null

      this.filter()
    },
    async filter() {
      this.query()

      this.products = false
      this.total = false
      this.perPage = false

      let result = await this.$getProductsList(this.form)

      this.products = result.products
      this.total = result.total
      this.perPage = result.perPage
    },
    checkExpandBtnVisibility() {
      if (this.allDataRceived) {
        this.$nextTick(() => {
          let content = this.$refs['collapsablecontent']

          if (content != null) {
            content.classList.add("expanded")

            let h = content.offsetHeight

            content.classList.remove("expanded")

            if (h / 19 > 3) {
              this.showExpanderBtn = true
            }
          }
        })
      }
    },
  },
  mounted() {
    this.checkExpandBtnVisibility()

    window.addEventListener("resize", this.checkExpandBtnVisibility)
  },
  destroyed() {
    window.removeEventListener("resize", this.checkExpandBtnVisibility);
  },
  watch: {
    'form.page': {
      handler() {
        this.filter()
      }
    },
    'form.category': {
      handler() {
        this.filter()
      }
    },
  }
}
</script>

<style scoped>
.shop-head {
  position: relative;
}

.shop-wall {
  opacity: 0.35;
  position: absolute;
  top: 0;
  left: 0
}

.shop-info {
  width: 580px;
  max-width: 580px;
  background: #ffffff !important;
}

.shop-app-bar {
  box-shadow: 0px 2px 4px rgba(149, 148, 148, 0.15) !important;
}

.shop-products-container {
  box-shadow: 0px 2px 4px rgba(149, 148, 148, 0.2) !important;
}

.collapsable-content:not(.expanded) {
  display: -webkit-box !important;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.collapsable-content.expanded {
  padding-left: 5px;
  overflow-y: scroll;
  max-height: 77px;
}

@media screen and (max-width: 959px) {
  .collapsable-content:not(.expanded) {
    display: none !important;
  }

  .shop-info {
    width: 100%;
    max-width: 100%;
    background: transparent !important;
  }
}
</style>
