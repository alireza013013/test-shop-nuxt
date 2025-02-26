<template>
  <v-card
    :class="`py-4 px-sm-4 product-card fill-height d-flex flex-sm-column ${last?'last-one':''}`"
    color="white"
    flat
  >
    <!--image-->
    <div>
      <v-img
        :src="item.main_image.url"
        class="d-none d-sm-block"
        contain
        height="250px"
        max-height="250px"
        max-width="100%"
        position="center"
        width="100%"
      ></v-img>
      <v-img
        :src="item.main_image.url"
        class="d-sm-none"
        contain
        height="120px"
        max-height="120px"
        max-width="115px"
        position="center"
        width="115px"
      ></v-img>
    </div>

    <v-divider class="divider d-none d-sm-block my-4"></v-divider>

    <!--details-->
    <div
      class="flex-grow-1 d-flex flex-column fill-height pr-6 pr-sm-0"
    >
      <!--title-->
      <div
        class="text-body-1 flex-grow-1 mb-6"
      >{{ item.name }}
      </div>

      <div class="d-flex align-start">
        <!--right-->
        <!--
        <div v-if="item.discount"
           class="primary white&#45;&#45;text text-body-4 text-body-md-2 font-weight-bold px-2 py-1 rounded-xl rounded-md-lg"
        >
          {{ item.discount }}%
        </div>
        -->

        <v-spacer></v-spacer>

        <!--left-->
        <div class="d-flex align-start">
          <div>
            <div class="text-body-2 text-md-h6">{{ $price(item.price) }}</div>
            <!--
            <div
              v-if="item.discount"
              class="lightGray&#45;&#45;text text-body-4 text-body-md-3 text-decoration-line-through"
            >{{ $price(item.price) }}
            </div>
            -->
          </div>
          <div class="text-body-4 text-body-md-3 mt-half mt-sm-1 mr-1">تومان</div>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    item: {
      type: Object
    },
    last: {
      type: Boolean,
      default: false
    },
  }
}
</script>

<style scoped>
.product-card {
  border: 1px solid rgba(149, 148, 148, 0.1) !important;
  box-shadow: 0px 2px 4px rgba(149, 148, 148, 0.2) !important;
}

@media screen and (max-width: 599.98px) {
  .product-card {
    border: none !important;
    box-shadow: none !important;
    border-radius: 0;
  }

  .product-card:not(.last-one) {
    border-bottom: 1px solid rgba(186, 186, 186, 0.25) !important;
  }
}

@media screen and (min-width: 600px) {
  .product-card:hover {
    border: 1px solid rgba(149, 148, 148, 0.3) !important;
    box-shadow: 0px 4px 4px rgba(149, 148, 148, 0.4) !important;
  }
}
</style>
