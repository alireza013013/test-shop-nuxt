import { uuid } from 'vue-uuid';

export default async ({ store, route, app, redirect }, inject) => {
    inject('getShopInfo', async () => {
        let info = false
        await app.$api({
            method: 'get', url: `${route.params.shop}/info`, data: null, loading: true, preventShowError: []
        }).then((r) => {
            info = r.data.data.shop
            store.commit('shop/setInfo', info)
        }).catch((e) => {
        })

        return info
    })

    inject('getProductsList', async (obj) => {
        let products = false
        let total = false
        let perPage = false

        let queryString = `?page=${obj.page}`

        if (![null, ''].includes(obj.search)) {
            queryString += `&search=${encodeURIComponent(obj.search)}`
        }

        if (![null, '', 'همه'].includes(obj.category)) {
            queryString += `&category=${encodeURIComponent(obj.category)}`
        }

        await app.$api({
            method: 'get',
            url: `${route.params.shop}/product${queryString}`,
            data: null,
            loading: true,
            preventShowError: [404, 400]
        }).then((r) => {
            total = r.data.data.products.meta.total
            perPage = r.data.data.products.meta.per_page
            products = r.data.data.products.data
        }).catch((e) => {
            if (e.response && (e.response.status === 404 || (e.response.status === 400 && e.response.data.message === 'shop is not active'))) {
                redirect('https://dakhl.co')
            }
        })

        return { products, total, perPage }
    })

    inject('getProductInfo', async (slug) => {
        let product = false

        await app.$api({
            method: 'get',
            url: `${route.params.shop}/product/${encodeURIComponent(slug)}`,
            data: null,
            loading: true,
            preventShowError: [404]
        }).then((r) => {
            product = r.data.data.product
        }).catch((e) => {
            if (e.response && e.response.status === 404) {
                product = null
            }
        })

        return product
    })

    inject('generateNewUuid', () => {
        let newUuid = uuid.v4()

        app.$cookies.set('uuid', newUuid, {
            path: `${app.$config.baseUrl}${route.params.shop}`
        })

        //empty cart
        let cart = {
            "basket": {
                "products": []
            }
        }

        store.commit('cart/set', cart)
    })
}
