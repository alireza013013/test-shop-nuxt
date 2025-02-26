export default ({ app }, inject) => {
  inject('encoder', (payload) => {
    return Buffer.from(JSON.stringify(payload)).toString('base64')
  })
  inject('decoder', (payload) => {
    return JSON.parse(Buffer.from(payload, 'base64').toString())
  })
}
