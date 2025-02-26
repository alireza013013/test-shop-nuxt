export default function ({app, store, route, redirect}) {
  //check authorization
  if(
    !store.state.user.data || !store.state.user.token
  ){
    redirect({
      name: 'ShopDetail',
      params: {
        shop: route.params.shop
      }
    })
  }
}
