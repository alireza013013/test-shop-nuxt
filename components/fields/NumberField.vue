<template>
  <v-text-field
      v-model="displayedValue"
      ref="numberField"
      :error="error"
      :label="label"
      :placeholder="placeholder"
      :suffix="suffix"
      :clearable="clearable"
      :clear-icon="clearIcon"
      :maxlength="maxlength"
      :dir="dir"
      hide-details outlined
      @keyup="keyPressed"
      @keydown="keyPressed"
  >
    <template slot="append">
      <slot name="append"></slot>
    </template>
  </v-text-field>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number, Boolean],
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    dir: {
      type: String,
      default: 'rtl'
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    suffix: {
      type: String,
      default: ''
    },
    price: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    clearIcon: {
      type: String,
      default: 'cancel'
    },
    maxlength: {
      type: String,
      default: ''
    },
  },
  data: () => ({
    displayedValue: null,
  }),
  methods: {
    keyPressed(e){
      let newValue = e.target.value

      let currentValue = newValue == null ? '' : newValue

      let value = currentValue

      this.mask(value)
    },
    mask(input){
      let value = input

      if(![null].includes(value)){
        //remove non-numerics
        value = this.$onlyNumbers(value)

        //mask value if price prop = true
        if(this.price){
          value = this.$price(value)
        }
      }

      this.displayedValue = value
    },
    generateOutputValue(){
      let output = this.displayedValue

      if(![null].includes(output)){
        output = this.$onlyNumbers(output)
      }

      this.$emit('input', output)
    },
    focus(){
      this.$nextTick(() => {
        this.$refs.numberField.focus()
      })
    }
  },
  created() {
    if(this.value){
      this.mask(this.value)
    }
  },
  watch: {
    displayedValue(){
      this.generateOutputValue()
    },
    value(){
      this.mask(this.value)
    }
  }
}
</script>