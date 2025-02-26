<template>
  <div
      class="cart-quantity d-flex align-center px-2 py-1"
  >
    <v-icon
        class="no-bg"
        size="19"
        @click="add"
    >add
    </v-icon>

    <span
        class="px-4 text-center flex-grow-1"
    >{{ quantity }}</span>

    <v-icon
        class="no-bg"
        size="19"
        @click="remove"
    >{{ quantity == 1 ? 'delete_outline' : 'remove' }}
    </v-icon>
  </div>
</template>

<script>
export default {
  name: "CartQuantity",
  props: {
    product: {
      type: [Number, String]
    },
    attribute: {
      type: [Number, String]
    },
    initialQuantity: {
      type: [Number, String]
    },
  },
  data: () => ({
    quantity: 1
  }),
  methods: {
    async add() {
      await this.$api({
        method: 'post',
        url: `${this.$route.params.shop}/basket`,
        data: {
          "product_id": this.product,
          "attribute_id": this.attribute,
          "uuid": this.$store.state.cart.uuid
        },
        loading: true,
        preventShowError: [422]
      }).then((r) => {
        let info = r.data.data
        info = {
          ...info,
          "removed": false
        }

        this.$store.commit('cart/set', info)

        this.$store.commit('snackbar/setData', {
          message: r.data.message,
          color: 'success',
          time: 5000,
          show: this.$moment().unix()
        })
      }).catch((e) => {
        if (e.response && (e.response.status === 422 || e.response.status === 400)) {
          this.$store.commit('snackbar/setData', {
            message: e.response.data.message,
            color: 'error',
            time: 5000,
            show: this.$moment().unix()
          })
        }
      })
    },
    async remove() {
      await this.$api({
        method: 'delete',
        url: `${this.$route.params.shop}/basket`,
        data: {
          "product_id": this.product,
          "attribute_id": this.attribute,
          "uuid": this.$store.state.cart.uuid
        },
        loading: true,
        preventShowError: [400, 422]
      }).then((r) => {
        let info = r.data.data
        info = {
          ...info,
          "removed": false
        }

        this.$store.commit('cart/set', info)

        this.$store.commit('snackbar/setData', {
          message: r.data.message,
          color: 'success',
          time: 5000,
          show: this.$moment().unix()
        })
      }).catch((e) => {
        if (e.response && (e.response.status === 422 || e.response.status === 400)) {
          this.$store.commit('snackbar/setData', {
            message: e.response.data.message,
            color: 'error',
            time: 5000,
            show: this.$moment().unix()
          })
        }
      })
    },
  },
  created() {
    this.quantity = this.initialQuantity
  },
  watch: {
    initialQuantity() {
      this.quantity = this.initialQuantity
    }
  }
}
</script>

<style scoped>
.cart-quantity {
  border: 1px solid rgba(241, 236, 236, 0.8);
  box-shadow: 0px 2px 4px rgba(132, 133, 141, 0.2);
  border-radius: 5px;
}
</style>
