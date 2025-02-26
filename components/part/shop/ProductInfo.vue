<template>
  <div v-if="product">
    <v-dialog
      v-model="dialog"
      :class="`${$vuetify.breakpoint.xsOnly?'':'rounded-xl'}`"
      :content-class="`${$vuetify.breakpoint.xsOnly?'':'rounded-xl'} product-detail-dialog`"
      :fullscreen="$vuetify.breakpoint.xsOnly"
      :width="$vuetify.breakpoint.smAndDown?'100%':'750px'"
      style="border-radius: 15px !important;"
    >
      <v-card
        :class="`${$vuetify.breakpoint.xsOnly?'background':''} pa-5`"
        :tile="$vuetify.breakpoint.smAndDown"
      >
        <!--product info-->
        <div
          class="pa-3 pa-sm-0 info-parent"
        >
          <div
            class="white xs-info-container"
          >
            <!--first row-->
            <div class="d-flex align-center pl-2 pr-4 pt-2 pa-md-0">
              <!--close-->
              <v-btn
                :ripple="false"
                class="order-2"
                icon
                @click="dialog = false"
              >
                <v-icon>close</v-icon>
              </v-btn>

              <!--shop info-->
              <div class="lightGray--text text-body-2 flex-grow-1">
                {{ $store.state.shop.info.name }}
                /
                {{ catName }}
              </div>
            </div>

            <!--product-->
            <div class="mt-4 d-md-flex">
              <!--slider-->
              <div
                class="overflow-hidden product-slider mx-auto"
              >
                <product-image-slider
                  :images="[].concat([product['main_image']],product['other_images'])"
                  :render-slider="renderSlider"
                ></product-image-slider>
              </div>
              <!--info-->
              <div class="flex-grow-1 mr-md-4">
                <v-card
                  class="product-info pa-5"
                >
                  <!--title-->
                  <div
                    class="text-body-1 black--text font-weight-bold mb-4"
                  >{{ product.name }}
                  </div>

                  <!--description-->
                  <div
                    class="text-body-2 black--text mb-2"
                  >توضیحات
                  </div>
                  <div
                    class="text-body-2 lightGray--text mb-3"
                  >{{ product.description }}
                  </div>

                  <!--features-->
                  <div
                    v-if="product.attributes[0].name!='default'"
                    class="text-body-2 black--text mb-1"
                  >{{ product.attributes[0].name }}
                  </div>

                  <v-chip-group
                    v-if="product.attributes && product.attributes.length>0 && product.attributes[0].name!=='default'"
                    v-model="form.variety"
                    :show-arrows="$vuetify.breakpoint.smAndDown?false:true"
                    active-class="actived-opt"
                    class="pa-0 mb-sm-4"
                    mandatory
                  >
                    <v-chip
                      v-for="(item, i) in product.attributes"
                      :key="`status-opt-${i}`"
                      :ripple="false"
                      :value="item.id"
                      class="option no-bg lightGray--text mr-0 ml-3"
                    >
                      {{ item.value }}
                    </v-chip>
                  </v-chip-group>

                  <!--bottom bar-->
                  <div class="bottom-bar">
                    <!--price-->
                    <div
                      class="d-flex align-center"
                    >
                    <span
                      class="black--text text-body-2"
                    >قیمت:</span>

                      <!--discount-->
                      <!--<div v-if="product.discount" class="mr-1 primary white&#45;&#45;text text-body-2 font-weight-bold px-3 pt-2 pb-1 rounded-xl rounded-md-lg">{{ product.discount }}%</div>-->

                      <!--price-->
                      <!--<div
                        v-if="product.discount"
                        class="mr-3 lightGray&#45;&#45;text text-body-4 text-body-md-3 text-decoration-line-through"
                      >{{ $price(product.attributes[selectedVarietyIndex].price) }}
                      </div>-->

                      <v-spacer></v-spacer>

                      <!--discounted price-->
                      <div
                        class="black--text text-body-2 text-md-h6"
                      >{{ $price(product.attributes[selectedVarietyIndex].price) }}
                      </div>
                      <div class="text-body-4 text-body-md-3 mr-1">تومان</div>
                    </div>

                    <!--add to cart-->
                    <div class="text-center mt-6">
                      <v-btn
                        v-if="product.attributes[selectedVarietyIndex].quantity>0"
                        color="primary"
                        elevation="0"
                        large
                        width="80%"
                        @click="addToCart"
                      >
                        <v-icon class="ml-2">add_shopping_cart</v-icon>
                        افزودن به سبد خرید
                      </v-btn>
                    </div>
                  </div>
                </v-card>
              </div>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ProductImageSlider from "@/components/part/shop/ProductImageSlider";

export default {
  name: "ProductInfo",
  components: {ProductImageSlider},
  props: {
    open: {
      type: [String, Number],
      default: 0
    },
    openInInitial: {
      type: Boolean,
      default: false
    },
    product: {
      type: [Object, Boolean],
      default: () => ({
        "id": 1,
        "name": "کوله پشتی مسافرتی دخترانه مدل A253",
        "slug": "کوله-پشتی-A253",
        "quantity": null,
        "description": "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد.",
        "category": {
          "id": 1,
          "name": "کوله مسافرتی",
          "slug": "کوله-مسافرتی"
        },
        "main_image": {
          "url": "img/products/bag-1.png",
          "hash": "5db39044aa84071ad5232633c42678f05dc02661"
        },
        "other_images": [
          {
            "url": "img/products/bag-1.png",
            "hash": "f94f10678e066b730063c86eab6ea1041d51610c"
          },
          {
            "url": "img/products/bag-2.png",
            "hash": "6d42d16bf63b1d386987435f84978e7a754cfc7b"
          },
          {
            "url": "img/products/bag-3.png",
            "hash": "6d42d16bf63b1d386987435f84978e7a754cfc7b"
          },
          {
            "url": "img/products/bag-1.png",
            "hash": "f94f10678e066b730063c86eab6ea1041d51610c"
          },
          {
            "url": "img/products/bag-2.png",
            "hash": "6d42d16bf63b1d386987435f84978e7a754cfc7b"
          },
          {
            "url": "img/products/bag-3.png",
            "hash": "6d42d16bf63b1d386987435f84978e7a754cfc7b"
          }
        ],
        "attributes": [
          {
            "id": 1,
            "name": "رنگ",
            "value": "خردلی",
            "price": 253300,
            "quantity": 6
          },
          {
            "id": 2,
            "name": "رنگ",
            "value": "صورتی",
            "price": 265900,
            "quantity": 3
          }
        ]
      })
    },
    catName: {
      type: String
    }
  },
  data: () => ({
    dialog: false,
    renderSlider: 0,
    form: {
      variety: null
    }
  }),
  computed: {
    //returns index of sele cted variety
    selectedVarietyIndex() {
      let i = 0

      if (this.form.variety != null && this.product.attributes.length > 1) {
        i = this.product.attributes.indexOf(this.product.attributes.find((e) => e.id == this.form.variety))
      }

      return i
    }
  },
  methods: {
    addToCart() {
      let attribute_id = this.form.variety

      if (this.product.attributes.length === 1) {
        attribute_id = this.product.attributes[0].id
      }

      this.$api({
        method: 'post',
        url: `${this.$route.params.shop}/basket`,
        data: {
          "product_id": this.product.id,
          "attribute_id": attribute_id,
          "uuid": this.$store.state.cart.uuid
        },
        loading: true,
        preventShowError: [422]
      }).then((r) => {
        this.$store.commit('cart/set', r.data.data)

        //define snackbar for next route
        this.$store.commit('snackbar/setPayload', {
          message: r.data.message,
          color: 'success',
          time: 5000,
          show: this.$moment().unix()
        })

        this.$router.push({
          name: 'CartStep1',
          params: {
            shop: this.$route.params.shop
          }
        })
      }).catch((e) => {
        if (e.response && e.response.status === 422) {
          this.$store.commit('snackbar/setData', {
            message: e.response.data.message,
            color: 'error',
            time: 5000,
            show: this.$moment().unix()
          })
        }
      })
    },
    openDialog() {
      this.dialog = true
      this.form.variety = null
    },
    lockHtmlTagScroll(){
      let htmlTag = document.getElementsByTagName('html')

      htmlTag[0].classList.add("overflow-y-hidden")
    },
    unlockHtmlTagScroll(){
      let htmlTag = document.getElementsByTagName('html')

      htmlTag[0].classList.remove("overflow-y-hidden")
    }
  },
  created() {
    if (this.openInInitial) {
      this.openDialog()
    }
  },
  watch: {
    '$route.query.product': {
      handler() {
        if (!this.$route.query.product || this.$route.query.product == 'false') {
          this.dialog = false
        } else {
          this.openDialog()
        }
      }
    },
    open() {
      this.openDialog()
    },
    dialog() {
      if (!this.dialog) {
        let queries = this.$queries()

        delete queries.product

        this.unlockHtmlTagScroll()

        this.$router.push({
          name: 'ShopDetail',
          params: {
            slug: this.$route.params.shop
          },
          query: queries
        })
      } else {
        setTimeout(() => {
          this.renderSlider = this.$moment().unix()

          this.lockHtmlTagScroll()
        }, 100)
      }
    }
  }
}
</script>

<style scoped>
.product-info {
  border: 1px solid rgba(149, 148, 148, 0.2);
  border-radius: 7px;
}

.option {
  background: white !important;
  border: 1px solid rgba(149, 148, 148, 0.2);
  border-radius: 7px;
}

.actived-opt {
  border: 1px solid #FEC571 !important;
  box-shadow: 0px 4px 4px rgba(149, 148, 148, 0.4);
}

.product-slider {
  min-width: 320px;
  width: 320px;
}

@media screen and (max-width: 599.98px) {
  .xs-info-container {
    box-shadow: 0px 2px 4px rgba(149, 148, 148, 0.2);
    border-radius: 8px;
  }

  .info-parent {
    padding-bottom: 138px !important;
  }

  .product-info {
    border: none;
  }

  .bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    padding: 12px;
    box-shadow: 2px 0px 4px rgba(149, 148, 148, 0.6);
    z-index: 11;
  }

  .bottom-bar button {
    width: 100% !important;
  }
}
</style>
<style>
.product-detail-dialog::-webkit-scrollbar-track {
  background: #F6F5F6 !important;
}
</style>
