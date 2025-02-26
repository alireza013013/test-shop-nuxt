export default async ({store, route, app}, inject) => {
  inject('getUserInfo', async () => {
    let info = false

    await app.$api({
      method: 'get',
      url: `${route.params.shop}/user`,
      data: null,
      loading: true,
      preventShowError: [403]
    }).then((r) => {
      info = r.data.data.user
      
      store.commit('user/setData', info)
    }).catch((e) => {
      if (e.response && e.response.status === 403) {
        app.$cookies.remove('userinfo', {
          path: `${app.$config.baseUrl}${app.$route.params.shop}`
        })
        store.commit('user/setToken', false)
      }
    })

    return info
  })

  inject('exportUserInfo', () => {
    let user = {
      data: store.state.user.data,
      token: store.state.user.token,
    }

    app.$cookies.set('userinfo', app.$encoder(user), {
      path: `${app.$config.baseUrl}${route.params.shop}`
    })

    return app.$encoder(user)
  })

  inject('importUserInfo', async () => {
    let user = app.$cookies.get('userinfo')

    if (user != undefined) {
      user = app.$decoder(user)
    } else {
      user = {
        data: false,
        token: false,
      }
    }

    if (user.token && !store.state.user.token) {
      store.commit('user/setToken', user.token)

      app.$getUserInfo()
    }

    return user
  })
}
