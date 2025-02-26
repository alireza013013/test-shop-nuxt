export const state = () => ({
  data: {
    message: '',
    color: 'success',
    time: 5000,
    show: 0
  },
  nextRoutePayload: {
    message: '',
    color: 'success',
    time: 5000,
    show: 0
  }
})

export const mutations = {
  setData(state, val) {
    state.data = val
  },
  setPayload(state, val) {
    state.nextRoutePayload = val
  },
}
