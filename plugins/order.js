export default async ({store, route, app}, inject) => {
  inject('getOrderInfo', async (id) => {
    let order = false

    await app.$api({
      method: 'get', url: `${route.params.shop}/order/${id}`,
      data: null,
      loading: true,
      preventShowError: [404]
    }).then((r) => {
      order = r.data.data.order
    }).catch((e) => {
      if (e.response && e.response.status === 404) {
        order = null
      }
    })

    return order
  })

  inject('getOrderStatusDetail', (status) => {
    let statusObj = {
      text: 'ارسال شده',
      icon: 'check_circle_outline',
      color: 'primary',
      step: 3
    }

    switch (status) {
      case 0:
        statusObj = {
          text: 'در انتظار تایید',
          icon: 'pending',
          color: 'warning',
          step: 1
        }
        break
      case 1:
        statusObj = {
          text: 'در حال آماده سازی',
          icon: 'manage_history',
          color: 'info',
          step: 2
        }
        break
      case 3:
        statusObj = {
          text: 'لغو شده',
          icon: 'error_outline',
          color: 'error',
          step: 0
        }
        break
    }

    return statusObj
  })

  inject('getOrdersList', async (obj) => {
    let orders = false
    let total = false
    let perPage = false

    let queryString = `?page=${obj.page}`

    await app.$api({
      method: 'get',
      url: `${route.params.shop}/order${queryString}`,
      data: null,
      loading: true,
      preventShowError: [404]
    }).then((r) => {
      total = r.data.data.orders.meta.total
      perPage = r.data.data.orders.meta.per_page
      orders = r.data.data.orders.data
    }).catch((e) => {
      if (e.response && e.response.status === 404) {
        orders = []
      }
    })

    return {orders, total, perPage}
  })

}
