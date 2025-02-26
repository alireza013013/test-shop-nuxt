<template>
  <box
    class="d-flex align-start"
  >
    <!--right-->
    <div>
      <!--image-->
      <v-img
        :src="item.main_image.url"
        max-width="100px"
        max-height="100px"
        contain
        class="mb-2 rounded-xl"
      ></v-img>

      <!--quantity-->
      <cart-quantity
        :initial-quantity="item.quantity"
        :product="item.id"
        :attribute="item.attribute.id"
      ></cart-quantity>
    </div>

    <!--left-->
    <div class="pr-4">
      <!--name-->
      <div
        class="black--text font-weight-medium text-body-3 text-sm-body-2"
      >{{ item.name }}</div>

      <!--attribute-->
      <div
        class="lightGray--text mt-1 text-body-3 text-sm-body-2"
        v-if="item.attribute.name != 'default'"
      >
        {{ item.attribute.name }}:
        {{ item.attribute.value }}
      </div>

      <!--discount-->
      <div class="mt-2 primary--text d-none">
        <span
          class="text-body-3 font-weight-medium text-decoration-line-through"
        >{{ $price(450000) }}</span>
        <span
          class="text-body-4"
        >تومان</span>
      </div>

      <!--price-->
      <div class="mt-1">
        <span
          class="text-body-2 font-weight-medium"
        >{{ $price(item.attribute.price * item.quantity) }}</span>
        <span
          class="text-body-4"
        >تومان</span>
      </div>
    </div>
  </box>
</template>

<script>
import CartQuantity from "@/components/part/cart/CartQuantity";
import Box from "@/components/part/general/Box";
export default {
  name: "CartCard",
  components: {Box, CartQuantity},
  props: {
    item: {
      type: Object
    }
  }
}
</script>

<style scoped>

</style>
