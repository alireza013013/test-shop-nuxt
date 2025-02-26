<template>
  <div
    class="cart-stepper d-flex align-center justify-center"
  >
    <step-card
      icon="img/icons/confirm"
      title="تایید"
      :active="currentStep == 1"
      :passed="currentStep > 1"
    ></step-card>

    <step-card
      icon="img/icons/preparing"
      title="آماده سازی"
      :active="currentStep == 2"
      :passed="currentStep > 2"
    ></step-card>

    <step-card
      icon="img/icons/shipping"
      title="ارسال"
      :active="currentStep == 3"
      last
    ></step-card>
  </div>
</template>

<script>
import StepCard from "@/components/cards/StepCard";
export default {
  name: "OrderStepper",
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
    padding: 16px 0;
    border-top: 1px solid rgba(149, 148, 148, 0.2);
    border-bottom: 1px solid rgba(149, 148, 148, 0.2);
  }
}
</style>
