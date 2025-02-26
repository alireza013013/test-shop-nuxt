export const state = () => ({
  data: false,
  uuid: false
})

export const mutations = {
  set(state, data) {
    state.data = data
  },
  updateUUID(state, value) {
    state.uuid = value
  }
}
