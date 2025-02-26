<template>
  <div
    :class="`d-flex align-center`"
  >
    <div
      :class="`ord-list-title text-body-3 lightGray--text ${hasSlot?'align-self-start':''}`"
    >{{ title }}</div>
    <div
      class="text-body-2 black--text"
    >
      <div>{{ value }}</div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderList",
  props: {
    title: {
      type: String
    },
    value: {
      type: [String, Number]
    },
  },
  computed: {
    hasSlot(){
      return this.$slots.default ? true : false
    }
  }
}
</script>

<style scoped>
.ord-list-title{
  width: 100px;
}
</style>
