<template>
  <div
    class="cart-stepper d-flex align-center justify-center mt-4 mt-md-9"
  >
    <step-card
      icon="img/icons/cart"
      title="سبد خرید"
      :active="currentStep == 1"
      :passed="currentStep > 1"
    ></step-card>

    <step-card
      icon="img/icons/shipment"
      title="اطلاعات ارسال"
      :active="currentStep == 2"
      :passed="currentStep > 2"
    ></step-card>

    <step-card
      icon="img/icons/payment"
      title="پرداخت"
      :active="currentStep == 3"
      last
    ></step-card>
  </div>
</template>

<script>
import StepCard from "@/components/cards/StepCard";
export default {
  name: "CartStepper",
  components: {StepCard},
  props: {
    currentStep: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style scoped>
@media screen and (max-width: 600px) {
  .cart-stepper{
    padding: 12px;
    background: #fff;
    box-shadow: 0px 2px 4px rgba(149, 148, 148, 0.2) !important;
    border-radius: 5px !important;
  }
}
</style>
