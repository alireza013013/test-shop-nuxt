<template>
  <div class="d-flex align-center">
    <div
      :class="`step-card text-center ${active?'active':''} ${passed?'passed':''}`"
    >
      <v-card
        class="icon d-flex align-center justify-center mx-auto"
      >
        <v-img
          :max-width="$vuetify.breakpoint.xsOnly?'23px':'35px'"
          :max-height="$vuetify.breakpoint.xsOnly?'23px':'35px'"
          contain
          :src="`${icon}${active || passed?'-white.svg':'.svg'}`"
        ></v-img>
      </v-card>

      <div
        :class="`mt-2 text-body-5 text-sm-body-2 ${active?'gray--text':'lightGray--text'}`"
      >{{ title }}</div>
    </div>

    <div
      :class="`step-divider align-self-start ${passed?'passed':''}`"
      v-if="!last"
    ></div>
  </div>
</template>

<script>
export default {
  name: "StepCard",
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    active: {
      type: Boolean,
      default: false
    },
    last: {
      type: Boolean,
      default: false
    },
    passed: {
      type: Boolean,
      default: false
    },
  }
}
</script>

<style scoped>
.step-card{
  width: 85px;
}
.step-card:not(.active){
  opacity: 0.6;
}
.step-card .icon{
  width: 66px;
  height: 55px;
  border-radius: 5px !important;
  background: #F6F5F6;
}
.step-card.active .icon, .step-card.passed .icon{
  background: #EFAB43;
  border: 1px solid #E8A033;
}
.step-divider{
  width: 90px;
  height: 30px;
  border-bottom: 1px dashed #959494;
}
.step-divider.passed{
  border-color: #EFAB43;
  opacity: 0.6;
}

@media screen and (max-width: 600px) {
  .step-card{
    width: 60px;
  }
  .step-card .icon{
    width: 43px;
    height: 36px;
  }
  .step-divider{
    width: 60px;
    height: 20px;
  }
}
</style>
