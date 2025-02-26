export const state = () => ({
  data: false,
  token: false
})

export const mutations = {
  setData(state, val) {
    state.data = val
  },
  setToken(state, val) {
    state.token = val
  },
  addAddress(state, val) {
    if (state.data) {
      if (!Array.isArray(state.data.address)) {
        state.data.address = []
      }
      state.data.address.push(val)
    }
  }
}
