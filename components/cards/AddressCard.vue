<template>
  <div class="text-body-2 grey--text text-right">
    <span
    >{{item.address}}</span>

    <span
      v-if="![null, ''].includes(item.postal)"
    >
       - کد پستی: {{item.postal}}
    </span>
  </div>
</template>

<script>
export default {
  name: "AddressCard",
  props: {
    item: Object,
    selectable: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
