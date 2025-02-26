export const state = () => ({
  onLoad: false
})

export const mutations = {
  setData(state, val) {
    state.onLoad = val
  }
}
