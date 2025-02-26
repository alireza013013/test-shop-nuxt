export default async function ({from, app, store, route}) {
    //import user data from cookies
    await app.$importUserInfo()

    //read shop info if needed
    if (route.params.shop) {
        if (!store.state.shop.info) {
            await app.$getShopInfo()
        }
    }

    //read uuid form cookies and assign new one if does not exist
    if (!store.state.cart.uuid) {
        let currentUUID = app.$cookies.get('uuid')

        if (!currentUUID) {
            app.$generateNewUuid()
        }

        //put uuid on store
        store.commit('cart/updateUUID', currentUUID)
    }

    //refresh cart if needed
    if(
        !from ||
        (from && from.name != route.name)
    ){
        await app.$api({
            method: 'get',
            url: `${route.params.shop}/basket?uuid=${store.state.cart.uuid}`,
            data: null,
            loading: true,
            preventShowError: [400 ,404, 422]
        }).then((r) => {
            store.commit('cart/set', r.data.data)
        }).catch((e) => {
            if (e.response && e.response.data.data && e.response.data.data.removed == true) {
                app.$generateNewUuid()

                this.$store.commit('snackbar/setData', {
                    //message: 'محصولات موجود در سبد خرید شما به دلیل تغییر قیمت حذف شدند لطفا در صورت نیاز نسبت به افزودن مجدد محصولات به سبد اقدام کنید.',
                    message: e.response.data.message,
                    color: 'warning',
                    time: 5000,
                    show: this.$moment().unix()
                })
            }
        })
    }

    if (!store.state.cart.data) {
        let cart = {
            "basket": {
                "products": []
            }
        }

        store.commit('cart/set', cart)
    }
}
