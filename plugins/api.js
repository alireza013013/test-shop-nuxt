export default async ({app, $axios, store}, inject) => {
  inject('api', (req) => {
    let headers = {}

    if (!Array.isArray(req.preventShowError)) {
      req.preventShowError = []
    }

    if (store.state.user.token) {
      Object.assign(headers, {'Authorization': `Bearer ${store.state.user.token}`})
    }

    if (req.headers) {
      Object.assign(headers, req.headers)
    }

    if (req.loading) {
      store.commit('loading/setData', true)
    }

    let res = $axios({
      method: req.method,
      url: req.url,
      data: req.data ? req.data : null,
      headers: headers
    });

    res.then(() => {
      if (req.loading) {
        store.commit('loading/setData', false)
      }
    }).catch(e => {
      if (req.loading) {
        store.commit('loading/setData', false)
      }

      if (e.response) {
        if (!req.preventShowError.includes(e.response.status)) {
          if (e.response.data && e.response.data.message) {
            store.commit('snackbar/setData', {
              message: e.response.data.message,
              color: 'error',
              time: 5000,
              show: app.$moment().unix()
            })
          } else {
            store.commit('snackbar/setData', {
              message: 'خطای سرور',
              color: 'error',
              time: 5000,
              show: app.$moment().unix()
            })
          }
        }
      }else {
        store.commit('snackbar/setData', {
          message: 'خطای ناشناخته',
          color: 'error',
          time: 5000,
          show: app.$moment().unix()
        })
      }
    })

    //return response
    return res;
  })
}
